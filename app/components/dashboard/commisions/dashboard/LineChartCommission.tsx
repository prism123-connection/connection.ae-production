"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Title,
  Legend,
} from "chart.js";
import { useState } from "react";
import dynamic from "next/dynamic";

// Register required Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Title, Legend);

const LineChartCommission: React.FC = () => {
  const [data] = useState({
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My First dataset",
        data: [30, -50, 80, -40, 100, 70, 20],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        fill: true,
      },
      {
        label: "My Second dataset",
        data: [-10, 60, -30, 90, 40, -70, 50],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        fill: true,
      },
      {
        label: "My Third dataset",
        data: [40, 20, 50, -60, 110, 90, 30],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        fill: true,
      },
      {
        label: "My Fourth dataset",
        data: [-20, 30, -70, 50, -30, 60, -10],
        borderColor: "rgba(255, 206, 86, 1)",
        backgroundColor: "rgba(255, 206, 86, 0.5)",
        fill: true,
      },
    ],
  });

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Stacked Line Chart",
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    interaction: {
      mode: "nearest" as const,
      axis: "x" as const,
      intersect: false,
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "Value",
        },
      },
    },
  };

  const Line = dynamic(() => import("react-chartjs-2").then((mod) => mod.Line), {
    ssr: false, // Ensures it's only loaded on the client
  });

  return(
    <div className="w-full bg-red-500">
        <Line  data={data} options={options} />
    </div>
  )
  
};

export default LineChartCommission;

// export default LineChartCommission