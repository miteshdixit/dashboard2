import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { BarChart } from './components/Bar';
import './App.css';
import LineGraph from './components/LineChart';
import PieChart from './components/Piechart';
import SideBar from './components/SideBar';
import Navbar from './components/Navbar';
import Analytic1 from './components/Analytic1';
import Bubble from './components/Bubble';
import Source from './components/Source';

Chart.register(CategoryScale);

const App = () => {
    const [data, setData] = useState([]);
    const [isSidebarActive, setSidebarActive] = useState(false);

    const toggleSidebar = () => {
        setSidebarActive(!isSidebarActive);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/data/json`);
                setData(response.data.data); 
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); 

    console.log(data)
    return (
        <div className='App'>
            <Navbar />
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                ☰
            </button>
            <div className='d-flex' style={{ marginTop: "4rem" }}>
                <div>
                <SideBar className={isSidebarActive ? 'active ' : ''} />
                </div>
                <div className={`content-container border-start ${isSidebarActive ? 'with-sidebar' : ''}`}>
                    <Analytic1 data={data} />
                    <div className="row">
                        <div className="col-md-6 col-12">
                            <BarChart chartData={data} />
                        </div>
                        <div className="col-md-6 col-12">
                        <PieChart data={data} />
                        </div>
                    </div>
                   
                    <LineGraph chartData={data} />
                    <div className='d-flex justify-content-center'>
  {/* Conditionally render the image based on screen size */}
  <div className='d-none d-md-block'> 
    <img src='/data.png' alt='data' height={400} width={400} />
  </div>
  <Bubble data={data} />
</div>
                    <Source data={data} />
                </div>
            </div>
        </div>
    );
};

export default App;
