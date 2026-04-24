import type { ChartOptions } from "chart.js";
import { Bar } from "react-chartjs-2";

export default function RevenueChart({ data }: { data: { labels: string[]; values: number[] } }) {
  const colors = data.values.map((v) =>
    v > 5000
      ? "rgba(34,197,94,0.8)"
      : v > 2000
        ? "rgba(245,158,11,0.8)"
        : "rgba(239,68,68,0.8)"
  );

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Revenue ($)",
        data: data.values,
        backgroundColor: colors,
        borderRadius: 8,
        borderSkipped: false,
        maxBarThickness: 48,
        hoverBackgroundColor: "rgba(255,255,255,0.95)",
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
          callback: (value) => {
            if (typeof value === "number") {
              return "$" + (value / 1000).toFixed(0) + "k";
            }
            return value;
          },
        },
      },
    },
  };

  return (
    <div className="h-full min-h-[260px] w-full">
      <Bar
        key={data.labels.join("-")}
        data={chartData}
        options={options}
        redraw
      />
    </div>
  );
}
