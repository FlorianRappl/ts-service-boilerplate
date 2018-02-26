import { Get, Route, Controller } from 'tsoa';
import { ErrorResponseEntity } from '../types';

@Route('error')
export class ErrorController extends Controller {
  @Get()
  public getError(): Promise<ErrorResponseEntity> {
    return Promise.reject({
      code: 101,
      message: 'Bad request... Good luck next time!',
    });
  }
}
