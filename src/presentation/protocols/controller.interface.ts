import {IHttpRequest,IHttpResponse} from './http.interface';
export interface ControllerInterface {
  handle(httpRequest: IHttpRequest): Promise<IHttpResponse>
}