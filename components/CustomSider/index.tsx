import React from "react";
import { Layout, Menu } from "antd";
import { useRouter } from "next/router";

import { BASE_ENDPOINT } from "../../utils";
import {
  QuestionCircleOutlined,
  FormOutlined,
  UnorderedListOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGraduate,
  faChalkboardTeacher,
} from "@fortawesome/free-solid-svg-icons";
import SubMenu from "antd/lib/menu/SubMenu";

const { Sider } = Layout;

function CustomSider() {
  const router = useRouter();

  if ("/signin" === router.pathname) return null;

  return (
    <Sider theme="light">
      <Menu mode="inline" selectedKeys={[router.pathname.split("?")[0]]}>
        <Menu.Item
          key={BASE_ENDPOINT.instructor}
          icon={<FontAwesomeIcon icon={faChalkboardTeacher} width={18} />}
          onClick={() => router.push(`${BASE_ENDPOINT.instructor}?page=1`)}
        >
          Eğitmenler
        </Menu.Item>
        <Menu.Item
          key={BASE_ENDPOINT.student}
          icon={<FontAwesomeIcon icon={faUserGraduate} width={15} />}
          onClick={() => router.push(`${BASE_ENDPOINT.student}?page=1`)}
        >
          Öğrenciler
        </Menu.Item>
        <SubMenu
          key={`sub-${BASE_ENDPOINT.shape}`}
          icon={<QuestionCircleOutlined />}
          title="Şekiller"
        >
          <Menu.Item
            key={`${BASE_ENDPOINT.shape}`}
            icon={<UnorderedListOutlined />}
            onClick={() => router.push(`${BASE_ENDPOINT.shape}?page=1`)}
          >
            Liste
          </Menu.Item>
          <Menu.Item
            key={`${BASE_ENDPOINT.shape}/create`}
            icon={<PlusCircleOutlined />}
            onClick={() => router.push(`${BASE_ENDPOINT.shape}/create`)}
          >
            Oluştur
          </Menu.Item>
        </SubMenu>
        <Menu.Item
          key={BASE_ENDPOINT.quiz}
          icon={<FormOutlined />}
          onClick={() => router.push(`${BASE_ENDPOINT.quiz}?page=1`)}
        >
          Denemeler
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default CustomSider;
