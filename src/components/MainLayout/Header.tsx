import * as React from 'react';
import { observer, inject } from "mobx-react";
import { Menu, Icon } from 'antd';
import { Link } from "react-router-dom";
// import { Location } from 'history';
import { RouterModelType } from "../../models";

interface HeaderProps {
  router?: RouterModelType,
}

const Header = inject('router')(observer(({ router }: HeaderProps) => {
  return (
    <Menu selectedKeys={[router!.location.pathname]} mode="horizontal" theme="dark">
      <Menu.Item key="/users">
        <Link to="/users">
          <Icon type="bars" />Users
        </Link>
      </Menu.Item>
      <Menu.Item key="/">
        <Link to="/">
          <Icon type="home" />Home
        </Link>
      </Menu.Item>
      <Menu.Item key="/404">
        <Link to="/page-you-dont-know">
          <Icon type="frown-circle" />404
        </Link>
      </Menu.Item>
      <Menu.Item key="/antd">
        <a href="https://github.com/dvajs/dva">dva</a>
      </Menu.Item>
    </Menu>
  );
}));

export default Header;
