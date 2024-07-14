import React, { useState, useEffect } from 'react';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineGraph = ({ chartData }) => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 10;
  const [selectedYear, setSelectedYear] = useState('2017');
  const [selectedMonth, setSelectedMonth] = useState('January');
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const sectorCounts = chartData.reduce((acc, item) => {
    acc[item.sector] = (acc[item.sector] || 0) + 1;
    return acc;
  }, {});
  const sectors = Object.keys(sectorCounts).slice(0, 10);

  // Filter data for the selected year and month
  const filteredData = chartData.filter(item => {
    const date = new Date(item.added);
    const itemYear = date.getFullYear().toString();
    const itemMonth = months[date.getMonth()].toString();
    return (
      itemYear === selectedYear &&
      itemMonth === selectedMonth
    )
  });

  // Paginate the filtered data
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Line chart data
  const lineChartData = {
    labels: sectors.map(string => string.split(' ')[0]),
    datasets: [
      {
        label: 'Likelihood',
        data: paginatedData.map(item => item.likelihood),
        borderColor: '#137bc5ae',
        
        borderWidth: 2,
        fill: true, // Enable filling
        lineTension: 0.3,
        pointBackgroundColor: '#168de2', // Color for the points
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#1f6ca3',

      },
      {
        label: "Relevance",
        data: paginatedData.map(item => item.relevance),
        borderColor: "rgba(243, 181, 11, 0.822)",
        backgroundColor: "rgba(247, 171, 8, 0.897)", // Lighter shade for fill
        borderWidth: 2,
        fill: {
          target: 'origin',
          above: 'rgba(236, 196, 17, 0.315)', // Darker shade near the line
        },
        lineTension: 0.3
      }
    ]
  };

  const options = {
    scales: {
      y: {
        title: {
          display: true,
          text: "Likelihood & Relevance",
          font: {
            size: 14,
            weight: 'bold'
          },
          color: '#333'
        },
        ticks: {
          display: true,
          font: {
            size: 12,
            family: 'Arial',
            weight: 'bold'
          },
          color: 'rgba(0, 0, 0, 0.5)',
          padding: 10,
          callback: function(value, index, values) {
            return value.toFixed(1); // Example of callback to format tick labels
          }
        },
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
          borderDash: [5, 5]
        },
        axis: {
          display: true,
          color: '#333',
          width: 2
        },
        suggestedMin: 0,
        suggestedMax: 5
      },
      x: {
        grid: {
          display: false,
          color: 'rgba(0, 0, 0, 0.1)',
          borderDash: [5, 5]
        },
      }
    }
    
    ,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      }
    },
    animation: {
      duration: 1000, // Animation duration in milliseconds
    }
  };

  const handleNext = () => {
    if (startIndex + itemsPerPage < filteredData.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    setStartIndex(0); // Reset pagination when year changes
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    setStartIndex(0); // Reset pagination when month changes
  };

  useEffect(() => {
    // Any side effects on selectedYear or selectedMonth change
  }, [selectedYear, selectedMonth]);

  return (
    <div className='mt-5 mb-5'>
      <div style={{ width: "100%", margin: '0 auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '20px', borderRadius: '10px' }}>
        <div className='d-flex m-2  -select form-select-sm'>
          <select value={selectedYear} onChange={handleYearChange} className="form-select" style={{ maxWidth: '150px' }}>
            <option value="">Select a year</option>
            {Array.from(new Set(chartData.map(item => new Date(item.added).getFullYear()))).map((year, index) => (
              <option key={index} value={year}>{year}</option>
            ))}
          </select>
          <select value={selectedMonth} onChange={handleMonthChange} className="form-select" style={{ maxWidth: '150px' }}>
            <option value="">Select a month</option>
            {months.map((month, index) => (
              <option key={index} value={month}>{month}</option>
            ))}
          </select>
        </div>
        <Line data={lineChartData} options={options} />
        <div className="pagination justify-content-between">
          <button onClick={handlePrev} className='btn btn-primary m-2' style={{backgroundColor:"#6930c3"}} disabled={startIndex === 0}>
            Previous
          </button>
          <button onClick={handleNext} className='btn btn-primary  m-2' disabled={startIndex + itemsPerPage >= filteredData.length} style={{backgroundColor:"#6930c3"}}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default LineGraph;
