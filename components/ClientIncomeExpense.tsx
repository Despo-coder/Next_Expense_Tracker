'use client';

import { useState, useEffect } from 'react';
import getIncomeExpense from '@/app/actions/getIncomeExpense';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS,ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';



ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
ChartJS.register(ArcElement, Tooltip, Legend);

const ClientIncomeExpense = () => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [categoryData, setCategoryData] = useState({});
  const [showChart, setShowChart] = useState(false);
  const [paymentTypeData, setPaymentTypeData] = useState({});
  const [dailySpendData, setDailySpendData] = useState({});
 

  useEffect(() => {
     const fetchData = async () => {
       const { income, expense, categoryBreakdown = {}, paymentTypeBreakdown = {}, dailySpendBreakdown = {} } = await getIncomeExpense() as {
         income?: number;
         expense?: number;
         categoryBreakdown?: Record<string, number>;
         paymentTypeBreakdown?: Record<string, number>;
         dailySpendBreakdown?: Record<string, number>;
         error?: string;
       };
       setExpense(expense ?? 0);
       setIncome(income ?? 0);
       setCategoryData(categoryBreakdown);
       setPaymentTypeData(paymentTypeBreakdown);
       setDailySpendData(dailySpendBreakdown);
     };    fetchData();
  }, []);
console.log(dailySpendData)
//   const handleTransactions = async () => {
//     const { transactions, error } = await getTransactions();
//     revalidatePath('/');
//     return transactions
//   }
  
  
  const handleChart = async() => {
  
  
    setShowChart(!showChart);
    // handleTransactions()
  };

  ;

  // const donutData = {
  //   labels: Object.keys(categoryData),
  //   datasets: [{
  //     data: Object.values(categoryData),
  //     backgroundColor: [
  //       '#FF6384',
  //       '#36A2EB',
  //       '#FFCE56',
  //       '#4BC0C0',
  //       '#9966FF',
  //       '#FF9F40',
  //       '#FF6384',
  //       '#36A2EB',
  //       '#FFCE56',
  //       '#4BC0C0'
  //     ]
  //   }]
  // };
  

  // const chartData = {
  //   labels: ['Income', 'Expense'],
  //   datasets: [
  //     {
  //       label: 'Amount',
  //       data: [income, expense],
  //       backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
  //     },
  //   ],
  // };

  const donutData = {
    labels: Object.keys(categoryData),
    datasets: [{
      data: Object.values(categoryData),
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
        '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'
      ]
    }]
  };

  const paymentTypeChartData = {
    labels: Object.keys(paymentTypeData),
    datasets: [{
      label: 'Expenses by Payment Type',
      data: Object.values(paymentTypeData),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    }]
  };

  const dailySpendChartData = {
    labels: Object.keys(dailySpendData),
    datasets: [{
      label: 'Daily Expenses',
      data: Object.values(dailySpendData),
      backgroundColor: 'rgba(153, 102, 255, 0.6)',
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };




  return (
    <>
    <div>
        <button onClick={handleChart}>{showChart ? 'Hide Chart' : 'Show Chart'}</button>
    </div>
    <div className='inc-exp-container'>
   
  {/* {showChart && (
    <div className='chart-container'>
      <Doughnut data={donutData} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  )} */}

{showChart && (
        <div className='chart-container'>
          <Doughnut data={donutData} options={chartOptions} />
          <Bar data={paymentTypeChartData} options={chartOptions} />
          <Bar data={dailySpendChartData} options={chartOptions} />
        </div>
      )}


    </div>
    </>
  );
};

export default ClientIncomeExpense;
