# Custom Domain Setup for BuildHub Websites

This repository already supports hostname-based custom domains in the backend. The missing piece is the web server proxy configuration.

## Goal

When a user connects a domain, requests to that domain should serve the user's published website, not the main frontend admin site.

This works when:

1. DNS for the custom domain points to your server IP.
2. Nginx forwards the request to the Node backend with the original `Host` header.
3. The backend has a verified `Domain` record for that host and the website is published.

---

## Best nginx configuration

Use two server blocks:

1. One for your main admin/frontend app.
2. One for all custom domains, proxying to Node.

### Example `/etc/nginx/sites-available/buildhub`

```nginx
# Main frontend/admin site
server {
    listen 80;
    listen [::]:80;
    server_name buildhub.example.com;  # replace with your admin hostname if you use one

    root /var/www/buildhub-websites/client/dist;
    index index.html;
    client_max_body_size 100M;

    location /api/ {
        proxy_pass http://127.0.0.1:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /sites/ {
        alias /var/www/buildhub-websites/published/;
        index index.html;
        try_files $uri $uri/ $uri/index.html =404;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}

# Custom domains for user websites
server {
    listen 80;
    listen [::]:80;
    server_name developermukeem.online *.developermukeem.online;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
    }
}
```

### Notes

- `server_name developermukeem.online *.developermukeem.online;` catches the root domain and any subdomain such as `mukeem.developermukeem.online`.
- `proxy_pass http://127.0.0.1:5000;` forwards custom domain requests to your backend app.
- `proxy_set_header Host $host;` ensures Express sees the original domain and can match the correct `Domain` record.

---

## Alternative: use Caddy for automatic domain handling and HTTPS

If you want the easiest production setup, use Caddy instead of complex nginx rules. Caddy will automatically get TLS certificates for each custom domain.

### Example `Caddyfile`

```caddyfile
:80 {
    reverse_proxy 127.0.0.1:5000
}

:443 {
    reverse_proxy 127.0.0.1:5000
}
```

Or more simply:

```caddyfile
http://, https:// {
    reverse_proxy 127.0.0.1:5000
}
```

With Caddy, any incoming host is proxied to Node and the backend can route based on `req.hostname`.

---

## Backend environment settings

If your connected domain uses an `A` record pointing to `2.28.13.238`, set the backend target accordingly.

In `.env`:

```env
CUSTOM_DOMAIN_TARGET=2.28.13.238
```

This ensures the backend verification step works when the record is an IP address.

---

## How the backend works

The backend middleware in `backend/src/app.ts` already does the required host-based rewrite:

- It ignores `/api`, `/sites`, and `/favicon`.
- It looks up a verified `Domain` by `req.hostname`.
- If found and the website is published, it rewrites the request to `/sites/:slug`.

So the complete solution is primarily:

- correct DNS,
- correct proxy config,
- verified backend domain, and
- published website.

---

## Example DNS setup for `mukeem.developermukeem.online`

If the user wants exactly `mukeem.developermukeem.online`:

- `A` record: `mukeem` -> `2.28.13.238`

If the user wants the root domain `developermukeem.online`:

- `A` record: `@` -> `2.28.13.238`
- optionally `CNAME` record: `www` -> `developermukeem.online`

---

## Final check

After updating nginx, reload and test:

```bash
sudo nginx -t
sudo systemctl reload nginx
curl -I -H "Host: mukeem.developermukeem.online" http://2.28.13.238/
```

If the result is served by your published site and not the main admin frontend, the setup is correct.

---

## Quick summary

- Do not manually edit nginx for every new user domain.
- Use a server block with `server_name` matching your custom domain pattern and proxy everything to Node.
- For best scale and HTTPS, use Caddy.
- Keep `proxy_set_header Host $host;` so Node can route by hostname.
