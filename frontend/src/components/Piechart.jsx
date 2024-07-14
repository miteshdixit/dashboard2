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
          '#20657a',
          '#ef476f',
                '#ffd166',
                '#06d6a0',
                '#559db4',
          '#7209b7',
          '#b5179e',
          '#f72585',
                '#9b2226',
                '#ca6702',
                '#005f73',
                '#74df94',
                '#e9d8a6'
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
    <div className='container mt-5 mb-5'>
      <div style={{ maxWidth: '450px', color: "white", margin: '0 auto', padding: '20px' , height:"400px" }}>
      <div className='d-flex justify-content-end'>
  <select
    className='form-select form-select-sm'
    value={topic}
    onChange={handleTopic}
    style={{ maxWidth: '120px' }} // Adjust width as needed
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
                top: 0,
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
