import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  AreaChart, Area
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A020F0'];

const CookReports = () => {
  const [data, setData] = useState([]);
  const [mealIncome, setMealIncome] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [categoryIncome, setCategoryIncome] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({
    total_meals: 0,
    total_orders: 0,
    total_income: 0,
  });

  useEffect(() => {
    getStats();
    getRatingPie();
    getMealsale();
    getCombinedIncome();
    getCategorysale();

  }, []);

  const getRatingPie = async ()=>{
    axios.get(`http://localhost:8888/letuscook/backend/dashboard/getReportCook.php?action=ratingPie&id=${localStorage.getItem("Authid")}`)
    .then(response => {
      setData(response.data);
    })
    .catch(error => {
      console.error('Error fetching ratings:', error);
    });
  }

  const getMealsale = async () =>{
    axios.get( `http://localhost:8888/letuscook/backend/dashboard/getReportCook.php?action=mealSale&id=${localStorage.getItem('Authid')}`)
    .then(response => {
      setMealIncome(response.data);
    })
    .catch(error => {
      console.error('Error fetching meal income:', error);
    });
  }
  const getCombinedIncome = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8888/letuscook/backend/dashboard/getReportCook.php?action=combinedIncome&id=${localStorage.getItem('Authid')}`
      );

      if (Array.isArray(response.data)) {
        setIncomeData(response.data);
      } else {
        console.error('API response is not an array:', response.data);
        setIncomeData([]);
      }
    } catch (error) {
      console.error('Error fetching combined income:', error);
      setIncomeData([]);
    }
  };
  const getCategorysale = async () =>{
    axios.get(`http://localhost:8888/letuscook/backend/dashboard/getReportCook.php?action=categorySale&id=${localStorage.getItem('Authid')}`)
    .then(response => {
      setCategoryIncome(response.data);
    })
    .catch(error => {
      console.error('Error fetching category income:', error);
    });
  }


  const getStats = async ()=>{

    axios
    .get(`http://localhost:8888/letuscook/backend/dashboard/getReportCook.php?action=stats&id=${localStorage.getItem('Authid')}`)
    .then((res) => {
      setDashboardStats(res.data);
      console.log(res.data);
    })
    .catch((err) => {
      console.error("Error fetching dashboard stats:", err);
    });
  }
  return (
    <div className="p-6">
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-zinc-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Income</h2>
          <p className="text-2xl font-bold">{Number(dashboardStats.total_income).toLocaleString()} MMK</p>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Meals</h2>
          <p className="text-2xl font-bold">{dashboardStats.total_meals}</p>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Orders</h2>
          <p className="text-2xl font-bold">{dashboardStats.total_orders}</p>
        </div>
      </div>


      <h2 className="text-xl font-semibold mb-2">Daily Performance</h2>
{incomeData.length > 0 ? (
  <ResponsiveContainer width="100%" height={300}>
    <AreaChart 
      data={incomeData} 
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      syncId="monthlyPerformance"
    >
      <defs>
        <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="month" />
      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Area 
        yAxisId="left"
        type="monotone" 
        dataKey="monthly_income" 
        stroke="#8884d8" 
        fillOpacity={1} 
        fill="url(#colorIncome)" 
        name="Daily Income (MMK)"
      />
      <Area 
        yAxisId="right"
        type="monotone" 
        dataKey="total_meals_sold" 
        stroke="#82ca9d" 
        fillOpacity={1} 
        fill="url(#colorOrders)" 
        name="Meals Sold"
      />
    </AreaChart>
  </ResponsiveContainer>
) : (
  <p className="text-center py-10">Loading monthly performance data...</p>
)}


      <h2 className="text-xl font-semibold mt-10 mb-2">Income by Category</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={categoryIncome}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis className='text-[14px]' dataKey="category" type="category" />
          <Tooltip />
          <Bar dataKey="income" fill="#FF8042" />
        </BarChart>
      </ResponsiveContainer>


      <h2 className="text-xl font-semibold mt-10 mb-2">Income per Meal</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={mealIncome}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="meal" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="income" fill="#A020F0" />
        </BarChart>
      </ResponsiveContainer>


      {/* Rating Pie Chart */}
      <h2 className="text-xl font-semibold mt-10 mb-2">Ratings Breakdown</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart width={400} height={300}>
          <Pie
            data={data}
            dataKey="count"
            nameKey="rating"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CookReports;
