import React, { ReactNode } from 'react';
import './index.less';

export const ListContainer = (props: { children?: ReactNode }) => {
  return (
    <div className="am-list-body my-body">
      {props.children}
    </div>
  );
}