import React, { useMemo, useCallback } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { History } from 'history';
import groupBy from 'lodash/groupBy';
import './renderRoutes.less';

interface IRenderRoutesProps {
  history: History;
  routesConfig: any[];
  [k: string]: any;
}

const RenderRoutes: React.SFC<IRenderRoutesProps> = ({
  routesConfig,
  history,
  pathname,
  ...resetProps
}) => {
  /** css 前缀 */
  const ANIMATION_MAP = useMemo(() => ({ PUSH: 'forward', REPLACE: 'forward', POP: 'back' }),[]);
  /** 路由配置分组 */
  const { redirect = [], routes = [] } = groupBy(routesConfig, config =>
    config.redirect ? 'redirect' : 'routes'
  );

  /** 渲染具体路由 */
  const routeRenderer = useCallback((location: History['location']) => (
    <Switch location={location}>
    {
      routes.filter(route => route.component).map((route, i) => {
        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact ? true : false}
            render={props => (
              <route.component
                {...route}
                {...props}
                {...resetProps}
                routes={route.routes}
              />
              )
            }
          />
        );
      })
      }
    </Switch>
    ),
    [history.location]
  );

  return (
    <Switch>
    {redirect.map((item, i) => (
      <Redirect key={i} exact={true} from={item.path} to={item.redirect} />
    ))}
    <Route
      pathname={pathname}
      render={() => (
        <TransitionGroup
          className="router-wrapper"
          childFactory={child =>
            React.cloneElement(child, {
            classNames: ANIMATION_MAP[history.action]
            })
          }
        >
          <CSSTransition timeout={300} key={history.location.pathname}>
            {routeRenderer(history.location)}
          </CSSTransition>
        </TransitionGroup>
      )
    }
    />
    </Switch>
  );
};
export default RenderRoutes;