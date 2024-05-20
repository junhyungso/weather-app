// components/LineChart.js
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
ChartJS.register(...registerables);

const LineChart = ({ chartData }) => {
  return (
    <div className="chart-container">
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};
export default LineChart;
