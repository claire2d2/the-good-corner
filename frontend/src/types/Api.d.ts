export type SuccessResponse<T> = {
    result: T;
    success: true;
  };
  
  export type ErrorResponse = {
    message: string;
    success: false;
  };
  
  export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
