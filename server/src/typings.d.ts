

import type { Context, Next } from 'koa';


declare interface CustomContext {
  success: (data?: any, message?: any) => ResponseBody;
  fail: (message?: any) => ResponseBody;
}


declare type MiddleWareFn = (ctx: Context, next: Next) => void;
