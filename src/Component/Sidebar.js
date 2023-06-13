import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { BiLayout, BiBookOpen } from 'react-icons/bi'
import { TbBook2, TbFileAnalytics, TbNetwork, TbSettings } from 'react-icons/tb'
import { TfiWrite } from 'react-icons/tfi'
import { AiOutlineTag } from 'react-icons/ai'
const Sidebar = () => {
  const navigate = useNavigate();
  const { user } = useAuth0()
  const [userQuery, setQuery] = useState([]);
  const [databaseId, setDatabaseId] = useState(null)
  const [email, setEmail] = useState(null)
  const [open, setOpen] = useState(false);
  const [alldata, setAllData] = useState([]);
  const [fetchdata, setFetchData] = useState(null)
  const fetchUser = async () => {
    const response = await axios.get(`https://vercel-notion.vercel.app/fetchuserquery`)
    setQuery(response.data.users.results)
  }
  useEffect(() => {
    if (!email) {
      fetchUser()
    }
    // async function getAll(){
    //   const response=await axios.get(`http://localhost:5000/AdminPages/${databaseId}/${email}`)
    //   console.log("Admin data",response);
    //   setAllData(response.data);
    // }
    // if(databaseId!=null && email!=null){
    //   getAll()
    // }

  }, [databaseId, email])

  const currentUser = user.name;

  useEffect(() => {
    const findUser = userQuery.find(findItem => findItem?.properties?.Email?.email === currentUser)
    console.log(findUser, findUser && findUser?.properties?.Email?.email === currentUser);
    setFetchData(findUser)
    if (findUser) {
      setDatabaseId(findUser?.properties?.ContentPageId?.rich_text[0]?.plain_text)
      setEmail(findUser?.properties.Email.email)
    } else {
      console.log("user not found")
    }
  }, [userQuery])

  const handlecall = (path, fetchdata) => {
    console.log(fetchdata);
    navigate(`${path}`, { state: { myData: fetchdata } })
  }
  // console.log(userQuery);
  return (
    <>
      <div className='min-h-[calc(100vh-65px-100px)] sm:w-[10%] hidden  md:flex '>
        <div class="sidebar  bg-white w-full  text-start">
          {/* <ul class="sidebar-menu  space-y-1">
       
        <li className='p-2 w-full text-gray-500 hover:bg-gray-300 cursor-pointer' onClick={()=>handlecall("/dashboard",fetchdata)}>Dashboard</li>
        <li className='p-2 w-full text-gray-500 hover:bg-gray-300 cursor-pointer' 
          // to={{
          //   pathname: '/content',
          //   state: { myData: fetchdata?.properties?.ContentPageId?.rich_text[0]?.plain_text },
          // }}
         onClick={()=>handlecall("/content",fetchdata?.properties?.ContentPageId?.rich_text[0]?.plain_text)}
         
         >Content</li>
        <li className='p-2 w-full text-gray-500 hover:bg-gray-300 cursor-pointer' onClick={()=>handlecall("/pages",fetchdata?.properties?.PagesPageId?.rich_text[0]?.plain_text)}>Pages</li>
        <li className='p-2 w-full text-gray-500 hover:bg-gray-300 cursor-pointer' onClick={()=>handlecall("/tags",fetchdata?.properties?.TagPageId?.rich_text[0]?.plain_text)}>Tags</li>
        <li className='p-2 w-full text-gray-500 hover:bg-gray-300 cursor-pointer' onClick={()=>handlecall("/authors",fetchdata?.properties?.AuthorPageId?.rich_text[0]?.plain_text)}>Authors</li>
        <li className='p-2 w-full text-gray-500 hover:bg-gray-300 cursor-pointer' onClick={()=>handlecall("/domain",fetchdata?.properties?.Domain?.rich_text[0]?.plain_text)}>Domain</li>
        <li className='p-2 w-full text-gray-500 hover:bg-gray-300 cursor-pointer'> <TbSettings /><Link to="/settings">Settings</Link></li>
      </ul> */}
          <ul class="sidebar-menu  space-y-1 mt-1 ">

            <li className='p-2 w-full flex items-center gap-5 text-gray-500 hover:bg-gray-300 cursor-pointer' onClick={() => handlecall("/dashboard", fetchdata)}>
              <span className='text-2xl'><BiLayout /></span>
              Dashboard
            </li>
            <li className='p-2 w-full flex text-gray-500 gap-5 hover:bg-gray-300 cursor-pointer'
              // to={{
              //   pathname: '/content',
              //   state: { myData: fetchdata?.properties?.ContentPageId?.rich_text[0]?.plain_text },
              // }}
              onClick={() => handlecall("/content", fetchdata?.properties?.ContentPageId?.rich_text[0]?.plain_text)}
            >
              <span className='text-2xl'><BiBookOpen /></span>
              Content</li>
            <li className='p-2 w-full flex text-gray-500 gap-5 hover:bg-gray-300 cursor-pointer' onClick={() => handlecall("/pages", fetchdata?.properties?.PagesPageId?.rich_text[0]?.plain_text)}>
              <span className='text-2xl'><TbBook2 /></span>
              Pages
            </li>
            <li className='p-2 w-full flex text-gray-500 gap-5 hover:bg-gray-300 cursor-pointer' onClick={() => handlecall("/tags", fetchdata?.properties?.TagPageId?.rich_text[0]?.plain_text)}>
              <span className='text-2xl'><AiOutlineTag /></span>
              Tags
            </li>
            <li className='p-2 w-full flex text-gray-500 gap-5 hover:bg-gray-300 cursor-pointer' onClick={() => handlecall("/authors", fetchdata?.properties?.AuthorPageId?.rich_text[0]?.plain_text)}>
              <span className='text-2xl'><TfiWrite /></span>
              Authors
            </li>
            <li className='p-2 w-full flex text-gray-500 gap-5 hover:bg-gray-300 cursor-pointer' onClick={() => handlecall("/analysis", fetchdata?.properties?.Domain?.rich_text[0]?.plain_text)}>

              <span className='text-2xl'><TbFileAnalytics /></span>
              Analytics
            </li>
            <li className='p-2 w-full flex text-gray-500 gap-5 hover:bg-gray-300 cursor-pointer' onClick={() => handlecall("/domain", fetchdata)}>

              <span className='text-2xl'><TbNetwork /></span>
              Domain
            </li>
            <li className='p-2 w-full flex text-gray-500 gap-5 hover:bg-gray-300 cursor-pointer'>

              <span className='text-2xl'>   <TbSettings /></span>
              <Link to="/settings">Settings</Link></li>
          </ul>
        </div>

      </div>
      <div className=' flex md:hidden h-fit flex-col '>
        {open ? (
          <div onClick={() => setOpen(false)}>
            <summary className="inline-flex p-2 no-underline  items-center justify-center text-gray-600 transition-all duration-200 rounded-md border border-gray-200 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2">
              <svg
                className="expanded-icon h-6 w-6"

                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </summary>
          </div>
        ) : (

          <summary onClick={() => setOpen(true)} className="inline-flex  p-2 items-center justify-center text-gray-600 transition-all duration-200 rounded-md border border-gray-200 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2">

            <svg

              className="collapsed-icon h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12H21M3 6H21M3 18H21"
              ></path>
            </svg>
          </summary>
        )}
        {open ?
          <div>
            <div class="sidebar  bg-white w-full  text-start">
              <ul class="sidebar-menu  space-y-1 mt-1 ">

                <li className='p-2 w-full flex items-center gap-5 text-gray-500 hover:bg-gray-300 cursor-pointer' onClick={() => handlecall("/dashboard", fetchdata)}>
                  <span className='text-2xl'><BiLayout /></span>
                  Dashboard
                </li>
                <li className='p-2 w-full flex text-gray-500 gap-5 hover:bg-gray-300 cursor-pointer'
                  // to={{
                  //   pathname: '/content',
                  //   state: { myData: fetchdata?.properties?.ContentPageId?.rich_text[0]?.plain_text },
                  // }}
                  onClick={() => handlecall("/content", fetchdata?.properties?.ContentPageId?.rich_text[0]?.plain_text)}
                >
                  <span className='text-2xl'><BiBookOpen /></span>
                  Content</li>
                <li className='p-2 w-full flex text-gray-500 gap-5 hover:bg-gray-300 cursor-pointer' onClick={() => handlecall("/pages", fetchdata?.properties?.PagesPageId?.rich_text[0]?.plain_text)}>
                  <span className='text-2xl'><TbBook2 /></span>
                  Pages
                </li>
                <li className='p-2 w-full flex text-gray-500 gap-5 hover:bg-gray-300 cursor-pointer' onClick={() => handlecall("/tags", fetchdata?.properties?.TagPageId?.rich_text[0]?.plain_text)}>
                  <span className='text-2xl'><AiOutlineTag /></span>
                  Tags
                </li>
                <li className='p-2 w-full flex text-gray-500 gap-5 hover:bg-gray-300 cursor-pointer' onClick={() => handlecall("/authors", fetchdata?.properties?.AuthorPageId?.rich_text[0]?.plain_text)}>
                  <span className='text-2xl'><TfiWrite /></span>
                  Authors
                </li>
                <li className='p-2 w-full flex text-gray-500 gap-5 hover:bg-gray-300 cursor-pointer' onClick={() => handlecall("/analysis", fetchdata?.properties?.Domain?.rich_text[0]?.plain_text)}>

                  <span className='text-2xl'><TbFileAnalytics /></span>
                  Analytics
                </li>
                <li className='p-2 w-full flex text-gray-500 gap-5 hover:bg-gray-300 cursor-pointer' onClick={() => handlecall("/domain", fetchdata?.properties?.Domain?.rich_text[0]?.plain_text)}>

                  <span className='text-2xl'><TbNetwork /></span>
                  Domain
                </li>
                <li className='p-2 w-full flex text-gray-500 gap-5 hover:bg-gray-300 cursor-pointer'>

                  <span className='text-2xl'>   <TbSettings /></span>
                  <Link to="/settings">Settings</Link></li>
              </ul>
            </div>
          </div>
          :
          <>
            <div className='flex flex-col gap-5 items-center '>
              <div className='p-2 w-full text-gray-500 hover:bg-gray-300 cursor-pointer' onClick={() => handlecall("/dashboard", fetchdata)}><BiLayout /></div>
              <div className='p-2 w-full flex text-gray-500 gap-5 hover:bg-gray-300 cursor-pointer'
                onClick={() => handlecall("/content", fetchdata?.properties?.ContentPageId?.rich_text[0]?.plain_text)}><BiBookOpen /></div>
              <div className='p-2 w-full flex text-gray-500 gap-5 hover:bg-gray-300 cursor-pointer' onClick={() => handlecall("/pages", fetchdata?.properties?.PagesPageId?.rich_text[0]?.plain_text)}><TbBook2 /></div>
              <div className='p-2 w-full flex text-gray-500 gap-5 hover:bg-gray-300 cursor-pointer' onClick={() => handlecall("/tags", fetchdata?.properties?.TagPageId?.rich_text[0]?.plain_text)}><AiOutlineTag /></div>
              <div className='p-2 w-full flex text-gray-500 gap-5 hover:bg-gray-300 cursor-pointer' onClick={() => handlecall("/authors", fetchdata?.properties?.AuthorPageId?.rich_text[0]?.plain_text)}><TfiWrite /></div>
              <div className='p-2 w-full flex text-gray-500 gap-5 hover:bg-gray-300 cursor-pointer' onClick={() => handlecall("/domain", fetchdata?.properties?.Domain?.rich_text[0]?.plain_text)}><TbNetwork /></div>
              <div className='p-2 w-full flex text-gray-500 gap-5 hover:bg-gray-300 cursor-pointer' onClick={() => handlecall("/settings", fetchdata?.properties?.Domain?.rich_text[0]?.plain_text)} ><TbSettings /></div>
            </div>
          </>
        }
      </div>
    </>
  )
}

export default Sidebar;