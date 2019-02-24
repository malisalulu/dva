import request from '../utils/request';

export function query() {
  return request('/api/users');
}
export function tags() {
  return request('/api/tags');
}
