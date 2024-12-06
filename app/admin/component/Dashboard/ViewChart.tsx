import React, { useRef, useEffect, useState } from "react";
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

interface ApiResponse {
  status: string;
  data: {
    month: number;
    total_price: string;
  }[];
}

const MyChartComponent = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const myChartRef = useRef<Chart | null>(null);
  const [chartData, setChartData] = useState<number[]>(new Array(12).fill(0));
  const count = 500000000;

  Chart.register(
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/statistical_revenue_mouth",{cache:'no-cache'});
        const result: ApiResponse = await response.json();

        if (result.status === "success") {
          const monthlyData = new Array(12).fill(0);

          result.data.forEach((item) => {
            const monthIndex = item.month - 1;
            monthlyData[monthIndex] = parseFloat(item.total_price.replace(/[^\d]/g, ""));
            console.log(monthlyData[9]);
            
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
          type: "bar",
          data: {
            labels: [
              "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4",
              "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8",
              "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12",
            ],
            datasets: [
              {
                label: "Doanh thu (VND)",
                data: chartData,
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
                    if (typeof value === "number") {
                      return value === 0 ? "0" : value.toLocaleString("vi-VN");
                    }
                    return value;
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
  }, [chartData]);

  return (
    <div className={style.bg_chart}>
      <h3>Doanh thu khóa học</h3>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default MyChartComponent;
