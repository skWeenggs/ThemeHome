import React,{useState} from 'react'
import { useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar'
import {useAuth0} from '@auth0/auth0-react'
import axios from 'axios';
const Domain = () => {
    const [isChecked, setIsChecked] = useState(false);
    // const handleSwitchChange = () => {
    //     setIsChecked(!isChecked);
    //   };
    const {user} =useAuth0()
    const myData = useLocation().state?.myData;
    const [domain,setDomain]=useState(myData?.properties?.Domain?.rich_text[0]?.plain_text);
    console.log(myData);
    const callAPI=async()=>{
      const data={
        domain:domain
      }
    console.log(data);
      await axios.patch(`https://vercel-notion.vercel.app/updatedomain/${myData.id}`,data)
      .then((res)=>{
        alert("Update record successfully")
      })
      .catch((err)=>{
        console.log(err);
      })
    }
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        console.log(e);
        callAPI();
      }
    };
    return (
    <div className='min-h-[calc(100vh-65px-100px)] w-full flex '>
       <Sidebar />
        <>
            <div className='sm:p-10 p-2 bg-gray-50 w-full justify-between'>
                <h1>Domain</h1>
                <hr />
              <div className='bg-gray-300 flex flex-row gap-5 p-2 w-fit rounded-md mt-5'>
                  <button onClick={()=>{setIsChecked(!isChecked)}} className={`p-2 rounded-md ${isChecked ? '':"bg-gray-200"} `}>subDomain</button>
                  <button onClick={()=>{setIsChecked(!isChecked)}} className={`p-2 rounded-md ${isChecked ? 'bg-gray-200':""} `}>customDomain</button>
              </div>
              {!isChecked ?(
                <div className='mt-2'>
                    <p>SubDomain <span className='text-red-700'>*</span></p>
                    <div className='flex justify-between outline outline-1 items-center p-2 mt-5 rounded-lg'>
                    <span className='text-gray-400'>https://
                    </span>
                    <input className='w-full text-gray-500 focus:outline-none p-1' value={domain} onChange={(e)=>{setDomain(e.target.value)}} onKeyPress={handleKeyPress}/>
                    <span className='text-gray-400'>ChatG.blogs</span>
                    </div>
                </div>
              ):(
                ""
              )
              }
            </div>
        </>
    </div>
  )
}

export default Domain;