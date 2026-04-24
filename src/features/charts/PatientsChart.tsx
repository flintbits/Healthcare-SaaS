import type { ChartOptions } from "chart.js";
import { Bar } from "react-chartjs-2";

export default function PatientsChart({
  data,
}: {
  data: { labels: string[]; values: number[] };
}) {
  const statusColors: Record<string, string> = {
    Active: "rgba(34,197,94,0.8)",
    Inactive: "rgba(107,114,128,0.8)",
    Critical: "rgba(239,68,68,0.8)",
  };

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Patients",
        data: data.values,
        borderRadius: 12,
        borderSkipped: false,
        backgroundColor: data.labels.map(
          (label) => statusColors[label] || "rgba(99,102,241,0.8)"
        ),
        hoverBackgroundColor: "rgba(255,255,255,0.95)",
        maxBarThickness: 42,
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
        bottom: 16,
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
        displayColors: false,
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },

        border: {
          display: false,
        },

        ticks: {
          color: "rgba(255,255,255,0.38)",
          font: {
            size: 11,
            weight: "bold",
          },
        },
      },

      y: {
        beginAtZero: true,

        grid: {
          color: "rgba(255,255,255,0.05)",
        },

        border: {
          display: false,
        },

        ticks: {
          color: "rgba(255,255,255,0.32)",
          font: {
            size: 10,
          },
          padding: 8,
        },
      },
    },
  };

  return (
    <div className="h-full min-h-65 w-full">
      <Bar data={chartData} options={options} />
    </div>
  );
}
