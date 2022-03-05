import { Button, Card, Col, Form, Input, Row, Tooltip } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useRedux from "../hooks/useRedux";
import { RootState } from "../redux/configureStore";

function settings() {
  const { dispatchAction, $ } = useRedux();
  const [form] = Form.useForm();

  useEffect(() => {
    dispatchAction($.GET_QUESTION_CONFIGS_REQUEST);
  }, []);

  const durations = useSelector((state: RootState) => state.question.durations);
  const categories = useSelector(
    (state: RootState) => state.question.categories
  );
  const grades = useSelector((state: RootState) => state.question.grades);

  const renderSettingsItem = (
    title: string,
    isActive: boolean,
    _id: string,
    activate: any,
    deactivate: any,
    display?: any
  ) => {
    return (
      <Tooltip
        placement="topLeft"
        title={`${isActive ? "AKTİF" : "AKTİF DEĞİL"}.
         Değiştirmek için tıklayınız`}
      >
        <div
          className={`text-center rounded-xl pl-4 pr-4 ml-2 mb-2 cursor-pointer select-none ${
            isActive ? "text-black bg-white" : "bg-gray-400 text-white"
          }`}
          onClick={() => (isActive ? deactivate(_id) : activate(_id))}
        >
          {display ? display(title) : title}
        </div>
      </Tooltip>
    );
  };

  const displayDuration = (duration: string) =>
    moment.utc(Number(duration) * 1000).format("mm:ss");

  function Info({ children, title, width, largePadding, style }: any) {
    const widthStyle = width ? { width } : {};
    const paddingConstant = largePadding ? 8 : 4;
    return (
      <div
        className="relative"
        style={{ marginTop: largePadding ? 44 : 36, zIndex: 1, ...style }}
      >
        <div
          className={`absolute text-white pl-${paddingConstant} pr-${paddingConstant} pb-${paddingConstant} pt-${
            paddingConstant / 4
          } gBold rounded-xl font-extrabold`}
          style={{
            top: largePadding ? -35 : -22,
            left: -16,
            backgroundColor: "#161E68",
            width: "90%",
            ...widthStyle,
            zIndex: -1,
          }}
        >
          {title}
        </div>
        <div style={{ zIndex: 2 }}>{children}</div>
      </div>
    );
  }

  function DataContainer({ children }: any) {
    return (
      <Row
        className="max-h-48 overflow-y-scroll bg-gray-200 rounded-xl pl-4 pr-4 pt-2 pb-2 hide-scrollbar"
        style={{ minHeight: 45 }}
      >
        {children}
      </Row>
    );
  }

  const saveNewDuration = () => {
    dispatchAction($.CREATE_DURATION_REQUEST, form.getFieldValue("duration"));
    form.setFieldsValue({ duration: "" });
  };

  const saveNewCategory = () => {
    dispatchAction($.CREATE_CATEGORY_REQUEST, form.getFieldValue("category"));
    form.setFieldsValue({ category: "" });
  };

  const saveNewGrade = () => {
    dispatchAction($.CREATE_GRADE_REQUEST, form.getFieldValue("grade"));
    form.setFieldsValue({ grade: "" });
  };

  const activateDuration = (_id: string) => {
    dispatchAction($.ACTIVATE_DURATION, _id);
  };

  const deactivateDuration = (_id: string) => {
    dispatchAction($.DEACTIVATE_DURATION, _id);
  };

  const activateCategory = (_id: string) => {
    dispatchAction($.ACTIVATE_CATEGORY, _id);
  };

  const deactivateCategory = (_id: string) => {
    dispatchAction($.DEACTIVATE_CATEGORY, _id);
  };

  const activateGrade = (_id: string) => {
    dispatchAction($.ACTIVATE_GRADE, _id);
  };

  const deactivateGrade = (_id: string) => {
    dispatchAction($.DEACTIVATE_GRADE, _id);
  };

  const renderDurations = () =>
    durations?.reduce((prepared: any, current: any) => {
      prepared.push(
        renderSettingsItem(
          current.duration,
          current.isActive,
          current._id,
          activateDuration,
          deactivateDuration,
          displayDuration
        )
      );
      return prepared;
    }, []);

  const renderCategories = () =>
    categories?.reduce((prepared: any, current: any) => {
      prepared.push(
        renderSettingsItem(
          current.category,
          current.isActive,
          current._id,
          activateCategory,
          deactivateCategory
        )
      );
      return prepared;
    }, []);

  const renderGrades = () =>
    grades?.reduce((prepared: any, current: any) => {
      prepared.push(
        renderSettingsItem(
          current.grade,
          current.isActive,
          current._id,
          activateGrade,
          deactivateGrade
        )
      );
      return prepared;
    }, []);

  return (
    <Card className=" w-10/12 rounded-xl mt-10 mb-10 pl-4">
      <Form form={form} autoComplete="off" layout="vertical">
        <Info
          title="Sınav Süresi Seçenekleri"
          largePadding
          width="50%"
          style={{ marginBottom: 80 }}
        >
          <DataContainer>{renderDurations()}</DataContainer>
          <Row className="mt-2">
            <Col>
              <Form.Item name="duration">
                <Input
                  className="rounded-xl"
                  placeholder="Süre (saniye)"
                  type={"number"}
                />
              </Form.Item>
            </Col>
            <Col>
              <Button
                className="rounded-xl ml-2"
                type="primary"
                onClick={saveNewDuration}
              >
                Ekle
              </Button>
            </Col>
          </Row>
        </Info>
        <Info title="Kategori Seçenekleri" largePadding width="50%">
          <DataContainer>{renderCategories()}</DataContainer>
          <Row className="mt-2">
            <Col>
              <Form.Item name="category">
                <Input className="rounded-xl" placeholder="Kategori" />
              </Form.Item>
            </Col>
            <Col>
              <Button
                className="rounded-xl ml-2"
                type="primary"
                onClick={saveNewCategory}
              >
                Ekle
              </Button>
            </Col>
          </Row>
        </Info>
        <Info title="Sınıf Seçenekleri" largePadding width="50%">
          <DataContainer>{renderGrades()}</DataContainer>
          <Row className="mt-2">
            <Col>
              <Form.Item name="grade">
                <Input className="rounded-xl" placeholder="Sınıf" />
              </Form.Item>
            </Col>
            <Col>
              <Button
                className="rounded-xl ml-2"
                type="primary"
                onClick={saveNewGrade}
              >
                Ekle
              </Button>
            </Col>
          </Row>
        </Info>
      </Form>
    </Card>
  );
}

export default settings;
