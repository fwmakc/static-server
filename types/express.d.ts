export {};

declare module 'express-serve-static-core' {
  interface Request {
    t: (key: string, options?: Record<string, unknown>) => unknown;
    language: string;
  }
}
