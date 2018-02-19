import * as express from 'express';
import { RegisterRoutes } from './routes';
import { RegisterDocumentation } from './docs';
import './controllers/statusController';

const port = 8888;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

RegisterDocumentation(app);
RegisterRoutes(app);

app.listen(port, () => console.log(`Listening at port ${port} ...`));
