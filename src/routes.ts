import { Router } from './kits';
import Counter from './apps/counter/counter';

const routes = [
  {
    path: '/counter',
    component: Counter
  }
]

export default Router.renderRoutes(routes);