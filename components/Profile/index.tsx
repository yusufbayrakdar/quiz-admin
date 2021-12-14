import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/configureStore";
import { Button } from "antd";
import useRedux from "../../hooks/useRedux";

function index({ closeDrawer = () => {} }) {
  const { dispatchAction, $ } = useRedux();
  const staff = useSelector((state: RootState) => state.auth.staff);
  if (!staff) return null;

  const { firstName, lastName } = staff;

  const logout = () => {
    dispatchAction($.LOGOUT_REQUEST);
    closeDrawer();
  };

  return (
    <div>
      <Button className="mt-5 w-full" onClick={logout}>
        Çıkış yap
      </Button>
    </div>
  );
}

export default index;
