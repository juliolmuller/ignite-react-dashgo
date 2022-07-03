import { faker } from '@faker-js/faker/locale/pt_BR';
import { createServer, Factory, Model } from 'miragejs';

export interface PagedResponse<T> {
  data: T[];
  meta: {
    firstPage: string;
    lastPage: string;
    prevPage: string | null;
    nextPage: string | null;
    currentPage: number;
    totalPages: number;
    recordsPerPage: number;
    totalRecords: number;
  };
}

export interface UserModel {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

export function initializeServer() {
  return createServer({
    models: {
      user: Model.extend<Partial<UserModel>>({}),
    },

    factories: {
      user: Factory.extend({
        name: () => `${faker.name.firstName()} ${faker.name.lastName()}`,
        email: () => faker.internet.email().toLowerCase(),
        password: () => 'Senha123',
        createdAt: () => faker.date.recent(180).toISOString(),
      }),
    },

    seeds(server) {
      server.createList('user', 128);
    },

    routes() {
      this.timing = 800;
      this.namespace = 'api';

      this.get('/users', (schema, request): PagedResponse<UserModel> => {
        const { page, limit } = request.queryParams ?? {};
        const pageAsNumber = parseInt(page ?? 1, 10);
        const limitAsNumber = parseInt(limit ?? 20, 10);
        const users = schema.all('user').models as UserModel[];
        const totalRecords = users.length;
        const totalPages = Math.ceil(totalRecords / limitAsNumber);
        const pagedUsers = users.slice(
          (pageAsNumber - 1) * limitAsNumber,
          pageAsNumber * limitAsNumber,
        );

        return {
          data: pagedUsers,
          meta: {
            firstPage: `/api/users?page=1&limit=${limitAsNumber}`,
            lastPage: `/api/users?page=${totalPages}&limit=${limitAsNumber}`,
            prevPage:
              pageAsNumber === 1
                ? null
                : `/api/users?page=${pageAsNumber - 1}&limit=${limitAsNumber}`,
            nextPage:
              pageAsNumber >= totalPages
                ? null
                : `/api/users?page=${pageAsNumber + 1}&limit=${limitAsNumber}`,
            currentPage: pageAsNumber,
            totalPages,
            recordsPerPage: limitAsNumber,
            totalRecords: totalRecords,
          },
        };
      });

      // shorthand for user creation
      this.post('/users');

      // reset namespace to avoid conflicts with Next's router
      this.namespace = '';
      this.passthrough();
    },
  });
}
