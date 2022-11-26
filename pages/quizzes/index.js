import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Button, Card, Row } from "antd";
import styled from "styled-components";

import useRedux from "../../hooks/useRedux";
import CustomTable from "../../components/CustomTable";
import { BASE_ENDPOINT, displayDuration, displayFullName } from "../../utils";
import SelectStudentModal from "../../components/Modals/SelectStudentModal";
import DeleteButton from "../../components/Buttons/DeleteButton";
import EditItemButton from "../../components/Buttons/EditItemButton";
import StartButton from "../../components/Buttons/StartButton";

function Quizzes() {
  const { dispatchAction, $ } = useRedux();
  const router = useRouter();
  const query = router.query;

  const search = query["search"];
  const page = query["page"] || 1;
  const limit = query["limit"] || 12;

  const instructor = useSelector((state) => state.auth.instructor);
  const student = useSelector((state) => state.auth.student);
  const quizList = useSelector((state) => state.quiz.quizList);
  const totalQuizzes = useSelector((state) => state.quiz.totalQuizzes);
  const quizListLoading = useSelector((state) => state.quiz.quizListLoading);
  const quizSavingInProgress = useSelector(
    (state) => state.quiz.quizSavingInProgress
  );
  const quizDeleteInProgress = useSelector(
    (state) => state.quiz.quizDeleteInProgress
  );

  const [selectStudentModalVisible, setSelectStudentModalVisible] =
    useState(false);
  const [selectedQuizForStudentModal, setSelectedQuizForStudentModal] =
    useState();

  useEffect(() => {
    const studentFilter = student ? { assignedStudents: student?._id } : {};
    dispatchAction($.GET_QUIZ_LIST_REQUEST, {
      search,
      page,
      limit,
      ...studentFilter,
    });
  }, [$, dispatchAction, search, page, limit, student]);

  const deleteQuiz = (_id) => {
    dispatchAction($.DELETE_QUIZ_REQUEST, _id);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (name, { _id }) => (
        <div
          className="text-primary cursor-pointer"
          onClick={() =>
            router.push(
              student
                ? BASE_ENDPOINT.quiz + "/" + _id
                : BASE_ENDPOINT.quiz + "/detail/" + _id
            )
          }
        >
          {name || "-"}
        </div>
      ),
    },
    {
      title: "Soru",
      dataIndex: "questionList",
      render: (questionList) =>
        Array.isArray(questionList) && <Info>{questionList.length}</Info>,
    },
    {
      title: "Öğrenci",
      dataIndex: "assignedStudents",
      render: (assignedStudents) =>
        Array.isArray(assignedStudents) && (
          <Info>{assignedStudents.length}</Info>
        ),
    },
    {
      title: "Süre",
      dataIndex: "duration",
      render: (duration, { questionList }) => {
        return (
          <Info>
            {displayDuration(
              duration ||
                questionList?.reduce((total, current) => {
                  total += current?.duration?.duration;
                  return total;
                }, 0)
            )}
          </Info>
        );
      },
    },
    {
      title: "Eğitmen",
      dataIndex: "creator",
      render: (creator) => creator && <Info>{displayFullName(creator)}</Info>,
    },
    {
      title: "",
      render: ({ _id }) => (
        <Row className="center">
          <Button
            type="text"
            className="rounded-full ml-1 center"
            onClick={() => {
              setSelectedQuizForStudentModal(_id);
              setSelectStudentModalVisible(true);
            }}
          >
            <div className="absolute text-green rounded-full center">
              <Image
                src="/telegram.svg"
                width={13}
                height={13}
                alt="telegram-send-icon"
              />
            </div>
          </Button>
          <EditItemButton baseEndpoint={BASE_ENDPOINT.quiz} _id={_id} />
          <DeleteButton
            onConfirm={() => deleteQuiz(_id)}
            loading={quizDeleteInProgress}
          />
        </Row>
      ),
    },
  ];

  return (
    <div>
      <Head>
        <title>Denemeler</title>
        <meta name="quizzes" content="Denemeler" />
        <link rel="icon" href="/ideas.png" />
      </Head>
      <Card className="my-5 w-[70vw]">
        <SelectStudentModal
          visible={selectStudentModalVisible}
          onClose={() => setSelectStudentModalVisible(false)}
          quizId={selectedQuizForStudentModal}
          selecteds={
            quizList?.find((quiz) => quiz?._id === selectedQuizForStudentModal)
              ?.assignedStudents
          }
          refreshAction={{
            type: $.GET_QUIZ_LIST_REQUEST,
            payload: {
              search,
              page,
              limit,
            },
          }}
        />
        <CustomTable
          columns={columns}
          dataSource={quizList}
          totalDocuments={totalQuizzes}
          loading={quizListLoading || quizSavingInProgress}
          baseEndpoint={BASE_ENDPOINT.quiz}
        />
      </Card>
    </div>
  );
}

const Info = ({ children }) => (
  <div className="text-deepDarkGray">{children}</div>
);

export default Quizzes;
