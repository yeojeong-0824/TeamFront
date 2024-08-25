export interface CustomError extends Error {
  response: {
    status: number;
  };
};