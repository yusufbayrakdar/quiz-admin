import Head from "next/head";
import { Card } from "antd";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useRedux from "../../hooks/useRedux";
import { RootState } from "../../redux/configureStore";
import CustomTable from "../../components/CustomTable";
import { BASE_ENDPOINT, capitalizeFirstLetter } from "../../utils";

const defaultPageSize = 10;

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

  const search = query["search"];
  const page = query["page"];
  const limit = query["limit"] || defaultPageSize;

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

  if (!instructor) return null;
  const { firstName, lastName, phone } = instructor;
  const fullName = capitalizeFirstLetter(`${firstName} ${lastName}`);

  return (
    instructor && (
      <div className="w-10/12 mt-10">
        <Head>
          <title>Admin - Eğitmenler - {fullName}</title>
          <meta name="description" content="Admin - Eğitmenler" />
          <link rel="icon" href="/ideas.png" />
        </Head>
        <Card>
          <div className="font-bold text-2xl text-gray-500">{fullName}</div>
          <div className="font-semibold text-xl text-gray-500">{`(${phone?.slice(
            0,
            3
          )}) ${phone?.slice(4)}`}</div>
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
            baseEndpoint={`${BASE_ENDPOINT.instructor}/${_id}`}
            columns={columns}
            hideOnSinglePage={false}
          />
        </Card>
      </div>
    )
  );
}

export default InstructorDetail;
