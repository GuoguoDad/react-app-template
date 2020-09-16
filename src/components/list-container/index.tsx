import React, { ReactNode } from 'react';
import './index.less';

export const ListContainer = (props: { children?: ReactNode }) => {
  return (
    <div className="list-body">
      {props.children}
    </div>
  );
}