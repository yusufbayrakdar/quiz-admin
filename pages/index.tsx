import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useRedux from "../hooks/useRedux";

const Home: NextPage = () => {
  const { dispatchAction, $ } = useRedux();
  const router = useRouter();
  const confirmUserId = router.query?.confirm;

  useEffect(() => {
    if (confirmUserId) {
      dispatchAction($.EMAIL_CONFIRM, confirmUserId);
    }
  }, [confirmUserId]);

  return (
    <div>
      <Head>
        <title>Quiz Admin</title>
        <meta name="description" content="Quiz Admin" />
        <link rel="icon" href="/ideas.png" />
      </Head>

      <main></main>
    </div>
  );
};

export default Home;
