// components/SpacedDotChart.tsx
import { useEffect, useRef } from "react";
import { Chart, ChartData, ChartConfiguration, ChartOptions } from "chart.js";

interface DoughnutChartProps {
  dataValue: number;     // Giá trị của dữ liệu chính
  totalValue: number;    // Tổng giá trị
  dataColor?: string;    // Màu cho dữ liệu
  emptyColor?: string;   // Màu cho phần còn lại
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({
  dataValue,
  totalValue,
  dataColor = "#237DF7",
  emptyColor = "#D9E6FF",
}) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const myChartRef = useRef<Chart<"doughnut"> | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    if (myChartRef.current) {
      myChartRef.current.destroy();
    }

    // Tính toán tỷ lệ giữa dữ liệu và phần còn lại
    const displayedData = [dataValue, totalValue - dataValue];

    // Chart data
    const data: ChartData<"doughnut"> = {
      datasets: [
        {
          data: displayedData,
          backgroundColor: [dataColor, emptyColor],
          borderWidth: 0,
        },
      ],
    };

    const options: ChartOptions<"doughnut"> = {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
      rotation: -90,
      circumference: 360,
      cutout: "80%",
      animation: false,
    };

    // Creating the chart instance
    const config: ChartConfiguration<"doughnut"> = {
      type: "doughnut",
      data,
      options,
    };

    myChartRef.current = new Chart(ctx, config);

    return () => {
      if (myChartRef.current) {
        myChartRef.current.destroy();
      }
    };
  }, [dataValue, totalValue, dataColor, emptyColor]);

  return <canvas id="spacedDotChart" ref={chartRef} width="150" height="150"></canvas>;
};

export default DoughnutChart;
