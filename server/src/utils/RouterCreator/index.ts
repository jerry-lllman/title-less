import { CustomContext } from '../../typings';
import Router from 'koa-router';

export function createRouter() {
  return new Router<{}, CustomContext>();
}
