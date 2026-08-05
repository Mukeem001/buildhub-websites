import type { Project } from "../types/project";

import ecommerce from "../assets/images/ecommerce.webp";
import restaurant from "../assets/images/restaurant.webp";
import portfolio from "../assets/images/portfolio.webp";

export const projects: Project[] = [
  {
    id: "1",
    name: "My Ecommerce",
    templateName: "Modern Ecommerce",
    templateSlug: "modern-ecommerce",

    url: "https://myecommerce.buildhub.app",

    domain: "",

    status: "live",

    createdAt: "02 Jul 2026",

    visits: 1245,

    orders: 86,

    image: ecommerce,
  },

  {
    id: "2",
    name: "Food Corner",
    templateName: "Restaurant Pro",
    templateSlug: "restaurant-pro",

    url: "https://foodcorner.buildhub.app",

    domain: "foodcorner.com",

    status: "building",

    createdAt: "01 Jul 2026",

    visits: 342,

    orders: 18,

    image: restaurant,
  },

  {
    id: "3",
    name: "My Portfolio",
    templateName: "Portfolio X",
    templateSlug: "portfolio-x",

    url: "https://portfolio.buildhub.app",

    domain: "",

    status: "live",

    createdAt: "29 Jun 2026",

    visits: 521,

    orders: 0,

    image: portfolio,
  },
];