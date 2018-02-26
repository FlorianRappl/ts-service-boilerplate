import { Application, ErrorRequestHandler, RequestHandler } from 'express';

interface CodeToStatusMapping {
  [code: number]: number;
}

const production = process.env.NODE_ENV === 'production';
const codeToStatus: CodeToStatusMapping = {
  100: 404,
  101: 400,
  102: 404,
  103: 401,
  104: 404,
  105: 403,
};

export function RegisterError(app: Application) {
  const notFoundHandler: RequestHandler = (req, res) => {
    res.status(404);
    res.json({
      code: 100,
      message: `The route ${req.url} was not found.`,
      data: {
        url: req.url,
      },
    });
  };
  const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(err && err.status || 500);

    if (typeof err === 'object') {
      if (err.code) {
        const status = codeToStatus[err.code];

        if (status !== undefined) {
          res.status(status);
        }

        res.json(err);
      } else {
        res.json({
          message: err.message,
          error: production ? {} : err,
        });
      }
    } else if (typeof err === 'string') {
      res.json({
        message: err,
      });
    } else {
      res.json({
        message: 'An unknown error occurred.',
      });
    }
  };
  app.use(notFoundHandler);
  app.use(errorHandler);
}
