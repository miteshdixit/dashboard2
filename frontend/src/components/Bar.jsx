import { Bar } from "react-chartjs-2";
import useFilter from "../utils/Filter";
export const BarChart = ({ chartData }) => {
  const months = ["January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ]; 
    const {
      filteredData,
      startIndex,
      selectedYear,
      selectedMonth,
      handleYearChange,
      handleMonthChange,
      handlePrev,
      handleNext,
      itemsPerPage
    } = useFilter(chartData);
   
    const sectorCounts = chartData.reduce((acc, item) => {
      acc[item.pestle] = (acc[item.pestle] || 0) + 1;
      return acc;
    }, {});
    const sectors = Object.keys(sectorCounts).slice(0, 10);
//   const [startIndex, setStartIndex] = useState(0);
//   const itemsPerPage = 20;

//   // Filter data for the year 2017
//   const filteredData = chartData.filter(item => item.end_year === "2018");

//   // Paginate the filtered data
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const  barData= {
    labels: sectors.map(string => string.split(' ')[0]),
    datasets: [
        {
            label: 'Distribution of pestle',
            data: paginatedData.map(item => item.likelihood),
            backgroundColor: [
                '#ef476f',
                '#ffd166',
                '#06d6a0',
                '#118ab2',
                '#073b4c'
            ],
            borderColor: 'white',
            borderWidth: 1,
            borderRadius: 5, // Make bars curved
        barPercentage: 1,
        categoryPercentage: 0.5,
        }
    ]
};


  return (
    <div className="container mt-5 mb-5">
      <div style={{ margin: '0 auto' , padding: '20px', borderRadius: '10px' , width:"100%" ,  }}>
      <div className='d-flex m-2 mb-4'>
        <select value={selectedYear} onChange={handleYearChange}>
          <option value="">Select a year</option>
          <option value="2016">2016</option>
          <option value="2017">2017</option>
          <option value="2018">2018</option>
          <option value="2019">2019</option>
          <option value="2020">2020</option>
          
        </select>
        <select value={selectedMonth} onChange={handleMonthChange}>
          
          { months.map((item ,index) => {
            return (
            <option value={item} id={index}>{item}</option>)})}
        </select>
        </div>
      <Bar
        data={barData}
        options={{
          layout: {
            // padding: 20,
           
        },
          plugins: {
            title: {
              display: true,
              text: "Growth od pestle "
            },
            legend: {
              display: false
             
            }
          },
          x: {
            grid: {
              display: false, // Hide grid lines
            },
          },
          y: {
            grid: {
              display: false, // Hide grid lines
            },
            ticks: {
              beginAtZero: true,
            },
          },
          animation: {
            duration: 200, // Animation duration in milliseconds
            easing: 'easeInOutBounce', // Animation easing function
          },
          suggestedMin: 0,
        suggestedMax: 5
        
        }}
      />
       <div className="pagination justify-content-between mt-3">
<button onClick={handlePrev} className='' disabled={startIndex === 0}>
Previous
</button>
<button onClick={handleNext} className='' disabled={startIndex + itemsPerPage >= filteredData.length}>
Next
</button>
</div>
      </div>
       
    </div>
  );
};