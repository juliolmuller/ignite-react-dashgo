import { faker } from '@faker-js/faker/locale/pt_BR';
import { createServer, Factory, Model } from 'miragejs';

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
      server.createList('user', 100);
    },

    routes() {
      this.timing = 800;
      this.namespace = 'api';

      this.get('/users');
      this.post('/users');

      // reset namespace to avoid conflicts with Next's router
      this.namespace = '';
      this.passthrough();
    },
  });
}
