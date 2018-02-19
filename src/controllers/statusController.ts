import { Get, Route, Controller } from 'tsoa';
import { StatusResponseEntity } from '../types';
import { getCurrentStatus } from '../services/statusService';

@Route('status')
export class StatusController extends Controller {
  @Get()
  public getCurrent(): StatusResponseEntity {
    return getCurrentStatus();
  }
}
