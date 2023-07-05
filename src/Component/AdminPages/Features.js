import React, { useState } from 'react'

import HomeTags from '../HomeTags';
import Sidebar from '../Sidebar';

const Features=() =>{
    const [watermarkVisible, setWatermarkVisible] = useState(false);
    const [comments, setComments] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState(false);
    const [showSidebar, setShowSideBar] = useState(false);

    const path = window.location.pathname;
    const pathParts = path.split('/');
    const lastName = pathParts[pathParts.length - 1];

    return (
    <div className='min-h-[calc(100vh-65px-100px)] w-full flex'>
        <Sidebar /> 
        <>
        <div className='sm:p-10 p-2 bg-gray-50  w-full justify-between'>
            <HomeTags name={lastName}/>
            <div className='my-5'>
                <p>Features Flags</p>
                <hr />
            </div>
            <div className='gap-2 my-2'>
                <p className='py-2'>Features</p>
                Choose which features you want to enable on your blog. 
                {/* <form  method='post'  onSubmit={handleSubmit}  > */}
                    <div className='py-5 gap-2 flex flex-col'>
                        <label>Page size <span className='text-red-600'>*</span></label>
                        <input type='number' className=' p-2 w-1/2 focus:outline border rounded-md focus:outline-1' value={6} placeholder="Enter Page Size" />
                    </div>
                    <div className='py-5 gap-2 flex flex-col'>
                        <label>cusdis Comments APP ID <span className='text-red-600'>*</span></label>
                        <input className=' p-2 w-1/2 focus:outline border rounded-md focus:outline-1'  placeholder="Cusdis Comment Id" />
                    </div>
                    <div class="grid grid-cols-1 gap-5 md:grid-cols-2 sm:grid-cols-1/2 lg:grid-cols-2 lg:w-1/2 text-gray-500">
                 
                     <div className='flex justify-between items-center'>
                        <div>
                            <p>Watermark</p>
                            Show Watermark on Your Block
                        </div>
                        <div className='p-0 outline-1 outline rounded h-fit'>
                            <button
                            onClick={() => {
                                setWatermarkVisible(!watermarkVisible);
                            }}
                            className={`p-1 rounded ${watermarkVisible ? 'bg-gray-200' : ''}`}
                            >
                            on
                            </button>
                            <button
                            onClick={() => {
                                setWatermarkVisible(!watermarkVisible);
                            }}
                            className={`p-1 rounded ${watermarkVisible ? '' : 'bg-gray-200'}`}
                            >
                            off
                            </button>
                        </div>
                     </div>
                     <div className='flex justify-between items-center'>
                        <div>
                            <p>Comments</p>
                            Show Comments on Your Block
                        </div>
                        <div className='p-0 outline-1 outline rounded h-fit'>
                            <button
                            onClick={() => {
                                setComments(!comments);
                            }}
                            className={`p-1 rounded ${comments ? 'bg-gray-200' : ''}`}
                            >
                            on
                            </button>
                            <button
                            onClick={() => {
                                setComments(!comments);
                            }}
                            className={`p-1 rounded ${comments ? '' : 'bg-gray-200'}`}
                            >
                            off
                            </button>
                        </div>
                        </div>
                     <div className='flex justify-between items-center'>
                        <div>
                            <p>Category Filters</p>
                            Show Category Filters on your blog
                        </div>
                        <div className='p-0 outline-1 outline rounded h-fit'>
                            <button
                            onClick={() => {
                                setCategoryFilter(!categoryFilter);
                            }}
                            className={`p-1 rounded ${categoryFilter ? 'bg-gray-200' : ''}`}
                            >
                            on
                            </button>
                            <button
                            onClick={() => {
                                setCategoryFilter(!categoryFilter);
                            }}
                            className={`p-1 rounded ${categoryFilter ? '' : 'bg-gray-200'}`}
                            >
                            off
                            </button>
                        </div>
                        </div>
                     <div className='flex justify-between items-center'>
                        <div>
                            <p>
                                Show Sidebar for Posts
                            </p>
                            Show Sidebar for all post
                        </div>
                        <div className='p-0 outline-1 outline rounded h-fit'>
                            <button
                            onClick={() => {
                                setShowSideBar(!showSidebar);
                            }}
                            className={`p-1 rounded ${showSidebar ? 'bg-gray-200' : ''}`}
                            >
                            on
                            </button>
                            <button
                            onClick={() => {
                                setShowSideBar(!showSidebar);
                            }}
                            className={`p-1 rounded ${showSidebar ? '' : 'bg-gray-200'}`}
                            >
                            off
                            </button>
                        </div>
                        </div>
               
                    </div>
                {/* </form> */}
            </div>
        </div>
        </>
    </div>
  )
}

export default Features;