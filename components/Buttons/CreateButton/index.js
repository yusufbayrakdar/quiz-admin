import React from "react";
import { Button, Row } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

function CreateButton({
  style = {},
  onClick,
  shape,
  children,
  loading,
  disabled,
}) {
  return (
    <Button
      loading={loading}
      disabled={disabled}
      shape={shape}
      style={style}
      type="primary"
      onClick={onClick}
      className="bg-secondPrimary"
    >
      <Row style={{ display: "flex", alignItems: "center" }}>
        <PlusCircleOutlined style={{ marginRight: 8 }} />
        {children || "Oluştur"}
      </Row>
    </Button>
  );
}

export default CreateButton;
