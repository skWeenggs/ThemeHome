import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import HomeTags from '../HomeTags'
import { BsPlus } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import {useNavigate} from 'react-router-dom'
import Loading from '../Loading'
import axios from 'axios';
import { ThemeContext } from '../Context/ThemeContext';
import { AiFillCloseCircle } from 'react-icons/ai';
const Navigation = () => {

    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);

    const [navbar, setNavBar] = useState(null);

    const [mode, setMode] = useState(true)
    const path = window.location.pathname;
    const pathParts = path.split('/');
    const lastName = pathParts[pathParts.length - 1];
    const [loading, setLoading] = useState(true);
    // const [image, setImage] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const { register, handleSubmit,  reset, watch, formState: { errors } } = useForm();
   
   
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onload = (event) => {
//       setImage(event.target.result);
//     };

//     reader.readAsDataURL(file);
//   };

    const onSubmit=async(data)=>{
        
        // console.log(data);
    
        // const body={
            
        //     logoname:data.logoname,
        //     navlink:data.navlink
        // }
        const fd = new FormData();
        fd.append('image', data.image);
        fd.append('name', data.logoname);
        fd.append('link',data.navlink);
       
        try{
            const response = await axios.post(`http://localhost:5000/navPageLink/${navbar && navbar[0]?.parent?.database_id}`,/* {image: image.split(',')[1],} */ fd);
            alert(response.data.massage);
            console.log(response);
        }catch(e){
            console.log(e);
        }


    }

    const getFooter = async () => {
        const res = await axios.get(`http://localhost:5000/usersdata/${window.location.hostname}`)
        console.log("fd", res.data);
        setNavBar(res.data.navigationDataResponse);
       
        setLoading(false);
    }
    useEffect(()=>{
        getFooter()
    },[])

    const defaultValue = navbar?.map((item)=> item?.properties?.Logo?.files[0]?.external?.url)
    let selectedFileName = defaultValue;

    const handleFileChange = (event) => {
        console.log(event.target.files[0]);
       const file = event.target.files[0];
       if (file) {
         selectedFileName = file.name;
         // You can perform additional actions with the selected file here
       } else {
         selectedFileName = defaultValue;
       }
       // Force re-render to update the text input field
       // You may need to use a state management solution for better reactivity
      
     };

     const handleCancel = () => {
        setShowModal(false)
        // closeModal()
        reset();

    }
    return (
        <div className='min-h-[calc(100vh-65px-100px)] w-full flex'>
            <Sidebar />
            <>
            {loading ? <Loading /> :
                <div className='sm:p-10 p-2 bg-gray-50  w-full justify-between'>
                   <form method='post' onSubmit={handleSubmit(onSubmit)} > 
                    <HomeTags name={lastName} />
                    <div className='my-5 text-2xl bold'>
                        <p>{lastName} settings</p>
                        <hr />
                    </div>
                    <div>
                        <p className='text-2xl bold'>Logo</p>
                        <p>set a title or upload Image</p>
                    </div>

                    <div>

                        <div className=' outline-1 outline rounded h-fit w-fit my-5 bg-gray-200 p-2'>
                            <span
                                onClick={() => {
                                    setMode(!mode);
                                }}
                                className={`p-2 tracking-wide rounded ${mode ? 'bg-gray-50' : ''}`}
                            >
                                text
                            </span>
                            <span
                                onClick={() => {
                                    setMode(!mode);
                                }}
                                className={`p-2 tracking-wide rounded ${mode ? '' : 'bg-gray-50'}`}
                            >
                                image
                            </span>
                        </div>
                    
                    {mode &&  mode?
                         <>
                             {navbar?.map((navitem)=>{
                                //  console.log(navitem?.properties?.Logo?.files[0].external.url);
                                 return(
                            <>
                            <div className='mt-2 gap-2 flex flex-col'>
                                <label>Logo Text</label>
                                <input className=' p-2 lg:w-1/2 focus:outline border rounded-md focus:outline-1'
                                   
                                    {...register('logoname', { required: true })}
                                defaultValue={navitem?.properties?.LogoName?.title[0]?.plain_text}
                                  placeholder="Enter News Letter-Name" />
                                {errors.logoname && (
                                                    <p className='text-red-500'>Logo Name Is Required</p>
                                                )}
                            </div>
                            <div className='gap-2 my-3 flex flex-col'>
                            <div className='flex justify-between w-1/2'>
                                <label>Logo Link</label>
                                <label>where to go to when click on link</label>
                            </div>
                            <input className=' p-2 lg:w-1/2 focus:outline border rounded-md focus:outline-1'
                                    defaultValue={navitem?.properties?.NavLink?.url} placeholder=""
                                   
                                {...register('navlink', { required: true })}
                                />
                                {errors.navlink && (
                                                    <p className='text-red-500'>NavLink is required</p>
                                                )}
                            </div>
                            </>
                                 )
                             })}
                        </>
                        :<>
                        <div className='flex flex-col'>
                        {navbar?.map((navitem)=>{ 

                            // console.log(navitem?.properties?.Logo?.files[0]?.external?.url);
                         return(
                         <>
                         <label>upload Image</label>
                         <input
                            type="text"
                            className='p-2 lg:w-1/2 focus:outline border rounded-md focus:outline-1'
                           defaultValue={navitem?.properties?.Logo?.files[0]?.external?.url}
                           {...register('image',{required:true})}
                            
                        />
                        <p>Enter Image Url if want to change image</p>
                        {/* <input
                          type="file"
                            className='p-2 lg:w-1/2 focus:outline border rounded-md focus:outline-1'
                            id="NewsLetterText"
                            onChange={handleImageChange}
                            // {...register('logo',{required:true})}
                        />  */}

                            {/* <input className=' p-2 lg:w-1/2 focus:outline border rounded-md focus:outline-1'
                              type="file"
                              accept="images/*"
                            //   defaultValue={navitem?.properties?.Logo?.files[0]?.external?.url}
                              id="NewsLetterText"
                              readOnly
                              // {...register1('NewsLetterText', { required: true })}
                              /> */}
                            
                              
                         </>
                                    )
                        })}
                        </div>
                        </>}
                    </div>
                    <div className='my-5'>
                    <div>
                        <p className='text-2xl bold'>Links</p>
                        <p>set a title or upload Image</p>
                    </div>
                    <hr className='lg:w-1/2  border-2 mt-2' />
                                {navbar && navbar?.map((item, i) => {
                                    return (
                                        <>
                                            {item?.properties?.FooterName ? (<>
                                                <div className='flex  justify-between lg:w-1/2 p-5 outline outline-1 my-5 rounded items-center' >
                                                    <div>

                                                        <label>{item?.properties.FooterName.title[0].plain_text}</label>
                                                    </div>
                                                    <div className='flex justify-around gap-5 items-center'>
                                                        <p className='bg-gray-400 rounded p-1'>{item?.properties.FooterLinkType.select.name}</p>

                                                        <div

                                                            // onClick={() => {
                                                            //     handleClickOpen(item)
                                                            // }}
                                                        >
                                                            <FiEdit className="text-green-600 w-4 h-4" />
                                                        </div>

                                                        <div

                                                            // onClick={() => {

                                                            //     handleDelete(item.id);

                                                            // }}
                                                        >
                                                            <FiTrash2 className="text-red-600 w-4 h-4" />
                                                        </div>

                                                    </div>

                                                </div>
                                                {/* <div className='flex mt-5 bg-gray-200 hover:bg-gray-300 items-center gap-3  outline outline-1 active:outline-0  w-fit p-2 rounded-md cursor-pointer text-gray-400 hover:text-gray-700'
                                                    onClick={() => { setShowModal(!showModal) }}
                                                >
                                                    <BsPlus className='text-2xl ' />
                                                    <span className=''> Add new Link</span>
                                                </div> */}
                                            </>)
                                                : (
                                                    <>
                                                        {/* <div className='flex mt-5 bg-gray-200 hover:bg-gray-300 items-center gap-3  outline outline-1 active:outline-0  w-fit p-2 rounded-md cursor-pointer text-gray-400 hover:text-gray-700'
                                                            onClick={() => { setShowModal(!showModal) }}
                                                        >
                                                            <BsPlus className='text-2xl ' />
                                                            <span className=''> Add new Link</span>
                                                        </div> */}
                                                    </>
                                                )}
                                        </>
                                    )
                                })}
                                <div className='flex mt-5 bg-gray-200 hover:bg-gray-300 items-center gap-3  outline outline-1 active:outline-0  w-fit p-2 rounded-md cursor-pointer text-gray-400 hover:text-gray-700'
                                    // onClick={handleModelInsert}
                                >
                                    <BsPlus className='text-2xl ' />
                                    <span className=''> Add new Link</span>
                                </div>  
                                </div>

                                <hr />
                            <div className='gap-5 w-full justify-end items-end mt-5 flex px-5'>
                                <button className='p-2 rounded bg-gray-400 outline outline-2 active:outline-1 px-5' type="submit">save</button>
                                <button className='p-2 rounded bg-gray-400 outline outline-2 active:outline-1 px-5' onClick={() => navigate('/settings')}>cancel</button>
                            </div>
                        </form>
                </div>
            }
            {showModal ? (
                    <div className='z-10 absolute justify-center items-center flex w-full min-h-[calc(100vh-65px)]  backdrop-brightness-50'>
                        <div onClose={() => setShowModal(false)} className={`lg:w-[50%] p-5 rounded-md ${theme === 'dark' ? ' bg-gray-600' : 'bg-gray-200'}`}  >
                            <div className='flex md:p-4 w-full justify-between items-center'>
                                <p className='text-2xl  rounded-full hover:border-gray-800  cursor-pointer w-fit' onClick={handleCancel}> <AiFillCloseCircle />
                                </p>
                                <h3 className="sm:text-3xl font-semibold">Add New Link</h3>
                            </div>

                            <div className='flex flex-col gap-2'>

                                <p>Footer Link details</p>
                                <p>add a link for easy navigation.</p>
                                <form onSubmit={handleSubmit(onSubmit)} className=''>
                                    <div className=' flex flex-col gap-2 mt-2'>
                                        <label>Name <span className='text-red-500'>*</span></label>
                                        <input {...register('title', { required: true })}
                                            className={` p-2 lg:w-1/2 focus:outline border rounded-md focus:outline-1 focus:outline-gray-500 
                    ${theme === 'dark' ? 'text-white bg-gray-500' : 'text-gray-900 bg-gray-100'}`} placeholder="" />
                                    </div>
                                    <div className='flex flex-col gap-2 mt-2'>
                                        <label>Sort Description</label>
                                        <input {...register('description', { required: true })}
                                            className={`p-2 lg:w-1/2 focus:outline border rounded-md focus:outline-1 focus:outline-gray-500 
                    ${theme === 'dark' ? 'text-white bg-gray-500' : 'text-gray-900 bg-gray-100'}
                    `} placeholder="" />
                                    </div>
                                    <div className="my-3 sm:my-0 w-full lg:w-1/2 ">
                                        <label
                                            className={`${theme === 'dark' ? 'text-white' : 'text-black'} flex text-start text-sm md:text-right mb-0 md:mb-0 pr-4 2xl:text-lg mt-2`}
                                        >
                                            Link Type <span className='text-red-500'>*</span>
                                        </label>
                                        <select
                                            className={`appearance-none border border-gray-200 rounded w-full sm:text-md text-sm p-1.5 leading-8 focus:outline-1px focus:outline-gray-500 
                          ${theme === 'dark' ? 'text-white bg-gray-500' : 'text-gray-900 bg-gray-100'}`}
                                            id="ready"
                                            {...register('linkType', { required: true })}
                                        //   {...register('ready', { required: true })}
                                        >
                                            <option value="">Select Type</option>
                                            <option value="External_link">External_Link</option>
                                            <option value="Notion_Page">Notion_Page</option>
                                        </select>
                                        {errors.linkType && <span className='text-red-500'>This field is required</span>}
                                        {/* {errors.ready && (
                          <p className="text-red-500">Notion contents ready to publish required.</p>
                        )} */}
                                    </div>
                                    {/* {selectedOption ? (
                                        <>
                                            <div className='flex flex-col gap-2 mt-2'>
                                                <label>{selectedOption}</label>
                                                <input className={`p-2 lg:w-1/2 focus:outline border rounded-md focus:outline-1 focus:outline-gray-500 
                        ${theme === 'dark' ? 'text-white bg-gray-500' : 'text-gray-900 bg-gray-100'}
                        `} placeholder=""
                                                    {...register(`selectedOption`, { required: true })}
                                                />
                                                {errors.selectedOption && <span>This field is required</span>}
                                            </div>
                                        </>) : ''} */}
                                    <hr />
                                    <div className='gap-5 w-full justify-end items-end mt-5 flex px-5'>
                                        <button className='p-2 rounded bg-gray-400 outline outline-2 active:outline-1 px-5' type='submit'>save</button>
                                        <button className='p-2 rounded bg-gray-400 outline outline-2 active:outline-1 px-5' onClick={handleCancel}>cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                ) : (<></>)}
            
        </>
        </div>
    )
}

export default Navigation;