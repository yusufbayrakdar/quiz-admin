import React from "react";
import { Layout, Menu } from "antd";
import { useRouter } from "next/router";

import { BASE_ENDPOINT, Route } from "../../utils";
import { QuestionCircleOutlined, FormOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGraduate,
  faChalkboardTeacher,
} from "@fortawesome/free-solid-svg-icons";

const { Sider } = Layout;

function CustomSider() {
  const router = useRouter();

  if ("/signin" === router.pathname) return null;

  let selectedKey = "";
  const endpointValues = Object.values(BASE_ENDPOINT);
  for (let i = 0; i < endpointValues.length; i++) {
    if (router.pathname === endpointValues[i]) {
      selectedKey = `${i}`;
      break;
    }
  }

  return (
    <Sider theme="light">
      <Menu mode="inline" defaultSelectedKeys={[selectedKey]}>
        <Menu.Item
          key="0"
          icon={<FontAwesomeIcon icon={faChalkboardTeacher} width={18} />}
          onClick={() => router.push(`${BASE_ENDPOINT.instructor}?page=1`)}
        >
          Eğitmenler
        </Menu.Item>
        <Menu.Item
          key="1"
          icon={<FontAwesomeIcon icon={faUserGraduate} width={15} />}
          onClick={() => router.push(`${BASE_ENDPOINT.student}?page=1`)}
        >
          Öğrenciler
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<QuestionCircleOutlined />}
          onClick={() => router.push(`${BASE_ENDPOINT.question}?page=1`)}
        >
          Sorular
        </Menu.Item>
        <Menu.Item
          key="3"
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
