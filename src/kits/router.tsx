import Msg from './msg';
import React, { useEffect, useState } from 'react';
import { Router } from 'react-router';
import RenderRoutes from './renderRoutes';
import { createHashHistory } from 'history';

declare global {
  namespace Argo {
    /** 路由全局对象 */
    namespace Router {
      /** 打标记的根节点 */
      var rootPath: string;
      /** 上一次的 URL */
      var oldUrl: string;
    }
  }
}

function Push(pathname: string) {
  Msg.emit('navigate::route::push', pathname);
}
function Back() {
  Msg.emit('navigate::route::back', {});
}
function Replace(pathname: string) {
  Msg.emit('navigate::route::replace', pathname);
}
function Pop(route?: number) {
  Msg.emit('navigate::route::pop', route);
}
function Top(pathname: string) {
  Msg.emit('navigate::route::top', pathname);
}
window.Argo = {
  ...window.Argo,
  Router: {
  rootPath: '',
  oldUrl: ''
  }
};
const hashHistory = createHashHistory();

//@ts-ignore
const renderRoutes = routes => props => {
  const [pathname, setPathname] = useState('');

  useEffect(() => {
    Msg.on('navigate::route::push', pathname => {
      hashHistory.push(pathname);
    });
    Msg.on('navigate::route::back', () => {
      hashHistory.goBack();
    });
    Msg.on('navigate::route::replace', pathname => {
      hashHistory.replace(pathname);
    });
    Msg.on('navigate::route::top', (pathname: string) => {
      hashHistory.push(pathname);
      Argo.Router.rootPath = pathname.replace(/\?[\s\S]*$/, '');
    });
    hashHistory.listen(({ pathname }, action) => {
      console.log('pathname ==>', pathname, action);
      setPathname(pathname);
      if (Argo.Router.rootPath === Argo.Router.oldUrl && action === 'POP') {
      console.log('--- closeBrowser --->');
      }
      Argo.Router.oldUrl = pathname;
    });
  }, []);

  return (
    <Router history={hashHistory}>
      <RenderRoutes
        routesConfig={routes}
        history={hashHistory}
        pathname={pathname}
        {...props}
      />
    </Router>
  );
};

export default {
  Push,
  Back,
  Replace,
  Pop,
  Top,
  renderRoutes
};