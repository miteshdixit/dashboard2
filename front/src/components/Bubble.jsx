import React from 'react';
import { CChart } from "@coreui/react-chartjs";

const getStyle = (variable) => getComputedStyle(document.documentElement).getPropertyValue(variable);

const Bubble = ({ data }) => {
  // Calculate pestle counts
  const pestleCount = data.reduce((acc, item) => {
    acc[item.pestle] = (acc[item.pestle] || 0) + 1;
    return acc;
  }, {});

  // Extracting pestle names and counts from pestleCount object
  const pestles = Object.keys(pestleCount);
  const counts = Object.values(pestleCount);

  // Creating the dataset for the Polar Area chart
  const chartData = {
    labels: pestles,
    datasets: [
      {
        data: counts,
        backgroundColor: [
          '#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED', '#36A2EB', // Adjust colors as needed
        ],
      },
    ],
  };

  // Analytics
  const totalPestles = pestles.length;

  return (
    <div className="chart-container ">
      <div className=""  style={{ maxWidth: '600px', margin: '0 auto' }}>
        <CChart
          type="polarArea"
          data={chartData}
          options={{
            plugins: {
              legend: {
                labels: {
                  color: getStyle('--cui-body-color'),
                },
              },
            },
            scales: {
              r: {
                grid: {
                  color: getStyle('--cui-border-color'),
                },
              },
            },
          }}
          style={{ minHeight: '300px', maxHeight: '400px' }} // Adjust height as needed
        />
      </div>
      <p className="text-center mt-3">Total number of pestles: {totalPestles}</p>
    </div>
  );
}

export default Bubble;
