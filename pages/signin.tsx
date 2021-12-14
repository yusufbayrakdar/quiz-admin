import React, { useEffect } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";

import useRedux from "../hooks/useRedux";
import { RootState } from "../redux/configureStore";

function SignIn() {
  const router = useRouter();
  const { dispatchAction, $ } = useRedux();
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    dispatchAction($.LOGIN_REQUEST, values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (loggedIn) {
      form.resetFields();
      router.push("/");
    }
  }, [loggedIn]);

  return (
    <div className="bg-blue-500 h-full w-screen flex justify-center items-center">
      <Head>
        <title>Admin - Giriş</title>
        <meta name="description" content="Admin giriş sayfası" />
        <link rel="icon" href="/ideas.png" />
      </Head>
      <Form
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3"
      >
        <Form.Item
          label="Kullanıcı Adı"
          name="nickname"
          rules={[
            { required: true, message: "Lütfen kullanıcı adınızı giriniz!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Şifre"
          name="password"
          rules={[{ required: true, message: "Lütfen şifrenizi giriniz!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox className="flex justify-end">Beni hatırla</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="absolute right-0 top-0 pr-10 pl-10"
          >
            Giriş Yap
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default SignIn;
