import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useRedux from "../hooks/useRedux";
import { RootState } from "../redux/configureStore";
import CustomTable from "../components/CustomTable";
import { BASE_ENDPOINT } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

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
  const pageQuery = query["page"];
  const limitQuery = query["limit"] || defaultPageSize;

  useEffect(() => {
    dispatchAction($.GET_INSTRUCTORS, {
      page: pageQuery,
      limit: limitQuery,
      search,
      isActive,
    });
  }, [dispatchAction, $, pageQuery, limitQuery, search, isActive]);

  const columns = [
    {
      title: "Eğitmen",
      dataIndex: "firstName",
      render: (firstName: string, { lastName }: any) =>
        `${firstName} ${lastName}`,
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
        />
      ),
    },
  ];

  return (
    <div className=" w-10/12">
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
