import React, { useContext, useEffect, useMemo, useState } from 'react'
import Sidebar from '../Sidebar'

import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useLocation } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import moment from 'moment';
import { AiFillCloseCircle } from 'react-icons/ai'
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ThemeContext } from '../Context/ThemeContext';
import { toast } from 'react-toastify';
const Authors = () => {
  const { user } = useAuth0()
  const [allData, setAllData] = useState([]);
  const myData = useLocation().state?.myData;

  const [showModal, setShowModal] = useState(false);
  const [update, setUpdate] = useState();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [status, setStatus] = useState('');
  const [date, setDate] = useState('');
  
  const getAll=async()=> {
    const response = await axios.get(`http://vercel-notion.vercel.app/AdminPages/${myData}/${user.name}`)
    console.log("Admin data", response);
    setAllData(response.data.result.results);
  }

  useEffect(() => {
    getAll()

  }, [myData])

  const handleCancelClose = () => {
    setShowModal(false)
  }
  const handleClickOpen=(list)=>{
    console.log(list);
      setUpdate(list)
      setShowModal(true)
    
    }
    const form1 = useForm();
    const {
      register: register1,
      handleSubmit: handleSubmit1,
      formState: { error } } = form1;
  const handleDelete = async (id) => {
    console.log(id);
    const confirm = window.confirm(
      `Are you sure you want to delete User "${id}"?`
    );
    if (confirm && id) {
      await axios.delete(`http://vercel-notion.vercel.app/deleteUserRecord/${id}/${user.name}`,
        {
          headers: {
            authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
          }
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            getAll()
            alert("record deleted success")

          }
        })
        .catch((err) => {
          alert(err)
        })
    }
  }

  const rowData = allData && allData.map((list, idx) => ({
    id: list.id,
    title: list?.properties?.Name?.title[0]?.plain_text,
    slug: list?.properties?.Slug?.rich_text[0]?.plain_text,
    publishDate: list.properties['PublishDate'].date.start,
    status: list.properties['ReadyToPublish'].status.name
  }))


  const columnDefs = [
    {
      headerName: "Author NAME", field: "slug", cellRenderer: (params) => {
        const firstLetter = params.value?.charAt(0).toUpperCase();
        const remainingLetters = params.value?.slice(1).toLowerCase();
        return params.value ? (
          <div className='space-y-2'>
            {/* <p>{params.value}</p> */}
            <p>{firstLetter + remainingLetters} <br /> {` / ${params.value}`}</p>
          </div>
        ) : ''
      }
    },
    {
      headerName: "STATUS", field: "status", cellRenderer: (params) => {
     
        return params.value === 'Done' ? (<span className='bg-green-300 text-gray-400 rounded-full  px-1 '>Published</span>) : (<span className='text-gray-600  rounded-full  px-5  bg-gray-300'>Draft</span>)
      }
    },
    {
      headerName: "PUBLISH DATE", field: "publishDate", cellRenderer: (params) => {
        return moment(params.value).format('DD MMM YYYY')
      }
    },
    // { headerName: 'Email', field: 'email',filter:true, sortable:true ,minWidth:200, enableRowGroup: true },
    // { headerName: 'Domain Name', field: 'domainName',sortable:true },
    // { headerName: 'Template Name', field: 'templateName'},
    // { headerName: 'Content Page Id', field: 'contentPageId',filter:true },
    // { headerName: 'Pages Page Id', field: 'pagesPageId',filter:true },
    // { headerName: 'Author Page Id', field: 'authorPageId',filter:true },
    // { headerName: 'Notion Token', field: 'notionToken' ,filter:true},
    {
      headerName: 'ACTION', field: '', headerClass: 'center-header',maxWidth:140,
      cellRendererFramework: (params) => (
        <div className='flex justify-around h-full gap-2 items-center'>
          <button

            onClick={() => {
              handleClickOpen(params.data)
            }}
          >
            <FiEdit className="text-green-600 w-4 h-4" />
          </button>

          <button

            onClick={() => {

              handleDelete(params.data.id);

            }}
          >
            <FiTrash2 className="text-red-600 w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const gridOptions = {
    getRowHeight: () => 80,
    // pagination: true,
    // paginationPageSize: 5,
    // defaultColDef: {
    //   sortable: true,
    //   filter: true,
    // },
  };

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      sortable: true,
      resizable: true,
      // minWidth: 100,

      //   enableRowGroup: true,
      //   enablePivot: true,
      //   enableValue: true,
    };
  }, []);

  const [isopen, setIsOpen] = useState(false);
  const validationSchema = Yup.object().shape({
    pagename: Yup.string().required(),
    slug: Yup.string().required(),
    date: Yup.string().required(),

  });
  const { theme } = useContext(ThemeContext);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: yupResolver(validationSchema) });
  const onSubmit = async (data) => {

    const Items = {
      pagename: data.pagename,
      slug: data.slug,
      date: data.date,

    }
    await axios.post(`https://vercel-notion.vercel.app/Insert/${myData}/${user.name}`, Items)
      .then((res) => {
        toast("register user successfully")
        setIsOpen(false)
        getAll()
      }).catch((err) => {
        console.log(err);
      })
  }
  const handleCancel = () => {
    reset();
  }
  const handleUpdateSubmit = async () => {

    console.log("dsd");

    const data = {
      pagename: title ? title : update.title,
      slug: slug ? slug : update.slug,
      publishDate: date ? date : update.PublishDate,

    }

    console.log(update.id);
    await axios.patch(`https://vercel-notion.vercel.app/Update/${update.id}/${user.name}`, data)
      .then((response) => {
        alert("Update record successfully")
        setShowModal(false)
        getAll()
      })
      .catch((err) => {
        console.log(err);
      })
  }
  return (
    <div className='min-h-[calc(100vh-65px-100px)] w-full flex '>
      <Sidebar />
      <>
        <div className=' sm:p-10 p-2 bg-gray-50 w-full justify-between'>
          <div className='flex justify-between pb-2'>
            <div className='text-gray-800 font-bold text-lg'> Authors</div>
            <div><button className='bg-black text-white outline-1 p-2 text-md rounded-md'  onClick={() => setIsOpen(!isopen)} >Create New Authors</button></div>
          </div>

          {/* {isopen ? (
            <dialog open={isopen} onClose={() => setIsOpen(false)} className={`lg:w-[60%] rounded-md ${theme === 'dark' ? ' bg-gray-600' : 'bg-gray-200'}`}  >
              <p className='text-2xl border-2 rounded-full hover:border-gray-800  cursor-pointer w-fit' onClick={() => setIsOpen(!isopen)}> <AiFillCloseCircle />
              </p>
              <form method='post' onSubmit={handleSubmit(onSubmit)}>
                <div class="py-4 px-0 ">
                  <div class="flex p-0 sm:p-2 flex-wrap justify-center space-y-0 ">
                    <div class="my-3 sm:my-0  w-full lg:w-1/2 px-2 ">
                      <label class={`${theme === 'dark' ? 'text-white' : 'text-black'} flex text-start text-sm   md:text-right mb-0 md:mb-0 pr-4  2xl:text-lg`} >
                        Authors Page Name
                      </label>
                      <input class={` appearance-none border border-gray-200 rounded w-full sm:text-md  text-sm p-1.5 leading-8 focus:outline-1px focus:outline-gray-200  ${theme === 'dark' ? 'text-white bg-gray-500 ' : 'text-gray-900 bg-gray-100'}`} id="pagename" placeholder="Page Name" type="text" {...register('pagename', { required: true })} />
                      {errors.pagename && <p className='text-red-500 '>Notion contents fill the tags name</p>}
                    </div>

                    <div class="my-3 sm:my-0  w-full lg:w-1/2  px-2 ">
                      <label class={`${theme === 'dark' ? 'text-white' : 'text-black'} flex text-start text-sm   md:text-right mb-0 md:mb-0 pr-4  2xl:text-lg`} >
                        Slug Url
                      </label>
                      <input class={`appearance-none border border-gray-200 rounded w-full sm:text-md  text-sm p-1.5 leading-8 focus:outline-1px focus:outline-gray-200  ${theme === 'dark' ? 'text-white bg-gray-500  ' : 'text-gray-900 bg-gray-100'}`} placeholder='Slug page url' id="slug" type="text" {...register('slug', { required: true })} />
                      {errors.slug && <p className='text-red-500'>Notion contents slug url is required.</p>}
                    </div>
                  </div>
                  <div class="flex p-0 sm:p-2 flex-wrap justify-start space-y-0">
                    <div class="my-3 sm:my-0 w-full lg:w-1/2 px-2">
                        <label
                          class={`${theme === 'dark' ? 'text-white' : 'text-black'} flex text-start text-sm md:text-right mb-0 md:mb-0 pr-4 2xl:text-lg`}
                        >
                          Ready to Publish
                        </label>
                        <select
                          class={`appearance-none border border-gray-200 rounded w-full sm:text-md text-sm p-1.5 leading-8 focus:outline-1px focus:outline-gray-200 ${theme === 'dark' ? 'text-white bg-gray-500' : 'text-gray-900 bg-gray-100'
                            }`}
                          id="ready"
                          {...register('ready', { required: true })}
                        >
                          <option value="">Select status</option>
                          <option value="pending">Pending</option>
                          <option value="done">Done</option>
                        </select>
                        {errors.ready && (
                          <p className="text-red-500">Notion contents ready to publish required.</p>
                        )}
                      </div>
                    <div class="my-3 sm:my-0 w-full lg:w-1/2 px-2">
                      <label
                        class={`${theme === 'dark' ? 'text-white' : 'text-black'} flex text-start text-sm md:text-right mb-0 md:mb-0 pr-4 2xl:text-lg`}
                      >
                        Publish Date
                      </label>
                      <input
                        class={`appearance-none border border-gray-200 rounded w-full sm:text-md text-sm p-1.5 leading-8 focus:outline-1px focus:outline-gray-200 ${theme === 'dark' ? 'text-white bg-gray-500' : 'text-gray-900 bg-gray-100'
                          }`}
                        type="date"
                        id="date"
                        {...register('date', { required: true })}
                      />
                      {errors.date && (
                        <p className="text-red-500">Notion tags page-id required.</p>
                      )}
                    </div>

                  </div>


                  <div class="flex p-0 sm:p-2 flex-wrap justify-center space-y-0">

                    <div class="flex mx-auto justify-center lg:w-1/5 py-5">
                      <button
                        class={` lg:w-full  font-bold py-3 px-4 rounded-md ${theme === 'dark' ? 'text-white bg-red-400 hover:bg-red-500 focus:outline-gray-200 ' : 'text-gray-500 bg-red-400 hover:bg-red-500'}`}
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </div>
                    <div class="flex mx-auto justify-center lg:w-1/5 py-5">
                      <button
                        class={`lg:w-full  font-bold py-3 px-4 rounded-md ${theme === 'dark' ? 'text-white bg-green-400 hover:bg-green-500 focus:outline-gray-200 ' : 'text-gray-500 bg-green-400 hover:bg-green-500'}`}
                        type="submit"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </dialog>
          ) : ( */}
            <div style={{ height: "80%", width: "100%" }} className="ag-theme-alpine ">
              <div className='outline-2 border p-3  text-md font-bold  w-full '>All Authors<p className='text-sm font-light text-gray-500 '>List of all Authors</p></div>
              <AgGridReact
                // domLayout="autoHeight"
                columnDefs={columnDefs}
                rowData={rowData}
                defaultColDef={defaultColDef}
                gridOptions={gridOptions}
                //  autoGroupColumnDef={autoGroupColumnDef}
                suppressDragLeaveHidesColumns={true}
                suppressMakeColumnVisibleAfterUnGroup={true}
                suppressRowGroupHidesColumns={true}
                rowGroupPanelShow={'always'}
              >

              </AgGridReact>
            </div>
          {/* )} */}
        </div>
      </>
      {isopen ? (
         <div className='z-10  absolute justify-center items-center flex w-full min-h-[calc(100vh-65px-100px)] backdrop-brightness-50'> 
            <dialog open={isopen} onClose={() => setIsOpen(false)} className={`lg:w-[60%] rounded-md ${theme === 'dark' ? ' bg-gray-600' : 'bg-gray-200'}`}  >
              <p className='text-2xl border-2 rounded-full hover:border-gray-800  cursor-pointer w-fit' onClick={() => setIsOpen(!isopen)}> <AiFillCloseCircle />
              </p>
              <form method='post' onSubmit={handleSubmit(onSubmit)}>
                <div class="py-4 px-0 ">
                  <div class="flex p-0 sm:p-2 flex-wrap justify-center space-y-0 ">
                    <div class="my-3 sm:my-0  w-full lg:w-1/2 px-2 ">
                      <label class={`${theme === 'dark' ? 'text-white' : 'text-black'} flex text-start text-sm   md:text-right mb-0 md:mb-0 pr-4  2xl:text-lg`} >
                        Authors Page Name
                      </label>
                      <input class={` appearance-none border border-gray-200 rounded w-full sm:text-md  text-sm p-1.5 leading-8 focus:outline-1px focus:outline-gray-200  ${theme === 'dark' ? 'text-white bg-gray-500 ' : 'text-gray-900 bg-gray-100'}`} id="pagename" placeholder="Page Name" type="text" {...register('pagename', { required: true })} />
                      {errors.pagename && <p className='text-red-500 '>Notion contents fill the tags name</p>}
                    </div>

                    <div class="my-3 sm:my-0  w-full lg:w-1/2  px-2 ">
                      <label class={`${theme === 'dark' ? 'text-white' : 'text-black'} flex text-start text-sm   md:text-right mb-0 md:mb-0 pr-4  2xl:text-lg`} >
                        Slug Url
                      </label>
                      <input class={`appearance-none border border-gray-200 rounded w-full sm:text-md  text-sm p-1.5 leading-8 focus:outline-1px focus:outline-gray-200  ${theme === 'dark' ? 'text-white bg-gray-500  ' : 'text-gray-900 bg-gray-100'}`} placeholder='Slug page url' id="slug" type="text" {...register('slug', { required: true })} />
                      {errors.slug && <p className='text-red-500'>Notion contents slug url is required.</p>}
                    </div>
                  </div>
                  <div class="flex p-0 sm:p-2 flex-wrap justify-start space-y-0">
                    {/* <div class="my-3 sm:my-0 w-full lg:w-1/2 px-2">
                        <label
                          class={`${theme === 'dark' ? 'text-white' : 'text-black'} flex text-start text-sm md:text-right mb-0 md:mb-0 pr-4 2xl:text-lg`}
                        >
                          Ready to Publish
                        </label>
                        <select
                          class={`appearance-none border border-gray-200 rounded w-full sm:text-md text-sm p-1.5 leading-8 focus:outline-1px focus:outline-gray-200 ${theme === 'dark' ? 'text-white bg-gray-500' : 'text-gray-900 bg-gray-100'
                            }`}
                          id="ready"
                          {...register('ready', { required: true })}
                        >
                          <option value="">Select status</option>
                          <option value="pending">Pending</option>
                          <option value="done">Done</option>
                        </select>
                        {errors.ready && (
                          <p className="text-red-500">Notion contents ready to publish required.</p>
                        )}
                      </div> */}
                    <div class="my-3 sm:my-0 w-full lg:w-1/2 px-2">
                      <label
                        class={`${theme === 'dark' ? 'text-white' : 'text-black'} flex text-start text-sm md:text-right mb-0 md:mb-0 pr-4 2xl:text-lg`}
                      >
                        Publish Date
                      </label>
                      <input
                        class={`appearance-none border border-gray-200 rounded w-full sm:text-md text-sm p-1.5 leading-8 focus:outline-1px focus:outline-gray-200 ${theme === 'dark' ? 'text-white bg-gray-500' : 'text-gray-900 bg-gray-100'
                          }`}
                        type="date"
                        id="date"
                        {...register('date', { required: true })}
                      />
                      {errors.date && (
                        <p className="text-red-500">Notion tags page-id required.</p>
                      )}
                    </div>

                  </div>


                  <div class="flex p-0 sm:p-2 flex-wrap justify-center space-y-0">

                    <div class="flex mx-auto justify-center lg:w-1/5 py-5">
                      <button
                        class={` lg:w-full  font-bold py-3 px-4 rounded-md ${theme === 'dark' ? 'text-white bg-red-400 hover:bg-red-500 focus:outline-gray-200 ' : 'text-gray-500 bg-red-400 hover:bg-red-500'}`}
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </div>
                    <div class="flex mx-auto justify-center lg:w-1/5 py-5">
                      <button
                        class={`lg:w-full  font-bold py-3 px-4 rounded-md ${theme === 'dark' ? 'text-white bg-green-400 hover:bg-green-500 focus:outline-gray-200 ' : 'text-gray-500 bg-green-400 hover:bg-green-500'}`}
                        type="submit"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </dialog>
            </div>
          ) : ''}
           {showModal ? (
        <div className='z-10 absolute justify-center items-center flex w-full min-h-[calc(100vh-65px-100px)] backdrop-brightness-50'>
          <div onClose={() => setShowModal(false)} className={`lg:w-[50%] p-5 rounded-md ${theme === 'dark' ? ' bg-gray-600' : 'bg-gray-200'}`}  >
            <div className='flex p-4 justify-between'>
              <p className='text-2xl  rounded-full hover:border-gray-800  cursor-pointer w-fit' onClick={() => setShowModal(!showModal)}> <AiFillCloseCircle />
              </p>
              <h3 className="sm:text-3xl font-semibold"> Edit Authors Form  </h3>
            </div>
            <form method='post' onSubmit={handleSubmit1(handleUpdateSubmit)}>
              <div class="py-4 px-0 ">
                <div class="flex p-0 sm:p-2 flex-wrap justify-center space-y-0 ">
                  <div class="my-3 sm:my-0  w-full lg:w-1/2 px-2 ">
                    <label class={`${theme === 'dark' ? 'text-white' : 'text-black'} flex text-start text-sm   md:text-right mb-0 md:mb-0 pr-4  2xl:text-lg`} >
                      Author Title
                    </label>
                    <input class={` appearance-none border border-gray-200 rounded w-full sm:text-md  text-sm p-1.5 leading-8 focus:outline-1px focus:outline-gray-200  ${theme === 'dark' ? 'text-white bg-gray-500 ' : 'text-gray-900 bg-gray-100'}`}
                      id="contents" placeholder="Page Name" type="text" defaultValue={rowData.filter((d) => d.id === update.id)[0]?.title} /* {...register1('titles')} */ name={title} onChange={(e) => { setTitle(e.target.value) }} required />
                    {errors.content && <p className='text-red-500 '>Notion contents fill the content name</p>}
                  </div>

                  <div class="my-3 sm:my-0  w-full lg:w-1/2  px-2 ">
                    <label class={`${theme === 'dark' ? 'text-white' : 'text-black'} flex text-start text-sm   md:text-right mb-0 md:mb-0 pr-4  2xl:text-lg`} >
                      Slug Url
                    </label>
                    <input class={`appearance-none border border-gray-200 rounded w-full sm:text-md  text-sm p-1.5 leading-8 focus:outline-1px focus:outline-gray-200  ${theme === 'dark' ? 'text-white bg-gray-500  ' : 'text-gray-900 bg-gray-100'}`} placeholder='Slug page url' id="slug" type="text"
                      defaultValue={update.slug} onChange={(e) => { setSlug(e.target.value) }} required /* {...register1('slug', { required: true })} */ />
                    {errors.slug && <p className='text-red-500'>Notion contents slug url is required.</p>}
                  </div>
                </div>
                <div class="flex p-0 sm:p-2 flex-wrap justify-center space-y-0">
                  <div class="my-3 sm:my-0 w-full lg:w-1/2 px-2">
                    <label
                      class={`${theme === 'dark' ? 'text-white' : 'text-black'} flex text-start text-sm md:text-right mb-0 md:mb-0 pr-4 2xl:text-lg`}
                    >
                      Ready to Publish
                    </label>
                    <input
                      class={`appearance-none border border-gray-200 rounded w-full sm:text-md text-sm p-1.5 leading-8 focus:outline-1px focus:outline-gray-200 ${theme === 'dark' ? 'text-white bg-gray-500' : 'text-gray-900 bg-gray-100'}`}
                      value={rowData.filter((d) => d.id === update.id)[0]?.status}
                      onChange={(e) => { setStatus(e.target.value) }}
                      readOnly
                    >
                      {/* <option value={rowData.filter((d) => d.id === update.id)[0]?.status} >{rowData.filter((d) => d.id === update.id)[0]?.status}</option> */}
                      {/* <option value="pending">Pending</option>
                          <option value="done">Done</option>  */}
                    </input>
                    {errors.ready && (
                      <p className="text-red-500">Notion contents ready to publish required.</p>
                    )}
                  </div>
                  <div class="my-3 sm:my-0 w-full lg:w-1/2 px-2">
                    <label
                      class={`${theme === 'dark' ? 'text-white' : 'text-black'} flex text-start text-sm md:text-right mb-0 md:mb-0 pr-4 2xl:text-lg`}
                    >
                      Publish Date
                    </label>
                    <input
                      class={`appearance-none border border-gray-200 rounded w-full sm:text-md text-sm p-1.5 leading-8 focus:outline-1px focus:outline-gray-200 ${theme === 'dark' ? 'text-white bg-gray-500' : 'text-gray-900 bg-gray-100'
                        }`}
                      type="date"
                      id="date"
                      defaultValue={update.publishDate}
                      onChange={(e) => { setDate(e.target.value) }}
                      required
                    // {...register('date', { required: true })}
                    />
                    {errors.date && (
                      <p className="text-red-500">Notion pages page-id required.</p>
                    )}
                  </div>
                  {/* <div class="my-3 sm:my-0 w-full flex items-center lg:w-1/2 px-2">
                        <label
                          class={`${theme === 'dark' ? 'text-white' : 'text-black'} flex text-start text-sm md:text-right mb-0 md:mb-0 pr-4 2xl:text-lg`}
                        >
                          Featured
                        </label>
                        <input
                          // class={`appearance-none border border-gray-200 rounded w-full sm:text-md text-sm p-1.5 leading-8 focus:outline-1px focus:outline-gray-200 ${
                          //   theme === 'dark' ? 'text-white bg-gray-500' : 'text-gray-900 bg-gray-100'
                          // }`}
                          type="checkbox"
                          id="feature"
                          {...register('feature', { required: true })}
                        />
                        {errors.author_page_id && (
                          <p className="text-red-500">Notion author page-id required.</p>
                        )}
                      </div> */}
                </div>
                {/* <div class="flex p-0 sm:p-2 flex-wrap justify-start space-y-0">
                      <div class="my-3 sm:my-0  w-full lg:w-1/2   px-2">
                        <label class={`${theme === 'dark' ? 'text-white' : 'text-black'} flex text-start text-sm   md:text-right mb-0 md:mb-0 pr-4  2xl:text-lg`} >
                          Excerpt
                        </label>
                        <input class={`appearance-none border border-gray-200 rounded w-full sm:text-md  text-sm p-1.5 leading-8 focus:outline-1px focus:outline-gray-200  ${theme === 'dark' ? 'text-white bg-gray-500  ' : 'text-gray-900 bg-gray-100'}`} placeholder='enter some details of excerpt' id="excerpt" {...register('excerpt', { required: true })} />
                        {errors.excerpt && <p className='text-red-500'>Notion contents enter some details excerpt required.</p>}
                      </div>
                    </div> */}

                <div class="flex p-0 sm:p-2 flex-wrap justify-center space-y-0">

                  <div class="flex mx-auto justify-center lg:w-1/5 py-5">
                    <button
                      class={` lg:w-full  font-bold py-3 px-4 rounded-md ${theme === 'dark' ? 'text-white bg-red-400 hover:bg-red-500 focus:outline-gray-200 ' : 'text-gray-500 bg-red-400 hover:bg-red-500'}`}
                      onClick={handleCancelClose}
                    >
                      Cancel
                    </button>
                  </div>
                  <div class="flex mx-auto justify-center lg:w-1/5 py-5">
                    <button
                      class={`lg:w-full  font-bold py-3 px-4 rounded-md ${theme === 'dark' ? 'text-white bg-green-400 hover:bg-green-500 focus:outline-gray-200 ' : 'text-gray-500 bg-green-400 hover:bg-green-500'}`}
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )
        : ''}
    </div>
  )
}

export default Authors;