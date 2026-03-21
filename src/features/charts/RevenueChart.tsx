import { Bar } from "react-chartjs-2";

export default function RevenueChart({ data }: { data: { labels: string[]; values: number[] } }) {
  const colors = data.values.map((v) =>
    v > 5000
      ? "#22c55e"
      : v > 2000
        ? "#f59e0b"
        : "#ef4444"
  );

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Revenue",
        data: data.values,
        backgroundColor: colors,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  return <div className="h-64">
    <Bar
      key={data.labels.join("-")}
      data={chartData}
      options={options}
      redraw
    />
  </div>;
}
