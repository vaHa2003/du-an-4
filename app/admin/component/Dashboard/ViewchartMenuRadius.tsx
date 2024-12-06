"use client";
import React, { useRef, useEffect } from "react";
import {
  Chart,
  CategoryScale,
  Tooltip,
  Legend,
  ArcElement, // Đăng ký ArcElement cho biểu đồ doughnut
} from "chart.js/auto";
import style from "./ViewchartMenuRadius.module.css";

const MychartComponentmenuRadius: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const myChartRef = useRef<Chart<"doughnut", number[], string> | null>(null);

  // Đăng ký các thành phần cần thiết cho biểu đồ doughnut
  Chart.register(CategoryScale, ArcElement, Tooltip, Legend);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      // Hủy biểu đồ cũ nếu có
      if (myChartRef.current) {
        myChartRef.current.destroy();
      }

      if (ctx) {
        myChartRef.current = new Chart<"doughnut", number[], string>(ctx, {
          type: "doughnut",
          data: {
            labels: ["Bỏ học 1 tháng", "Hoàn thành", "Chưa hoàn thành"],
            datasets: [
              {
                label: "My First Dataset",
                data: [15, 50, 35],
                backgroundColor: [
                  "rgb(255, 0, 0)",
                  "rgb(0, 255, 0)",
                  "rgb(255, 255, 0)",
                ],
                hoverOffset: 2,
                borderWidth: 0,
                weight: 0.5,
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                position: "right",
                labels: {
                  usePointStyle: true,
                  pointStyle: "circle",
                },
              },
            },
            cutout: "85%",
            responsive: true,
            maintainAspectRatio: false,
          },
        });
      }
    }

    return () => {
      if (myChartRef.current) {
        myChartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className={style.chartContainer}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default MychartComponentmenuRadius;
