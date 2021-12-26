import { useRouter } from "next/router";
import React from "react";
import ShapeForm from "../../components/ShapeForm";

function ShapeCreate() {
  const router = useRouter();
  const query = router.query;
  const _id = query.id;
  return <ShapeForm _id={_id} />;
}

export default ShapeCreate;
