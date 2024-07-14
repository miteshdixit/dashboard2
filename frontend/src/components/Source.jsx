import React, { useState } from 'react';

function Source({ data }) {
  const [selectedPestle, setSelectedPestle] = useState('Industries');
  const [selectedTopic, setSelectedTopic] = useState('oil');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const CountryCounts = data.reduce((acc, item) => {
    acc[item.country] = (acc[item.country] || 0) + 1;
    return acc;
  }, {});
  
  const countries = Object.keys(CountryCounts);

  const PestleCounts = data.reduce((acc, item) => {
    acc[item.pestle] = (acc[item.pestle] || 0) + 1;
    return acc;
  }, {});

  const pestles = Object.keys(PestleCounts).filter(pestle => PestleCounts[pestle] !== 0); 
  const topicCounts = data.reduce((acc, item) => {
    acc[item.topic] = (acc[item.topic] || 0) + 1;
    return acc;
  }, {});

  const topics = Object.keys(topicCounts).filter(topic => topicCounts[topic] !== 0); 

  const filteredData = data.filter(item => 
    (selectedPestle ? item.pestle === selectedPestle : true) &&
    (selectedTopic ? item.topic === selectedTopic : true)
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCountries = countries.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(countries.length / itemsPerPage);

  return (
    <div className=" mt-4">
      <div className="mb-3 d-flex">
        <select value={selectedPestle} onChange={(e) => setSelectedPestle(e.target.value)} className="form-select me-2">
          <option value="">All Pestles</option>
          {pestles.map((item, index) => (
            <option value={item} key={index}>{item}</option>
          ))}
        </select>
        <select value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)} className="form-select me-2">
          <option value="">All Topics</option>
          {topics.map((item, index) => (
            <option value={item} key={index}>{item}</option>
          ))}
        </select>
      </div>

      <table className="table table-borderless table-hover rounded container" >
        <thead className="table-primary">
          <tr>
            <th scope="col">Country</th>
            <th scope="col">Total {selectedPestle}</th>
            <th scope="col">Total {selectedTopic}</th>
            <th scope="col">Source</th>
            <th scope="col">End Date</th>
            <th scope="col">Link</th>
          </tr>
        </thead>
        <tbody>
          {currentCountries.map((country, index) => {
            const pestleCounts = filteredData.reduce((acc, item) => {
              if (item.country === country) {
                acc[item.pestle] = (acc[item.pestle] || 0) + 1;
              }
              return acc;
            }, {});

            const topicCounts = filteredData.reduce((acc, item) => {
              if (item.country === country) {
                acc[item.topic] = (acc[item.topic] || 0) + 1;
              }
              return acc;
            }, {});

            const countryData = filteredData.find(item => item.country === country);

            return (
              <React.Fragment key={index}>
                <tr>
                  <td>{country}</td>
                  <td>{pestleCounts[selectedPestle] || 0}</td>
                  <td>{topicCounts[selectedTopic] || 0}</td>
                  <td>{countryData?.source || '-'}</td>
                  <td>{countryData?.end_year || '-'}</td>
                  <td>
                    <a href={countryData?.url} target="_blank" rel="noopener noreferrer">
                    {countryData?.url ? 'source' : '-'}
                    </a>
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>

      <nav className="d-flex justify-content-center">
        <ul className="pagination">
          {[...Array(totalPages).keys()].map(page => (
            <li key={page} className={`page-item ${page + 1 === currentPage ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(page + 1)}>{page + 1}</button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Source;
