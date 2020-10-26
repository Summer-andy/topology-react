import React from 'react';

const Layout = ({ Tools, onDrag }) => {
  return Tools.map((item, index) => (
    <div key={index}>
      <div className="title">{item.group}</div>
      <div className="button">
        {item.children.map((item, idx) => {
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          return (
            <a
              key={idx}
              title={item.name}
              draggable
              href="/#"
              onDragStart={(ev) => onDrag(ev, item)}
            >
              <i className={'iconfont ' + item.icon} style={{ fontSize: 13 }}></i>
            </a>
          );
        })}
      </div>
    </div>
  ));
};

export default Layout;
