import { Bar, Line } from "react-chartjs-2";

  const LineGraph = ({ statistics, chartColors }) => {
    const chartData = {
      labels: statistics.map((statistic) => statistic.name),
      datasets: [
        {
          label: "Count",
          data: statistics.map((statistic) => statistic.count),
          fill: false,
          borderColor: chartColors[0],
          backgroundColor: chartColors[0],
          pointBorderColor: chartColors[0],
          pointBackgroundColor: chartColors[0],
          pointHoverBackgroundColor: chartColors[0],
          pointHoverBorderColor: chartColors[0],
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
  
    return <Line data={chartData} options={chartOptions} />;
  };
export default LineGraph;