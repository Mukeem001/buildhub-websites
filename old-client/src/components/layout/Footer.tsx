import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaGithub,
  FaArrowRight,
} from "react-icons/fa6";

import { Link } from "react-router-dom";

const Footer = () => {
  const company = [
    "About",
    "Careers",
    "Blog",
    "Contact",
  ];

  const product = [
    "Templates",
    "Pricing",
    "Features",
    "Integrations",
  ];

  const support = [
    "Help Center",
    "Documentation",
    "Privacy Policy",
    "Terms of Service",
  ];

  return (
    <footer className="border-t border-slate-800 bg-slate-950">

      <div className="mx-auto max-w-7xl px-5 py-16">

        {/* Top */}

        <div className="grid gap-12 lg:grid-cols-12">

          {/* Brand */}

          <div className="lg:col-span-4">

            <Link
              to="/"
              className="text-3xl font-black text-white"
            >
              Build<span className="text-blue-500">Hub</span>
            </Link>

            <p className="mt-6 max-w-md leading-8 text-slate-400">
              Build beautiful websites without writing code.
              Launch Ecommerce, Restaurant, Portfolio,
              Business and many more websites with one click.
            </p>

            {/* Newsletter */}

            <div className="mt-8">

              <h4 className="mb-4 font-semibold text-white">
                Subscribe Newsletter
              </h4>

              <div className="flex flex-col gap-3 sm:flex-row">

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-5 py-4 text-white outline-none transition focus:border-blue-500"
                />

                <button className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700">
                  Subscribe
                  <FaArrowRight />
                </button>

              </div>

            </div>

          </div>

          {/* Links */}

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">

            <div>

              <h3 className="mb-6 text-lg font-bold text-white">
                Company
              </h3>

              <div className="space-y-4">

                {company.map((item) => (
                  <Link
                    key={item}
                    to="/"
                    className="block text-slate-400 transition hover:text-blue-400"
                  >
                    {item}
                  </Link>
                ))}

              </div>

            </div>

            <div>

              <h3 className="mb-6 text-lg font-bold text-white">
                Product
              </h3>

              <div className="space-y-4">

                {product.map((item) => (
                  <Link
                    key={item}
                    to="/"
                    className="block text-slate-400 transition hover:text-blue-400"
                  >
                    {item}
                  </Link>
                ))}

              </div>

            </div>

            <div>

              <h3 className="mb-6 text-lg font-bold text-white">
                Support
              </h3>

              <div className="space-y-4">

                {support.map((item) => (
                  <Link
                    key={item}
                    to="/"
                    className="block text-slate-400 transition hover:text-blue-400"
                  >
                    {item}
                  </Link>
                ))}

              </div>

            </div>

          </div>

        </div>

        {/* Divider */}

        <div className="my-10 border-t border-slate-800" />

        {/* Bottom */}

        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">

          <p className="text-center text-slate-400 lg:text-left">
            © {new Date().getFullYear()} BuildHub. All Rights Reserved.
          </p>

          <div className="flex items-center gap-4">

            {[
              FaFacebook,
              FaInstagram,
              FaLinkedin,
              FaXTwitter,
              FaGithub,
            ].map((Icon, index) => (
              <button
                key={index}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-lg text-slate-300 transition hover:bg-blue-600 hover:text-white"
              >
                <Icon />
              </button>
            ))}

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;