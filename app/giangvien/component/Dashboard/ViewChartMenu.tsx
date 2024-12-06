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

const MyChartComponentMenu = () => {
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
            labels: ["Tháng 5", "Tháng 4", "Tháng 3", "Tháng 2", "Tháng 1"],
            datasets: [
              {
                label: "Lượt xem(nghìn lượt)",
                data: [15000, 180000, 25000, 375000, 120000],
                fill: true,
                backgroundColor: (context) => {
                  const ctx = context.chart.ctx;
                  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                  gradient.addColorStop(0, "rgba(34,204,238,0.3)");
                  gradient.addColorStop(0.6, "white");
                  return gradient;
                },
                borderColor: "rgb(21,200,224)",

                tension: 0,
                borderWidth: 3,
                pointRadius: 0,
                showLine: true,
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
                position: "right", // Đặt vị trí trục y sang bên phải
                grid: {
                  display: false,
                },
                ticks: {
                  callback: function (value) {
                    if (
                      value === 100000 ||
                      value === 200000 ||
                      value === 300000 ||
                      value === 400000
                    ) {
                      return value / 1000 + "k";
                    }
                    return null;
                  },
                },
                suggestedMin: 0,
                suggestedMax: 400000,
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
    <div >
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default MyChartComponentMenu;
