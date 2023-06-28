import React, { Fragment } from 'react'
import Sidebar from '../Sidebar';
import {BiCog} from 'react-icons/bi'
import {TbDeviceDesktopAnalytics} from 'react-icons/tb'
import {TbSpeakerphone} from 'react-icons/tb'
import {BsGrid1X2,BsDistributeVertical} from 'react-icons/bs'
import {CiMail,CiPalette} from 'react-icons/ci'
import {RiDeleteBin5Line,RiDatabase2Line} from 'react-icons/ri'
import {HiOutlineViewGrid,HiOutlineCode} from 'react-icons/hi'
import { Link, Navigate, useNavigate } from 'react-router-dom';
const Settings = () => {
    const navigate=useNavigate();
    const handleCall=(path)=>{
        navigate(`${path}`)
    }
  return (
    <div className='min-h-[calc(100vh-65px-100px)] w-full flex ' >
        <Sidebar />
        <>
        <div className=' p-10 bg-gray-50  w-full justify-between'>

        <h1 className='text-xl mt-2'>Settings</h1>
        <p className='my-2 '>webSite</p>
        <hr />
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-3  text-gray-500">
        <div className='flex justify-start items-center gap-4 p-5'>
            <div className='text-3xl bg-gray-200 rounded-full flex  p-2  items-center text-center '>
            <BiCog />
            </div>
            <div>
                <h1>Genral</h1>
                <p>basic blog Details and metadata</p>
            </div>
        </div>
     
        <div className='flex justify-start items-center gap-4 p-5'>
            <div className='text-3xl bg-gray-200 rounded-full flex  p-2  items-center text-center '>
            <CiPalette />
            </div>
            <div>
                <h1 className=''>Design <span className='bg-gray-200 px-3 rounded-md text-sm text-gray-400'>comming soon</span></h1>
                <p>customize your site and manage themes</p>
            </div>
        </div>
       
        <div className='flex justify-start items-center gap-4 p-5  '>
           
            <div className='text-3xl bg-gray-200 hover:bg-gray-400 rounded-full flex  p-2  items-center text-center cursor-pointer' onClick={()=>{handleCall('/settings/features')}}>
            <TbSpeakerphone />
            </div>
            <div className='hover:text-gray-800 cursor-pointer' onClick={()=>{handleCall('/settings/features')}}>
                <h1 className=''>Features </h1>
                <p>enable and disable the features.</p>
            </div>
            
        </div>
        
        <div className='flex justify-start items-center gap-4 p-5'>
            <div className='text-xl bg-gray-200 rounded-full flex  p-3  items-center text-center '>
            <BsGrid1X2 />
            </div>
            <div>
                <h1 className=''>Navigation </h1>
                <p>Set up logo, primary and secqurity and secoundry meanus</p>
            </div>
        </div>

        <div className='flex justify-start items-center gap-4 p-5'>
            <div className='text-3xl bg-gray-200 hover:bg-gray-400  rounded-full flex  p-2  items-center text-center cursor-pointer ' onClick={()=>{handleCall('/settings/footer')}}>
            <BsDistributeVertical />
            </div>
            <div className='hover:text-gray-800 cursor-pointer' onClick={()=>{handleCall('/settings/footer')}}>
                <h1 className=''>Footer </h1>
                <p>Set up newsletter,footer links and copyright</p>
            </div>
        </div>
      
        <div className='flex justify-start items-center gap-4 p-5'>
            <div className='text-3xl bg-gray-200 rounded-full flex  p-2  items-center text-center '>
            <BsDistributeVertical />
            </div>
            <div>
                <h1 className=''>Affiliate watermark <span className='bg-gray-200 px-3 rounded-md text-sm text-gray-400'>New</span> </h1>
                <p>Earn recurring revenue</p>
            </div>
        </div>
    
        </div>
        <div className='py-3'>
        <p>Emails</p>
        <hr />
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-3  text-gray-500">
        <div className='flex justify-start items-center gap-4 p-5'>
            <div className='text-3xl bg-gray-200 rounded-full flex  p-2  items-center text-center '>
            <CiMail />
            </div>
            <div>
                <h1 className=''>Image newsletters <span className='bg-gray-200 px-3 text-sm rounded-md text-gray-400'>BETA</span> </h1>
                <p>Find all the collected emails</p>
            </div>
        </div>
        </div>
      </div>
        <div className='py-3'>
        <p>Advanced</p>
        <hr />
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-3  text-gray-500">
        <div className='flex justify-start items-center gap-4 p-5'>
            <div className='text-3xl bg-gray-200 rounded-full flex  p-2  items-center text-center '>
            <HiOutlineViewGrid />
            </div>
            <div>
                <h1 className=''>Field Mapping </h1>
                <p>Map your Notion fields with chatG</p>
            </div>
        </div>

        <div className='flex justify-start items-center gap-4 p-5'>
            <div className='text-3xl bg-gray-200 rounded-full flex  p-2  items-center text-center '>
            <HiOutlineCode />
            </div>
            <div>
                <h1 className=''>Code Injection</h1>
                <p>Add custom code to your blog</p>
            </div>
        </div>
        
        <div className='flex justify-start items-center gap-4 p-5'>
            <div className='text-3xl bg-gray-200 rounded-full flex  p-2  items-center text-center '>
            <RiDeleteBin5Line />
            </div>
            <div>
                <h1 className=''>Clear Cache</h1>
                <p>Revalidate all your cache</p>
            </div>
        </div>
        
        <div className='flex justify-start items-center gap-4 p-5'>
            <div className='text-3xl bg-gray-200 rounded-full flex  p-2  items-center text-center '>
            <RiDatabase2Line />
            </div>
            <div>
                <h1 className=''>Database Settings <span className='bg-gray-200 px-3 text-sm rounded-md text-gray-400'>New</span></h1>
                <p>Change your database settings</p>
            </div>
        </div>
        </div>
        </div>
        </div>
        </>

    </div>
  )
}

export default Settings;