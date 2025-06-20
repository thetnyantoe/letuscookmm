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

const incomeData = [
  { date: 'Jun 1', income: 120 },
  { date: 'Jun 2', income: 300 },
  { date: 'Jun 3', income: 180 },
  { date: 'Jun 4', income: 400 },
];

const monthlyIncome = [
  { month: 'Jan', income: 1200 },
  { month: 'Feb', income: 1900 },
  { month: 'Mar', income: 1700 },
  { month: 'Apr', income: 2200 },
];

const salesVsOrders = [
  { name: 'Sales', value: 3000 },
  { name: 'Orders', value: 350 },
];

const categoryOrders = [
  { category: 'Biryani', orders: 100 },
  { category: 'Salads', orders: 80 },
  { category: 'Desserts', orders: 120 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A020F0'];

const Reports = () => {
  const [data, setData] = useState([]);
  const [cookSales, setCookSales] = useState([]);
  const [mealIncome, setMealIncome] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [categoryIncome, setCategoryIncome] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({
    total_customers: 0,
    total_cooks: 0,
    total_meals: 0,
    total_orders: 0,
    total_income: 0,
  });

  useEffect(() => {
    getStats();
    getRatingPie();
    getCooksale();
    getMealsale();
    getCombinedIncome();
    getCategorysale();
    getPaymentType();
  }, []);

  const getRatingPie = async ()=>{
    axios.get('http://localhost:8888/letuscook/backend/dashboard/getReportAdmin.php?action=ratingPie')
    .then(response => {
      setData(response.data);
    })
    .catch(error => {
      console.error('Error fetching ratings:', error);
    });
  }
  const getCooksale = async ()=>{
    axios.get('http://localhost:8888/letuscook/backend/dashboard/getReportAdmin.php?action=cookSale')
    .then(response => {
      setCookSales(response.data);
    })
    .catch(error => {
      console.error('Error fetching cook sales:', error);
    });
  }
  const getMealsale = async () =>{
    axios.get('http://localhost:8888/letuscook/backend/dashboard/getReportAdmin.php?action=mealSale')
    .then(response => {
      setMealIncome(response.data);
    })
    .catch(error => {
      console.error('Error fetching meal income:', error);
    });
  }
  const getCombinedIncome = async () => {
    axios.get('http://localhost:8888/letuscook/backend/dashboard/getReportAdmin.php?action=combinedIncome')
      .then(response => {
        setIncomeData(response.data);
      })
      .catch(error => {
        console.error('Error fetching combined income:', error);
      });
  };
  const getCategorysale = async () =>{
    axios.get('http://localhost:8888/letuscook/backend/dashboard/getReportAdmin.php?action=categorySale')
    .then(response => {
      setCategoryIncome(response.data);
    })
    .catch(error => {
      console.error('Error fetching category income:', error);
    });
  }
  const getPaymentType = async() =>{
    axios.get('http://localhost:8888/letuscook/backend/dashboard/getReportAdmin.php?action=paymentGauge')
    .then(response => {
      setPaymentData(response.data);
    })
    .catch(error => {
      console.error('Error fetching payment types:', error);
    });
  }
  const getStats = async ()=>{
    axios
    .get("http://localhost:8888/letuscook/backend/dashboard/getReportAdmin.php?action=stats")
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
          <h2 className="text-lg font-semibold">Total Customers</h2>
          <p className="text-2xl font-bold">{dashboardStats.total_customers}</p>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Cooks</h2>
          <p className="text-2xl font-bold">{dashboardStats.total_cooks}</p>
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


      <h2 className="text-xl font-semibold mb-2">Daily & Monthly Income</h2>
      <h3 className="text-lg font-semibold mb-2">Total Income : {Number(dashboardStats.total_income).toLocaleString()} MMK</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={incomeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorDaily" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorMonthly" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Area 
            type="monotone" 
            dataKey="daily_income" 
            stroke="#8884d8" 
            fillOpacity={1} 
            fill="url(#colorDaily)" 
            name="Daily Income"
          />
          <Area 
            type="monotone" 
            dataKey="monthly_income" 
            stroke="#82ca9d" 
            fillOpacity={1} 
            fill="url(#colorMonthly)" 
            name="Monthly Income"
          />
        </AreaChart>
      </ResponsiveContainer>


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


      {/* Cook Sales Bar Chart */}
      <h2 className="text-xl font-semibold mt-10 mb-2">Sales per Cook</h2>
      <ResponsiveContainer width="100%" height={300}>
      <BarChart data={cookSales}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="cook" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="income" fill="#ffc658" />
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

      <h2 className="text-xl font-semibold mt-10 mb-2">Payment Methods Breakdown</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={paymentData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={50} // This makes it a doughnut
            fill="#82ca9d"
            label
          >
            {paymentData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>


      {/* Sales vs Orders */}
      {/* <h2 className="text-xl font-semibold mt-10 mb-2">Total Sales vs Orders</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={salesVsOrders}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#00C49F" />
        </BarChart>
      </ResponsiveContainer> */}

      {/* Most Ordered Categories */}
      {/* <h2 className="text-xl font-semibold mt-10 mb-2">Most Ordered Categories</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={categoryOrders}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="orders" fill="#0088FE" />
        </BarChart>
      </ResponsiveContainer> */}
    </div>
  );
};

export default Reports;
