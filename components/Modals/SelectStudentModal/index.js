import React, { useEffect, useState } from "react";
import { Checkbox, Input, Modal, Spin } from "antd";
import { useSelector } from "react-redux";
import styled from "styled-components";

import useRedux from "../../../hooks/useRedux";
import { displayFullName } from "../../../utils";
import { theme } from "../../../tailwind.config";

const colors = theme.extend.colors;

function SelectStudentModal({ visible, onClose, quizId, refreshAction }) {
  const { dispatchAction, $ } = useRedux();

  const activeQuizStudents = useSelector(
    (state) => state.quiz.activeQuizStudents
  );
  const [students, setStudents] = useState(activeQuizStudents);
  const [filteredStudents, setFilteredStudents] = useState(students);
  const studentsLoading = useSelector(
    (state) => state.quiz.activeQuizStudentsInProgress
  );

  useEffect(() => {
    if (quizId) dispatchAction($.GET_STUDENTS_OF_QUIZ_REQUEST, quizId);
  }, [dispatchAction, $, visible, quizId]);

  useEffect(() => {
    if (!studentsLoading) setStudents(activeQuizStudents);
  }, [activeQuizStudents, studentsLoading]);

  const onOk = () => {
    dispatchAction($.ASSIGN_QUIZ_TO_STUDENT_REQUEST, {
      _id: quizId,
      students: students.filter((s) => s.assigned).map((s) => s._id),
      refreshAction,
    });
    onClose?.();
  };

  const onCancel = () => {
    onClose?.();
  };

  return (
    <Modal
      title="Öğrenci Seç"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      okText="Gönder"
      cancelText="İptal"
    >
      <Search
        onChange={(e) => {
          const val = e.target.value.toLowerCase();
          if (val) {
            setFilteredStudents(
              students.filter(
                (s) =>
                  s.firstName?.toLowerCase().includes(val) ||
                  s.lastName?.toLowerCase().includes(val)
              )
            );
          } else setFilteredStudents(students);
        }}
        loading={studentsLoading}
      />
      <StudentList>
        {(filteredStudents || students)?.map((student) => (
          <StudentItem key={student?._id} colors={colors}>
            <Checkbox
              onChange={() => {
                student.assigned = !student.assigned;
                setStudents([...students]);
              }}
              checked={student.assigned}
              style={{ width: "100%" }}
            >
              {displayFullName(student)}
            </Checkbox>
          </StudentItem>
        ))}
        <LoadingLayout loading={studentsLoading} colors={colors}>
          <Spin />
        </LoadingLayout>
      </StudentList>
    </Modal>
  );
}

export const LoadingLayout = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: ${({ loading }) => (loading ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  background-color: ${({ colors }) => colors.transparentGray};
`;

const Search = styled(Input.Search)`
  margin-bottom: 10px;
`;

const StudentList = styled.div`
  max-height: 60vh;
  overflow-y: scroll;
  position: relative;
`;

const StudentItem = styled.div`
  :hover {
    background-color: ${({ colors }) => colors.gray};
  }
`;

export default SelectStudentModal;
