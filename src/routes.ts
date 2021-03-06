/* tslint:disable */
import { Controller, ValidateParam, FieldErrors, ValidateError, TsoaRoute } from 'tsoa';
import { StatusController } from './controllers/statusController';
import { ErrorController } from './controllers/errorController';

const models: TsoaRoute.Models = {
  "StatusResponseEntity": {
    "properties": {
      "status": { "dataType": "enum", "enums": ["healthy", "unhealthy"], "required": true },
      "name": { "dataType": "string", "required": true },
      "version": { "dataType": "string", "required": true },
      "id": { "dataType": "string", "required": true },
    },
  },
  "ErrorResponseEntity": {
    "properties": {
      "code": { "dataType": "double", "required": true },
      "message": { "dataType": "string", "required": true },
      "data": { "dataType": "any" },
    },
  },
};

export function RegisterRoutes(app: any) {
  app.get('/api/status',
    function(request: any, response: any, next: any) {
      const args = {
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new StatusController();


      const promise = controller.getCurrent.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/api/error',
    function(request: any, response: any, next: any) {
      const args = {
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new ErrorController();


      const promise = controller.getError.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });


  function isController(object: any): object is Controller {
    return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
  }

  function promiseHandler(controllerObj: any, promise: any, response: any, next: any) {
    return Promise.resolve(promise)
      .then((data: any) => {
        let statusCode;
        if (isController(controllerObj)) {
          const headers = controllerObj.getHeaders();
          Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
          });

          statusCode = controllerObj.getStatus();
        }

        if (data || data === false) { // === false allows boolean result
          response.status(statusCode || 200).json(data);
        } else {
          response.status(statusCode || 204).end();
        }
      })
      .catch((error: any) => next(error));
  }

  function getValidatedArgs(args: any, request: any): any[] {
    const fieldErrors: FieldErrors = {};
    const values = Object.keys(args).map((key) => {
      const name = args[key].name;
      switch (args[key].in) {
        case 'request':
          return request;
        case 'query':
          return ValidateParam(args[key], request.query[name], models, name, fieldErrors);
        case 'path':
          return ValidateParam(args[key], request.params[name], models, name, fieldErrors);
        case 'header':
          return ValidateParam(args[key], request.header(name), models, name, fieldErrors);
        case 'body':
          return ValidateParam(args[key], request.body, models, name, fieldErrors, name + '.');
        case 'body-prop':
          return ValidateParam(args[key], request.body[name], models, name, fieldErrors, 'body.');
      }
    });
    if (Object.keys(fieldErrors).length > 0) {
      throw new ValidateError(fieldErrors, '');
    }
    return values;
  }
}
