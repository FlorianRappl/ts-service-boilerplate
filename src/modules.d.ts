declare module 'swagger-ui-express' {
  import { RequestHandler } from 'express';

  export const serve: RequestHandler;
  export const setup: {
    (document: any): RequestHandler;
  };
}
