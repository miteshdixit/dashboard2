import React, { useState } from "react";
import { Pie } from "react-chartjs-2";

function PieChart({ data }) {
  const [topic, setTopic] = useState('gas'); // Default topic
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 20;

  // Filter data for the selected topic
  const filteredData = data.filter(item => item.topic === topic);

  // Count the occurrences of each country for the selected topic
  const countryCounts = filteredData.reduce((acc, item) => {
    acc[item.country] = (acc[item.country] || 0) + 1;
    return acc;
  }, {});

  // Get the country names and their counts
  const countries = Object.keys(countryCounts);
  const counts = Object.values(countryCounts);

  counts.pop();
  countries.pop();

  // Paginate the data
  const paginatedCountries = countries.slice(startIndex, startIndex + itemsPerPage);
  const paginatedCounts = counts.slice(startIndex, startIndex + itemsPerPage);

  // Pie chart data
  const pieChartData = {
    labels: paginatedCountries,
    datasets: [
      {
        label: ``,
        data: paginatedCounts,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#C9CBCF',
          '#76D7C4',
          '#F7DC6F',
          '#85C1E9',
          '#F1948A',
          '#BB8FCE',
          '#A569BD',
          '#5D6D7E'
        ],
        borderColor: 'white',
        borderWidth: 1
      }
    ],
  };

  // Handle topic change
  const handleTopic = (e) => {
    setTopic(e.target.value);
    setStartIndex(0); // Reset pagination when topic changes
  };

  return (
    <div className='chart-container mt-3'>
      <div style={{ maxWidth: '450px', color: "white", margin: '0 auto', padding: '20px' , height:"400px" }}>
      <div className='d-flex m-2 justify-content-end'>
  <select
    className='form-select form-select-sm'
    value={topic}
    onChange={handleTopic}
    style={{ maxWidth: '150px' }} // Adjust width as needed
  >
    {Array.from(new Set(data.map(item => item.topic))).map((item, index) => (
      <option key={index} value={item}>{item}</option>
    ))}
  </select>
</div>

        <Pie
          data={pieChartData}
          options={{
            layout: {
              padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10
              }
            },
            plugins: {
              title: {
                display: true,
                text: `Number of countries with : ${topic}`
              }
            }
          }}
          height={100}
        />
      </div>
    </div>
  );
}

export default PieChart;
