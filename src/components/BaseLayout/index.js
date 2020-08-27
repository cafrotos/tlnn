import React from 'react';
import { Layout, Menu } from 'antd';

import './index.less'
import { useRouteMatch, Link } from 'react-router-dom';
import menuBar from 'configs/menuBar';

export default ({
  title,
  header,
  children
}) => {
  document.title = title;

  const routeMatch = useRouteMatch();

  return (
    <Layout className="base_layout">
      {
        header !== false && (
          <Layout.Header className="base_header">
            <Menu theme="dark" mode="horizontal" selectedKeys={routeMatch.path}>
              {
                menuBar
                  .map((menu) => (
                    <Menu.Item key={menu.path}>
                      <Link to={menu.path}>
                        {menu.title}
                      </Link>
                    </Menu.Item>
                  ))
              }
            </Menu>
          </Layout.Header>
        )
      }
      <Layout.Content className={`base_content ${routeMatch.path.split("/").join("_")}`}>
        {children}
      </Layout.Content>
      <Layout.Footer className="base_footer">
        @2020-UET
      </Layout.Footer>
    </Layout>
  )
}