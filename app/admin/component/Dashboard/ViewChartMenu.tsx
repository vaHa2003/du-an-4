"use client";
import React, { useRef, useEffect, useState } from "react";
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

interface ApiResponse {
  status: string;
  data: {
    month: number;
    total_price: string;
  }[];
}

Chart.register(
  LineController,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const MyChartComponentMenu = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const myChartRef = useRef<Chart | null>(null);
  const [chartData, setChartData] = useState<number[]>(new Array(12).fill(0));
  const count = 500000000;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/statistical_revenue_mouth", { cache: "no-cache" });
        const result: ApiResponse = await response.json();

        if (result.status === "success") {
          const monthlyData = new Array(12).fill(0);

          result.data.forEach((item) => {
            const monthIndex = item.month - 1;
            monthlyData[monthIndex] = parseFloat(item.total_price.replace(/[^\d]/g, ""));
          });

          setChartData(monthlyData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      if (myChartRef.current) {
        myChartRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (myChartRef.current) {
        myChartRef.current.destroy();
      }

      if (ctx) {
        myChartRef.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: ["T.1", "T.2", "T.3", "T.4", "T.5", "T.6", "T.7", "T.8", "T.9", "T.10", "T.11", "T.12"],
            datasets: [
              {
                label: "Lượt xem (nghìn lượt)",
                data: chartData,
                fill: true,
                backgroundColor: (context) => {
                  const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 300);
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
                position: "right",
                grid: {
                  display: false,
                },
                ticks: {
                  callback: (tickValue) => {
                    if (typeof tickValue === "number" && tickValue % 100000 === 0) {
                      return tickValue / 1000 + "k";
                    }
                    return null;
                  },
                },
                suggestedMin: 0,
                suggestedMax: count,
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
  }, [chartData]);

  return (
    <div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default MyChartComponentMenu;
