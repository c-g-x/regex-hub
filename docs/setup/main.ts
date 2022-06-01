import { defineAppSetup } from '@slidev/types';
import naive from 'naive-ui';

export default defineAppSetup(({ app, router }) => {
  // Vue App
  app.use(naive);
});
