import { Router } from './kits';
import Counter from './apps/counter/Counter';

const routes = [
  {
    path: '/counter',
    component: Counter
  }
]

export default Router.renderRoutes(routes);