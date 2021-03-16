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
              {item.data.name === 'image' ? (
                <img
                  style={{ height: 30, width: 30, margin: '0 1px' }}
                  src={item.data.image}
                  alt="img"
                />
              ) : (
                <i className={'iconfont ' + item.icon} style={{ fontSize: 13 }} />
              )}
            </a>
          );
        })}
      </div>
    </div>
  ));
};

export default Layout;
