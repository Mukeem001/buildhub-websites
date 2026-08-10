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
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port $server_port;
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
## Automatic SSL issuance with Certbot

To support scalable custom domains without editing Nginx for every domain, use one catch-all proxy server block and Certbot webroot mode.

1. Install Certbot on Ubuntu:

```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx
```

2. Configure Nginx to proxy all non-API requests to Node and serve ACME challenges from the static webroot.

Example `/etc/nginx/sites-available/buildhub`:

```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    root /var/www/buildhub-websites/certbot;

    location /.well-known/acme-challenge/ {
        alias /var/www/buildhub-websites/certbot/.well-known/acme-challenge/;
        try_files $uri =404;
    }

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port $server_port;
    }
}
```

3. Enable automatic SSL in the backend `.env`:

```env
CERTBOT_ENABLED=true
CERTBOT_EMAIL=your-email@example.com
CERTBOT_WEBROOT_PATH=/var/www/buildhub-websites/certbot
CERTBOT_COMMAND=certbot
NGINX_RELOAD_COMMAND=sudo systemctl reload nginx
```

4. Connect the custom domain normally and then verify it from the backend or frontend. Once DNS verification succeeds, the backend will trigger Certbot to request certificates for the verified hostname(s) and reload Nginx automatically.

5. If the certificate issuance fails, the backend stores the error in `Domain.sslError` and sets `sslStatus=failed`. You can inspect or re-trigger issuance later using the backend SSL endpoint.

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

---

## Fixing Mixed Content (HTTPS admin + HTTP backend)

Symptom: your admin site (for example `https://developermukeem.online`) is served over HTTPS but frontend code calls `http://2.28.13.238/api/...`. Browsers block this as mixed content and you'll see errors like "Mixed Content: The page was loaded over HTTPS, but requested an insecure resource".

Solutions (pick one):

- Proxy the API through the same HTTPS host (recommended): configure nginx so requests to `https://developermukeem.online/api/...` are proxied to your backend on `http://127.0.0.1:5000`. Then set your admin frontend env to use a relative API base (`VITE_API_BASE_URL=/api`) or `https://developermukeem.online/api`.

    Example nginx snippet (inside your admin server block) to proxy `/api`:

    ```nginx
    location /api/ {
        proxy_pass http://127.0.0.1:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    ```

    - Then in `buildhub-admin/.env` use:

        ```env
        VITE_API_BASE_URL=/api
        ```

    - Rebuild/deploy the admin UI and reload nginx. Requests will be same-origin and no mixed-content error will occur.

- Enable HTTPS on the backend host and use `https://` in the frontend: obtain a TLS certificate for the backend IP/hostname (Let's Encrypt requires a hostname) or front the backend with Cloudflare/Caddy to provide TLS. After enabling TLS, set `VITE_API_BASE_URL=https://your-backend-host/api` in the admin `.env`.

    Example quick Certbot + nginx flow (on a host with a public domain):

    ```bash
    sudo apt update
    sudo apt install certbot python3-certbot-nginx
    # ensure nginx server block has 'server_name developermukeem.online'
    sudo certbot --nginx -d developermukeem.online -d www.developermukeem.online
    sudo systemctl reload nginx
    ```

Why proxying is recommended:

- You only need one TLS certificate (for the admin host) and can keep the backend on localhost without exposing it directly on the public internet.
- Same-origin requests avoid mixed-content and simplify cookies/auth.

If you want, I can:

- Add the recommended `location /api/` proxy snippet into the example nginx config in this document (done).
- Update `buildhub-admin/.env` in the repo to `VITE_API_BASE_URL=/api` and push the change so the admin UI builds with same-origin API by default.

