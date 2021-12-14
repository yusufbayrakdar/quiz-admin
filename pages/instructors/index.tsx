import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

import useRedux from "../../hooks/useRedux";
import { RootState } from "../../redux/configureStore";
import CustomTable from "../../components/CustomTable";
import ConfirmButton from "../../components/ConfirmButton";
import { BASE_ENDPOINT, capitalizeFirstLetter } from "../../utils";

const defaultPageSize = 20;

function instructors() {
  const router = useRouter();
  const query = router.query;
  const { dispatchAction, $ } = useRedux();

  const instructors = useSelector(
    (state: RootState) => state.instructor.instructors
  );
  const instructorsLoading = useSelector(
    (state: RootState) => state.instructor.instructorsLoading
  );
  const totalInstructors = useSelector(
    (state: RootState) => state.instructor.totalInstructors
  );

  const search = query["search"];
  const isActive = query["isActive"];
  const page = query["page"];
  const limit = query["limit"] || defaultPageSize;

  useEffect(() => {
    dispatchAction($.GET_INSTRUCTORS, {
      page,
      limit,
      search,
      isActive,
    });
  }, [dispatchAction, $, page, limit, search, isActive]);

  const columns = [
    {
      title: "Eğitmen",
      dataIndex: "firstName",
      render: (firstName: string, { lastName, _id }: any) => (
        <Link href={`${BASE_ENDPOINT.instructor}/${_id}?page=1`}>
          <a className="text-blue-500 hover:text-blue-700">
            {capitalizeFirstLetter(`${firstName} ${lastName}`)}
          </a>
        </Link>
      ),
    },
    {
      title: "Telefon",
      dataIndex: "phone",
      render: (phone: string) => `(${phone.slice(0, 3)}) ${phone.slice(4)}`,
    },
    {
      title: "Onay Durumu",
      dataIndex: "confirmed",
      render: (confirmed: boolean) => (
        <FontAwesomeIcon
          style={{
            marginLeft: 5,
            color: confirmed ? "#52c41a" : "gray",
          }}
          icon={confirmed ? faCheckCircle : faTimesCircle}
          width={20}
        />
      ),
    },
    {
      title: "",
      dataIndex: "confirmed",
      render: (confirmed: boolean, { _id }: any) => (
        <ConfirmButton
          _id={_id}
          refreshActions={[$.GET_INSTRUCTORS]}
          confirm={confirmed}
        >
          {confirmed ? "Iptal Et" : "Onayla"}
        </ConfirmButton>
      ),
    },
  ];

  return (
    <div className=" w-10/12">
      <Head>
        <title>Admin - Eğitmenler</title>
        <meta name="description" content="Admin - Eğitmenler" />
        <link rel="icon" href="/ideas.png" />
      </Head>
      <CustomTable
        dataSource={instructors}
        loading={instructorsLoading}
        totalDocuments={totalInstructors}
        defaultPageSize={defaultPageSize}
        baseEndpoint={BASE_ENDPOINT.instructor}
        columns={columns}
        hideOnSinglePage={false}
      />
    </div>
  );
}

export default instructors;
