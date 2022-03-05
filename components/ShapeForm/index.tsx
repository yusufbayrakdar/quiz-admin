import { Button, Card, Divider, Form, Input } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Head from "next/head";

import useRedux from "../../hooks/useRedux";
import { RootState } from "../../redux/configureStore";
import BykImageUpload from "../../components/BykImageUpload";

function ShapeForm({ _id }: { _id: any }) {
  const { dispatchAction, $ } = useRedux();
  const [form] = Form.useForm();

  const resetForm = useSelector((state: RootState) => state.shape.resetForm);
  const activeShape = useSelector(
    (state: RootState) => state.shape.activeShape
  );

  const onFinish = async (values: { image: any; searchTag: string }) => {
    let { image = {}, searchTag } = values;
    image.searchTag = searchTag;
    if (_id) {
      if (!activeShape) return null;
      image._id = _id;
      if (!image.imageUrl) {
        image = Object.assign(activeShape, image);
      }
      dispatchAction($.UPDATE_SHAPE_REQUEST, image);
    } else {
      dispatchAction($.CREATE_SHAPE_REQUEST, image);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (resetForm) form.resetFields();
  }, [resetForm]);

  useEffect(() => {
    if (_id) {
      dispatchAction($.GET_SHAPE_DETAIL_REQUEST, _id);
    }
  }, [_id]);

  useEffect(() => {
    if (_id && activeShape) {
      form.setFieldsValue({
        searchTag: activeShape.searchTag,
      });
    }
  }, [activeShape, form]);

  return (
    <div className="m-auto" style={{ width: "80%" }}>
      <Head>
        <title>Şekil Oluştur</title>
        <meta name="description" content="Şekil Oluştur" />
        <link rel="icon" href="/ideas.png" />
      </Head>
      <Card>
        <span className="font-bold">Şekil Oluştur</span>
        <Divider />
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Şekil"
            name="image"
            rules={
              _id
                ? []
                : [{ required: true, message: "Lütfen şekil ekleyiniz!" }]
            }
            validateStatus={"error"}
          >
            <BykImageUpload
              imageSize={{ width: 256, height: 256 }}
              getImage={(image) => {
                form.setFieldsValue({ image });
              }}
              resetForm={resetForm}
              defaultImage={_id && activeShape}
            />
          </Form.Item>
          <Form.Item
            label="Arama Etiketi"
            name={"searchTag"}
            rules={
              _id
                ? []
                : [
                    {
                      required: true,
                      message: "Lütfen arama etiketini giriniz!",
                    },
                  ]
            }
          >
            <Input placeholder="Örn: A" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="absolute right-0 top-0 pr-10 pl-10"
            >
              Kaydet
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default ShapeForm;
