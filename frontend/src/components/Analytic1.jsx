/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Doughnut from './Dougnut';

function Analytic1({ data }) {

  // Calculate various metrics
  const totalItems = data.length;

  const topicCounts = data.reduce((acc, item) => {
    acc[item.topic] = (acc[item.topic] || 0) + 1;
    return acc;
  }, {});

  const countryCounts = data.reduce((acc, item) => {
    acc[item.country] = (acc[item.country] || 0) + 1;
    return acc;
  }, {});

  const regionCounts = data.reduce((acc, item) => {
    acc[item.region] = (acc[item.region] || 0) + 1;
    return acc;
  }, {});

  const pestleCount = data.reduce((acc, item) => {
    acc[item.pestle] = (acc[item.pestle] || 0) + 1;
    return acc;
  }, {});
  const Totalpestle = Object.keys(pestleCount).length;

  const sectorCounts = data.reduce((acc, item) => {
    acc[item.sector] = (acc[item.sector] || 0) + 1;
    return acc;
  }, {});

  // Calculate percentages
  const topicPercentage = (Object.keys(topicCounts).length / totalItems) * 100;
  const regionPercentage = (Object.keys(regionCounts).length / Object.keys(countryCounts).length) * 100;

  return (
    <div className="">
      <div className="row">
        <div className="col-lg-4 col-md-6 mb-3">
          <div className="card text-white" style={{ backgroundColor: "#6930c3", boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <div className="card-body">
              <h5 className="card-title mb-2" style={{ fontSize: "30px" }}>Total Resources</h5>
              <div className='d-flex justify-content-center align-items-center'>
                <p className="text-white fs-1 m-2">{Object.keys(topicCounts).length} <span className='text-light'>({topicPercentage.toFixed(2)}%)</span></p>
                <div>
                  <img src='./resource.png' alt='resources' style={{ height: "6rem", width: "6rem", margin: "1rem" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 mb-3">
          <div className="card" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <div className="card-body d-flex flex-column align-items-center">
              <h5 className="card-title">Regions</h5>
              <p className="card-text">{Object.keys(regionCounts).length} ({regionPercentage.toFixed(2)}%)</p>
              <div className="w-100">
                <Doughnut data={Object.keys(regionCounts).length} dataSector={Object.keys(countryCounts).length} label={"Region"} label2={"Country"} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 mb-3">
          <div className="card" style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <div className="card-body d-flex flex-column align-items-center">
              <h5 className="card-title m-1">Sectors</h5>
              <p className="card-text ">{Object.keys(sectorCounts).length}</p>
              <div className="w-100">
                <Doughnut data={Totalpestle} dataSector={Object.keys(sectorCounts).length} label={"Pestle"} label2={"Sector"} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Analytic1;
