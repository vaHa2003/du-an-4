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

const LineChartView = () => {
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
            labels: [
              "5/2/2024",
              "6/2/2024",
              "7/2/2024",
              "8/2/2024",
              "9/2/2024",
              "10/2/2024",
              "11/2/2024",
              "12/2/2024",
              "13/2/2024",
              "14/2/2024",
              "15/2/2024",
              "16/2/2024",
            ],
            datasets: [
              {
                label: "Lượt xem(nghìn lượt)",
                data: [
                  1500, 3800, 2500, 3750, 1000, 4000, 400, 800, 100, 2000, 4200,
                  500,
                ],
                fill: true,
                backgroundColor: (context) => {
                  const ctx = context.chart.ctx;
                  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                  gradient.addColorStop(0.5, "rgba(67, 121, 238, 0.16)");
                  gradient.addColorStop(1, "rgba(255, 255, 255, 0.176942)");
                  return gradient;
                },
                pointBackgroundColor: "#1E6AD2",
                pointBorderColor: "#1E6AD2",
                borderColor: "#1E6AD2",
                tension: 0,
                borderWidth: 1,
                pointRadius: 3,
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
                grid: {
                  display: false,
                },
                ticks: {
                  callback: function (value) {
                    if (
                      value === 1000 ||
                      value === 2000 ||
                      value === 3000 ||
                      value === 4000 ||
                      value === 5000
                    ) {
                      return value;
                    }
                    return null;
                  },
                },
                suggestedMin: 0,
                suggestedMax: 5000,
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
      <div className={style.chart_title}>
        <h3>Thống kê năm</h3>
        <select>
          <option value={1}>January</option>
          <option value={2}>February</option>
          <option value={3}>Match</option>
          <option value={4}>April</option>
          <option value={5}>May</option>
          <option value={6}>June</option>
          <option value={7}>July</option>
          <option value={8}>August</option>
          <option value={9}>September</option>
          <option value={10}>Octorber</option>
          <option value={11}>November</option>
          <option value={12}>December</option>
        </select>
      </div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default LineChartView;
