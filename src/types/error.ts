export interface ErrorResponseEntity {
  code: number;
  message: string;
  data?: {
    [key: string]: any;
  };
}
