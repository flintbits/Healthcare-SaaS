import { Bar } from "react-chartjs-2";

export default function PatientsChart({ data }: { data: { labels: string[]; values: number[] } }) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Patients",
        data: data.values,
        backgroundColor: "#ec4899",
        borderColor: "#be185d",
        borderWidth: 2,
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
    <Bar data={chartData} options={options} />
  </div>
}
