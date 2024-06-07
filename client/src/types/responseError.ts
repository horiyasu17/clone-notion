type ErrorType = {
  location: string;
  msg: string;
  path: string;
  type: string;
  value: string;
};

export type ErrorResponse = {
  errors?: ErrorType[];
};
