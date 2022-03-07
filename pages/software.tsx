import { Button, Card } from "antd";
import Head from "next/head";
import React from "react";
import useRedux from "../hooks/useRedux";

function Software() {
  const { dispatchAction, $ } = useRedux();
  const syncSearches = () => {
    dispatchAction($.SYNC_SEARCHES);
    console.log("🤯 SYNC_SEARCHES");
  };

  return (
    <Card className="m-10 w-full">
      <Head>
        <title>Admin - Software</title>
        <meta name="description" content="Software" />
        <link rel="icon" href="/ideas.png" />
      </Head>
      <Button type="primary" onClick={syncSearches}>
        Sync Searches
      </Button>
    </Card>
  );
}

export default Software;
