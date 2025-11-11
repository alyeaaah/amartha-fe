import { http, HttpResponse } from "msw";

import { clientEnv } from "@/env";

const baseUrl = clientEnv.API_BASE_URL;

export const handlers = [
  http.get(`${baseUrl}/v3/auth/menus`, () => {
    return HttpResponse.json({ result: [] });
  }),
];
