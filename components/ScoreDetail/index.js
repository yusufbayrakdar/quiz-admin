import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { Chart, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import styled from "styled-components";
import AnimatedNumber from "react-animated-number";

import { theme } from "../../tailwind.config";
import Animated from "../Animated";

const colors = theme.extend.colors;

Chart.register(ArcElement);

function ScoreDetail() {
  const quizResult = useSelector((state) => state.quiz.quizResult);

  const score = quizResult?.score;
  const fullPoint = quizResult?.totalQuestions;
  let successColor;
  if (score / fullPoint >= 0.7) successColor = colors.doughnutColors.success;
  else if (score / fullPoint >= 0.4)
    successColor = colors.doughnutColors.average;
  else successColor = colors.doughnutColors.fail;

  const chartColors = [successColor, colors.darkGray];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Doughnut Chart",
      },
    },
  };

  const data = {
    labels: ["Doğru", "Yanlış"],
    datasets: [
      {
        data: [score, fullPoint - score],
        backgroundColor: chartColors,
        hoverBackgroundColor: chartColors,
      },
    ],
  };
  if (!quizResult)
    return (
      <Container style={{ margin: 90 }}>
        <Image
          src="/progress.svg"
          width={200}
          height={200}
          alt="quiz-score-calculation-progress"
        />
      </Container>
    );

  return (
    <Container>
      <Doughnut data={data} options={options} />
      <span className="resultInfo gBold">
        <Animated>
          <div>
            <AnimatedNumber
              value={score}
              duration={1000}
              delay={1000}
              formatValue={(n) => n.toFixed(0)}
            />{" "}
            D{" "}
            <AnimatedNumber
              value={fullPoint - score}
              duration={1000}
              delay={1000}
              formatValue={(n) => n.toFixed(0)}
            />{" "}
            Y
          </div>
        </Animated>
        <Animated delay={1}>
          <AnimatedNumber
            value={(score / fullPoint) * 100}
            duration={1000}
            delay={1000}
            formatValue={(n) => n.toFixed(0)}
          />{" "}
          %
        </Animated>
        <Animated delay={2}>
          <AnimatedNumber
            value={quizResult?.finishedAt / 1000}
            duration={1000}
            formatValue={(n) => n.toFixed(2)}
          />{" "}
          sn
        </Animated>
      </span>
    </Container>
  );
}

const Container = styled(Animated)`
  padding: 50px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .resultInfo {
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    font-size: 18px;
    color: ${({ theme }) => colors.charCoal};
    text-align: center;
  }
`;

export default ScoreDetail;
