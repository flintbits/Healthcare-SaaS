
import type { ChartOptions } from "chart.js";
import { Line } from "react-chartjs-2";

export default function VisitsChart({ data }: { data: { labels: string[]; values: number[] } }) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Monthly Visits",
        data: data.values,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.12)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: "#3b82f6",
        pointBorderColor: "rgba(10,12,18,0.95)",
        pointBorderWidth: 2,
        hoverRadius: 6,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
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
        },
      },
    },
  };

  return (
    <div className="h-full min-h-[260px] w-full">
      <Line
        key={data.labels.join("-")}
        data={chartData}
        options={options}
      />
    </div>
  );
}
