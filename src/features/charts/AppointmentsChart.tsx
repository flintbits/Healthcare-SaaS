import type { ChartOptions } from "chart.js";
import { Bar } from "react-chartjs-2";

export default function AppointmentsChart({ data }: { data: { labels: string[]; values: number[] } }) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Monthly Appointments",
        data: data.values,
        backgroundColor: "rgba(34,197,94,0.8)",
        borderColor: "#22c55e",
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false,
        hoverBackgroundColor: "rgba(34,197,94,0.9)",
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 900,
      easing: "easeOutQuart",
    },
    layout: {
      padding: {
        top: 8,
        bottom: 0,
        left: 0,
        right: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(10,12,18,0.95)",
        titleColor: "#ffffff",
        bodyColor: "rgba(255,255,255,0.75)",
        borderColor: "rgba(255,255,255,0.08)",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "rgba(255,255,255,0.6)",
          font: {
            size: 12,
          },
        },
        border: {
          color: "rgba(255,255,255,0.08)",
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(255,255,255,0.04)",
        },
        ticks: {
          color: "rgba(255,255,255,0.6)",
          font: {
            size: 12,
          },
          callback: function (value) {
            return value as number;
          },
        },
        border: {
          color: "rgba(255,255,255,0.08)",
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 4,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}
