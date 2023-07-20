interface ErrorDto {
  timestamp: string;
  status: number;
  error: string;
  message?: string;
  fields?: FieldError[];
}

interface FieldError {
  name: string;
  message: string;
}

export { ErrorDto, FieldError };
