import { Card } from "antd";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useRedux from "../../hooks/useRedux";
import { RootState } from "../../redux/configureStore";
import CustomTable from "../../components/CustomTable";
import { BASE_ENDPOINT } from "../../utils";

const defaultPageSize = 20;

function InstructorDetail() {
  const router = useRouter();
  const query = router.query;
  const _id = query.id;
  const { dispatchAction, $ } = useRedux();

  const instructor = useSelector(
    (state: RootState) => state.instructor.instructor
  );
  const students = useSelector((state: RootState) => state.student.students);
  const studentsLoading = useSelector(
    (state: RootState) => state.student.studentsLoading
  );
  const totalstudents = useSelector(
    (state: RootState) => state.student.totalStudents
  );

  const search = query["student-search"];
  const page = query["student-page"];
  const limit = query["student-limit"] || defaultPageSize;

  useEffect(() => {
    if (_id) dispatchAction($.GET_INSTRUCTOR_DETAIL, _id);
  }, [dispatchAction, $, _id]);

  useEffect(() => {
    dispatchAction($.GET_STUDENTS, {
      page,
      limit,
      search,
      instructor: _id,
    });
  }, [dispatchAction, $, page, limit, search, _id]);

  const columns = [
    {
      title: "Öğrenci",
      dataIndex: "firstName",
      render: (firstName: string, { lastName }: any) =>
        `${firstName} ${lastName}`,
    },
    {
      title: "Telefon",
      dataIndex: "phone",
      render: (phone: string) =>
        phone && `(${phone.slice(0, 3)}) ${phone.slice(4)}`,
    },
    {
      title: "İlk Şifre",
      dataIndex: "passwordInit",
    },
  ];

  return (
    instructor && (
      <div className="w-10/12">
        <Card>
          <div className="font-bold text-2xl text-gray-500">{`${instructor.firstName} ${instructor.lastName}`}</div>
          <div className="font-semibold text-xl text-gray-500">{`${instructor.phone}`}</div>
        </Card>
        <Card>
          <div className="font-bold text-xl text-gray-500 mb-5">
            Kayıtlı Öğrenciler
          </div>
          <CustomTable
            dataSource={students}
            loading={studentsLoading}
            totalDocuments={totalstudents}
            defaultPageSize={defaultPageSize}
            baseEndpoint={BASE_ENDPOINT.student}
            columns={columns}
            hideOnSinglePage={false}
          />
        </Card>
      </div>
    )
  );
}

export default InstructorDetail;
