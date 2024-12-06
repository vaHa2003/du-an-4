"use client";
import React, { useRef, useEffect } from "react";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import style from "./Chart.module.css";

const MyChartComponent = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const myChartRef = useRef<Chart | null>(null);

  // Đăng ký các thành phần cần thiết cho biểu đồ bar
  Chart.register(
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
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
          type: "bar",
          data: {
            labels: [
              "Tháng 1",
              "Tháng 2",
              "Tháng 3",
              "Tháng 4",
              "Tháng 5",
              "Tháng 6",
              "Tháng 7",
              "Tháng 8",
              "Tháng 9",
              "Tháng 10",
              "Tháng 11",
              "Tháng 12",
            ],
            datasets: [
              {
                label: "Lượt xem(nghìn lượt)",
                data: [
                  1500, 8000, 2500, 75000, 12000, 3000, 50000, 20000, 70000,
                  5000, 18000, 10000,
                ],
                backgroundColor: "rgba(67, 143, 247, 1.0)",
                borderColor: "rgba(67, 143, 247, 1.0)",
                borderWidth: 1,
                barThickness: 20,
              },
            ],
          },
          options: {
            responsive: true,
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
                  callback: function (value) {
                    if (
                      value === 0 ||
                      value === 10000 ||
                      value === 20000 ||
                      value === 30000 ||
                      value === 40000 ||
                      value === 50000 ||
                      value === 60000 ||
                      value === 70000 ||
                      value === 80000 ||
                      value === 90000
                    ) {
                      return value / 1000;
                    }
                    return null;
                  },
                },
                suggestedMin: 0,
                suggestedMax: 100000,
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
    <div className={style.bg_chart}>
      <h3>Doanh thu khóa học</h3>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default MyChartComponent;
