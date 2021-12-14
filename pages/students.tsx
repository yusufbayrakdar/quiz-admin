import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Head from "next/head";

import CustomTable from "../components/CustomTable";
import useRedux from "../hooks/useRedux";
import { RootState } from "../redux/configureStore";
import { BASE_ENDPOINT, capitalizeFirstLetter } from "../utils";

const defaultPageSize = 10;

function students() {
  const router = useRouter();
  const query = router.query;
  const { dispatchAction, $ } = useRedux();

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
    dispatchAction($.GET_STUDENTS, {
      page,
      limit,
      search,
    });
  }, [dispatchAction, $, page, limit, search]);

  const columns = [
    {
      title: "Öğrenci",
      dataIndex: "firstName",
      render: (firstName: string, { lastName }: any) =>
        capitalizeFirstLetter(`${firstName} ${lastName}`),
    },
    {
      title: "Telefon",
      dataIndex: "phone",
      render: (phone: string) => `(${phone?.slice(0, 3)}) ${phone?.slice(4)}`,
    },
    {
      title: "İlk Şifre",
      dataIndex: "passwordInit",
    },
  ];

  return (
    <div className=" w-10/12">
      <Head>
        <title>Admin - Öğrenciler</title>
        <meta name="description" content="Öğrenciler" />
        <link rel="icon" href="/ideas.png" />
      </Head>
      <CustomTable
        dataSource={students}
        loading={studentsLoading}
        totalDocuments={totalstudents}
        defaultPageSize={defaultPageSize}
        baseEndpoint={BASE_ENDPOINT.student}
        columns={columns}
        hideOnSinglePage={false}
      />
    </div>
  );
}

export default students;
