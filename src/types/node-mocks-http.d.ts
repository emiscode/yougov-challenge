// node-mocks-http.d.ts
import { NextApiRequest, NextApiResponse } from "next";

declare module "node-mocks-http" {
  import { IncomingMessage, ServerResponse } from "http";

  export function createMocks<
    TReq = NextApiRequest,
    TRes = NextApiResponse
  >(options?: {
    method?: string;
    url?: string;
    headers?: { [key: string]: string };
    body?: any;
  }): {
    req: TReq & IncomingMessage;
    res: TRes &
      ServerResponse & {
        _getData: () => string;
        _getStatusCode: () => number;
      };
  };
}
