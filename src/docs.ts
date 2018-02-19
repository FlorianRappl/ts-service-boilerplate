import { Application } from 'express';
import { serve, setup } from 'swagger-ui-express';
import { load } from 'yamljs';
import { resolve } from 'path';

export function RegisterDocumentation(app: Application) {
  const swaggerFile = resolve(__dirname, '..', 'swagger.yaml');
  const swaggerDocument = load(swaggerFile);

  app.use('/api-docs', serve, setup(swaggerDocument));
  app.get('/api/swagger.yaml', (req, res) => res.sendFile(swaggerFile));
}
