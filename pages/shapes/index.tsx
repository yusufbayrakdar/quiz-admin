import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";

import { RootState } from "../../redux/configureStore";
import { useSelector } from "react-redux";
import useRedux from "../../hooks/useRedux";
import { BASE_ENDPOINT } from "../../utils";
import BykTableHeaderBar from "../../components/BykTableHeaderBar";
import CustomTable from "../../components/CustomTable";
import { Button } from "antd";

const defaultPageSize = 10;

function shapes() {
  const { dispatchAction, $ } = useRedux();
  const router = useRouter();
  const query = router.query;
  const shapes = useSelector((state: RootState) => state.shape.shapes);
  const totalShapes = useSelector(
    (state: RootState) => state.shape.totalShapes
  );
  const shapesLoading = useSelector(
    (state: RootState) => state.shape.shapesLoading
  );

  const search = query["search"];
  const page = query["page"];
  const limit = query["limit"] || defaultPageSize;

  useEffect(() => {
    dispatchAction($.GET_SHAPES, {
      page,
      limit,
      search,
    });
  }, [$, dispatchAction, page, limit, search]);

  const columns = [
    {
      title: "Şekil",
      dataIndex: "imageUrl",
      render: (url: string) => (
        <Link href={url}>
          <img src={url} width={50} height={50} className="cursor-pointer" />
        </Link>
      ),
    },
    {
      title: "Şekil",
      dataIndex: "imageName",
    },
    {
      title: "Arama Etiketi",
      dataIndex: "searchTag",
    },
    {
      title: "",
      dataIndex: "_id",
      render: (_id: string) => (
        <Button onClick={() => router.push(`${BASE_ENDPOINT.shape}/${_id}`)}>
          Düzenle
        </Button>
      ),
    },
  ];

  return (
    <div className="w-10/12">
      <Head>
        <title>Admin - shapes</title>
        <meta name="description" content="shapes" />
        <link rel="icon" href="/ideas.png" />
      </Head>
      <BykTableHeaderBar
        baseEndpoint={BASE_ENDPOINT.shape}
        hideCreate={false}
      />
      <CustomTable
        dataSource={shapes}
        loading={shapesLoading}
        totalDocuments={totalShapes}
        defaultPageSize={defaultPageSize}
        baseEndpoint={BASE_ENDPOINT.shape}
        columns={columns}
        hideOnSinglePage={false}
      />
    </div>
  );
}

export default shapes;
