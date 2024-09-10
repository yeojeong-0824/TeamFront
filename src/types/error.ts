export interface CustomError extends Error {
  response: {
    data: {
      error: string;
    };
    status: number;
  };
};