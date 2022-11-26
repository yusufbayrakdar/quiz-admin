import React from "react";
import styled from "styled-components";
import { Card } from "antd";

import { theme } from "../../tailwind.config";

const colors = theme.extend.colors;

function Info({
  children,
  title,
  titleWidthPercent = 50,
  showMode = false,
  style = {},
}) {
  return (
    <Styled
      showMode={showMode}
      titleWidthPercent={titleWidthPercent}
      colors={colors}
    >
      {showMode ? (
        <div id="info-show-mode" />
      ) : (
        <div id="info-edit-mode" className="gBold">
          {title}
        </div>
      )}
      <Card
        id={showMode ? "" : "edit-mode-children"}
        className="card"
        style={style}
      >
        {children}
      </Card>
    </Styled>
  );
}

const Styled = styled.div`
  position: relative;

  #info-show-mode {
    margin-bottom: 10px;
    margin-right: 10px;
    background-color: ${({ colors }) => colors.darkPrimary};
    position: absolute;
    border-radius: 12px;
    top: 4px;
    left: 4px;
    width: 100%;
    height: 100%;
  }
  #info-edit-mode {
    position: absolute;
    top: -35px;
    left: -16px;
    background-color: ${({ colors }) => colors.darkPrimary};
    width: ${({ titleWidthPercent }) => titleWidthPercent}%;
    color: ${({ colors }) => colors.white};
    padding-left: 20px;
    padding-top: 5px;
    padding-bottom: 5%;
    border-radius: 12px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 10px;
  }
  #edit-mode-children {
    margin-top: 35px;
  }
  .card {
    border-radius: 12px;
  }
`;

export default Info;
