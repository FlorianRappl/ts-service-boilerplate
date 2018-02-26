import * as express from 'express';
import { RegisterRoutes } from './routes';
import { RegisterDocumentation } from './docs';
import { RegisterError } from './errors';
import './controllers';

const port = 8888;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

RegisterDocumentation(app);
RegisterRoutes(app);
RegisterError(app);

app.listen(port, () => console.log(`Listening at port ${port} ...`));
