import { Bar, Line } from "react-chartjs-2";

const BarChart = ({ statistics, chartColors }) => {
    const chartData = {
      labels: statistics.map((statistic) => statistic.name),
      datasets: [
        {
          label: "Count",
          data: statistics.map((statistic) => statistic.count),
          backgroundColor: chartColors,
          hoverBackgroundColor: chartColors,
        },
      ],
    };
  
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };
  
    return <Bar data={chartData} options={chartOptions} />;
  };
  export default BarChart;