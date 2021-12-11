import React, { useEffect, useState } from "react";
import { Layout, Menu, Row } from "antd";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";

import { RootState } from "../../redux/configureStore";
import { Route } from "../../utils";
import useRedux from "../../hooks/useRedux";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

function CustomSider() {
  const router = useRouter();
  const { dispatchAction, $ } = useRedux();

  const toggleUserInfo = () => {
    dispatchAction($.TOGGLE_USER_INFO);
  };

  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const userInfoVisible = useSelector(
    (state: RootState) => state.auth.userInfoVisible
  );
  const [currentRoute, setCurrentRoute] = useState(1);

  useEffect(
    () =>
      setCurrentRoute(
        Number(routes.find((r) => r.path.includes(router.pathname))?.order)
      ),
    [router.pathname]
  );

  const routes: Array<Route> = [
    { path: "/", title: "ANA SAYFA", order: 1 },
    { path: "/signin", title: "GİRİŞ YAP", order: 3 },
    { path: "/signup", title: "KAYDOL", order: 4 },
  ];

  if ("/signin" === router.pathname) return null;

  return (
    <Sider theme="light">
      <Menu mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item
          key="1"
          icon={<UserOutlined />}
          onClick={() => router.push("/instructors?page=1")}
        >
          Eğitmenler
        </Menu.Item>
        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
          Öğrenciler
        </Menu.Item>
        <Menu.Item key="3" icon={<UploadOutlined />}>
          Sorular
        </Menu.Item>
        <Menu.Item key="4" icon={<UploadOutlined />}>
          Denemeler
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default CustomSider;
