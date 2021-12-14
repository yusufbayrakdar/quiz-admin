import React, { useState } from "react";
import { Button, Popconfirm, Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import useRedux from "../../hooks/useRedux";
export default function ConfirmButton({
  _id,
  children,
  refreshActions,
  confirm = true,
}) {
  const { dispatchAction, $ } = useRedux();

  const [visible, setVisible] = useState(false);

  const makePremium = () => {
    dispatchAction(confirm ? $.CANCEL_INSTRUCTOR : $.CONFIRM_INSTRUCTOR, {
      _id,
      refreshActions,
    });
    setVisible(false);
  };

  return (
    <Popconfirm
      title={
        confirm
          ? "Iptal etmek istediğinize emin misiniz?"
          : "Onaylamak istediğinize emin misiniz?"
      }
      visible={visible}
      onConfirm={makePremium}
      onCancel={() => setVisible(false)}
      okText="Evet"
      cancelText="Hayır"
      placement="left"
    >
      <Button
        className="text-gray-200 focus:text-white hover:text-white rounded-full w-28 flex justify-center"
        style={{
          backgroundColor: confirm ? "red" : "#52c41a",
        }}
        onClick={() => setVisible(true)}
      >
        <Row>
          {children || "Onayla"}
          <FontAwesomeIcon
            icon={confirm ? faTimes : faCheck}
            className="w-4 ml-2 "
          />
        </Row>
      </Button>
    </Popconfirm>
  );
}
