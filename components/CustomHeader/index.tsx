import React from "react";
import { Dropdown, Layout, Menu, Row } from "antd";
import { useSelector } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";

import { RootState } from "../../redux/configureStore";
import useRedux from "../../hooks/useRedux";

const { Header } = Layout;

function CustomHeader() {
  const router = useRouter();
  const { dispatchAction, $ } = useRedux();

  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const staff = useSelector((state: RootState) => state.auth.staff);

  if ("/signin" === router.pathname) return null;

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <span>Şifre Değiştir</span>
      </Menu.Item>
      <Menu.Item key="1" onClick={() => dispatchAction($.LOGOUT_REQUEST)}>
        <Link href="/signin">Çıkış Yap</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="relative bg-blue-600">
      <Row className="flex flex-1 relative">
        <Link href="/">
          <p className="font-bold text-gray-100 font-sans text-2xl text-center flex justify-center items-center cursor-pointer mt-4">
            BilsemAI
          </p>
        </Link>
        {loggedIn && (
          <Dropdown overlay={menu} trigger={["click"]}>
            <div className=" absolute right-10 top-2 pl-4 pr-4 h-12 flex items-center cursor-pointer">
              <UserOutlined
                className="text-lg w-10 h-10 flex justify-center items-center rounded-full"
                style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
              />
              <span className="ml-2 mr-2 text-gray-100 select-none">
                {staff?.nickname}
              </span>
              <FontAwesomeIcon
                className="text-gray-100"
                icon={faChevronDown}
                width={18}
              />
            </div>
          </Dropdown>
        )}
      </Row>
    </Header>
  );
}

export default CustomHeader;
