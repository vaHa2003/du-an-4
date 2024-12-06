"use client";
import React, { useRef, useEffect } from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  LineElement,
  LineController,
  PointElement,
} from "chart.js/auto";
import style from "./Chart.module.css";

const LineChart = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const myChartRef = useRef<Chart | null>(null);

  // Đăng ký các thành phần cần thiết cho biểu đồ bar
  Chart.register(
    LineController,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement, // Add this line
    Tooltip,
    Legend
  );

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      // Hủy biểu đồ cũ nếu có
      if (myChartRef.current) {
        myChartRef.current.destroy();
      }

      if (ctx) {
        myChartRef.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: ["2015", "2016", "2017", "2018", "2019"],
            datasets: [
              {
                data: [10, 20, 50, 30, 70],
                fill: true,
                backgroundColor: "rgba(255, 255, 255, 0)",
                borderColor: "rgb(0, 182, 155)",
                tension: 0.3,
                borderWidth: 2,
                pointRadius: 3,
                pointBackgroundColor: "rgb(0, 182, 155)",
                showLine: true,
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: false,
                position: "right",
                align: "center",
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
              },
              y: {
                grid: {
                  display: false,
                },
                ticks: {
                  stepSize: 25, // Đặt khoảng cách giữa các ticks
                  callback: function (value) {
                    return value; // Hiển thị tất cả các giá trị
                  },
                },
                suggestedMin: 0,
                suggestedMax: 100,
              },
            },
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
    <div>
      <canvas height={"266px"} ref={chartRef}></canvas>
    </div>
  );
};

export default LineChart;
