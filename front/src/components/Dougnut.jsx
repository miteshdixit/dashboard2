import { CChart } from "@coreui/react-chartjs";
import React from 'react';

const getStyle = (variable) => getComputedStyle(document.documentElement).getPropertyValue(variable);

function Dougnut({ data, dataSector,label,label2 }) {


  
  return (
    <div className="text-white">
      <CChart
        type="doughnut"
        data={{
          labels: [label, label2],
          datasets: [
            {
              backgroundColor: ['#ff6b35', '#3a6ea5'],
              data: [data, dataSector],
              borderWidth: 1,
              borderColor: '#3130301f',
              hoverBorderWidth: 1,
              hoverBorderColor: '#2e2d2d',
              hoverOffset: 4,
              shadowOffsetX: 10,
              shadowOffsetY: 5,
              shadowBlur: 5,
              shadowColor: 'rgba(0, 0, 0, 0.3)',
            },
          ],
        }}
        options={{
          animation: {
            duration: 2000, // Animation duration in milliseconds
            easing: 'easeInOutBounce', // Animation easing function
          },
          plugins: {
            legend: {
              labels: {
                color: getStyle('--cui-body-color'),
              }
            }
          },
          elements: {
            arc: {
              borderWidth: 2,
              borderColor: '#0261bb',
              hoverBorderColor: '#004f9852',
              shadowOffsetX: 5,
              shadowOffsetY: 5,
              shadowBlur: 15,
              shadowColor: 'rgba(0, 0, 0, 0.3)',
            }
          },
          responsive: true, // Enable responsiveness
        }}
        style={{ height: '150px' }} // Adjust the height here
      />
    </div>
  )
}

export default Dougnut;
