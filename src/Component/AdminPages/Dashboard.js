import React,{useState,useEffect} from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Link,useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar';

const Dashboard = () => {

  const myData = useLocation().state?.myData;
  console.log(myData);
  const [allData, setAllData] = useState([]);
  const { user } = useAuth0()
  const getAll = async () => {
    const response = await axios.get(`https://vercel-notion.vercel.app/AdminPages/${myData}/${user.name}`)
    console.log("Admin data", response);
    setAllData(response.data.result.results);
  }
  useEffect(() => {
    // getAll()

  }, [])
  return (
    <div className='min-h-[calc(100vh-65px-100px)] w-full flex gap-5'>
     <Sidebar />
    <div className='p-10  bg-gray-50 w-full justify-between'>
        Dashboard
    </div>
    </div>
  )
}

export default Dashboard;