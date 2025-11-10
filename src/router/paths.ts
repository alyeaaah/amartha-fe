import { dateParser, floatParser, intParser, route, stringParser } from "typesafe-routes";

export const paths = {
  landingPage: "/",
  aboutPage: "/about",
  animePage: {
    index: route(`/anime&:limit?&:page?&:order_by?&:sort?&:q?&:genres?&:type?&:rating?&:status?&:producers?&:max_score?&:min_score?&:start_date?&:end_date?`, {
      limit: intParser,
      page: intParser,
      order_by: stringParser,
      sort: stringParser,
      q: stringParser,
      genres: stringParser,
      type: stringParser,
      rating: stringParser,
      status: stringParser,
      producers: stringParser,
      max_score: floatParser,
      min_score: floatParser,
      start_date: stringParser,
      end_date: stringParser,
    }, {}),
    detail: route(`/anime/:id`, {
      id: stringParser
    }, {}),
  },
  administrator: {
    dashboard: "/admin",
    pet: {
      list: "/admin/pet",
      create: "/admin/pet/create",
      update: route(`/admin/pet/:id`, {
        id: stringParser
      }, {}),
    },
    orders: {
      new: `/admin/order/new`,
      detail: route(`/admin/order/:id`, {
        id: stringParser
      }, {}), 
      index: `/admin/order`, 
    },
  },
  registerPage: "/register",
  errorPage: "/error",
  loginPage: "/login",
} as const;
