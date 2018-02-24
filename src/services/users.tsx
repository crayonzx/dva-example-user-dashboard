import request from '../utils/request';
import { UserValues } from '../components/Users/UserModal';
import { PAGE_SIZE } from '../constants';

export function fetch({ page }: { page: number }) {
  return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
}

export function remove(id: string) {
  return request(`/api/users/${id}`, {
    method: 'DELETE',
  });
}

export function patch(id: string, values: UserValues) {
  return request(`/api/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(values),
  });
}

export function create(values: UserValues) {
  return request('/api/users', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
