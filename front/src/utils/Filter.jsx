/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

const useFilter = (initialData) => {
  const [filteredData, setFilteredData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [selectedYear, setSelectedYear] = useState('2016');
  const [selectedMonth, setSelectedMonth] = useState('July');
  const itemsPerPage = 10;
  
  const months = ["January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ]; 

  useEffect(() => {
    const filterData = () => {
      const filtered = initialData.filter(item => {
        const date = new Date(item.added);
        const itemYear = date.getFullYear().toString();
        const itemMonthIndex = date.getMonth();
        const itemMonth = months[itemMonthIndex].toString();
        return (
          itemYear === selectedYear &&
          itemMonth === selectedMonth
        );
      });
      setFilteredData(filtered);
      setStartIndex(0); // Reset pagination when filters change
    };

    filterData();
  }, [initialData, selectedYear, selectedMonth]);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };


  const handlePrev = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  const handleNext = () => {
    if (startIndex + itemsPerPage < filteredData.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  return {
    filteredData,
    startIndex,
    selectedYear,
    selectedMonth,
    handleYearChange,
    handleMonthChange,
    handlePrev,
    handleNext,
    itemsPerPage
  };
};

export default useFilter;
