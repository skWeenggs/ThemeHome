import React,{useContext, useEffect,useState} from 'react'
import axios from 'axios';
import { useForm } from 'react-hook-form';
// import ProgressBar from "react-progressbar-on-scroll";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { ThemeContext } from '../Context/ThemeContext';

const RegisterUser=()=> {

  
    const validationSchema = Yup.object().shape({
        email: Yup.string().email().required(),
        domain_name:Yup.string().required(),
        content_page_id:Yup.string().required(),
        pages_page_id:Yup.string().required(),
        author_page_id:Yup.string().required(),
        tag_page_id:Yup.string().required(),
        token_secretid:Yup.string().required(),
        template:Yup.string().required(),
    });

      const {register,handleSubmit,resetField,formState: { errors }} = useForm({resolver: yupResolver(validationSchema)}  );
      const { theme } = useContext(ThemeContext);
    const onSubmit =async(data) =>{ 
        console.log(data)
        const list={
            email:data.email,
            domain:data.domain_name,
            content_page_id:data.content_page_id,
            pages_page_id:data.pages_page_id,
            author_page_id:data.author_page_id,
            tag_page_id:data.tag_page_id,
            token_secretid:data.token_secretid,
            temp:data.template,
        }
        await axios.post(`https://vercel-notion.vercel.app/submitFormToNotion`,list)
        .then((response)=>{
            resetField("email")
            resetField("domain_name")
            resetField("content_page_id")
            resetField("pages_page_id")
            resetField("author_page_id")
            resetField("tag_page_id")
            resetField("token_secretid")
            resetField("template")
            toast("register user successfully")
        })
        .catch((err)=>{
            console.log(err);
            toast("massage",err)
        })
        }

  return (
    <>
        <div class="font-sans antialiased bg-grey-lightest lg:min-h-[calc(100vh-65px-100px)]  ">
          <div class="w-full bg-green fixed shadow ">
            <div class="container mx-auto"></div>
          </div>
          <div class={`w-full ${theme === 'dark'?'bg-gray-800':'bg-white'}`}>
            <div class="container mx-auto py-8 ">
              <div class={`w-5/6 lg:w-1/2 mx-auto ${theme === 'dark'?'bg-gray-700':'bg-white'} rounded shadow`}>
                <div class={`py-4 px-8 ${theme === 'dark'?'text-white':' text-black'} text-xl border-b border-grey-lighter`}>
                  Register Notion Account Details
               </div>
                <form class="w-full contents text-sm" method="post" onSubmit={handleSubmit(onSubmit)}>
                <div class="py-4 px-8 ">
                  <div class="flex p-0 sm:p-2 flex-wrap justify-center space-y-0 ">
                      <div class="my-3 sm:my-0  w-full lg:w-1/2 px-2 ">
                      <label class={`${theme === 'dark'? 'text-white':'text-black'} flex text-start text-sm   md:text-right mb-0 md:mb-0 pr-4  2xl:text-lg`} >
                          Email Address
                      </label>
                            <input class={` appearance-none border border-gray-200 rounded w-full sm:text-md  text-sm p-1.5 leading-8 focus:outline-1px focus:outline-gray-200  ${theme === 'dark' ? 'text-white bg-gray-500 ' : 'text-gray-900 bg-gray-100'}`} id="email"  placeholder="Email (Enter notion registered email)" type="text" {...register('email',{required:true})} />
                          {errors.email && <p className='text-red-500 '>Please enter a valid email address.</p>}   
                      </div>
                  
                        <div class="my-3 sm:my-0  w-full lg:w-1/2  px-2 ">
                        <label class={`${theme === 'dark'? 'text-white':'text-black'} flex text-start text-sm   md:text-right mb-0 md:mb-0 pr-4  2xl:text-lg`} >
                        Domain Name
                      </label>
                        <input class={`appearance-none border border-gray-200 rounded w-full sm:text-md  text-sm p-1.5 leading-8 focus:outline-1px focus:outline-gray-200  ${theme === 'dark' ? 'text-white bg-gray-500  ' : 'text-gray-900 bg-gray-100'}`} placeholder=' Damain Name' id="domain" type="text" {...register('domain_name',{required:true})} />
                        {errors.domain_name && <p className='text-red-500'>Domain name is required.</p>}
                        </div>
                  </div>
                  <div class="flex p-0 sm:p-2 flex-wrap justify-center space-y-0">
                      <div class="my-3 sm:my-0  w-full lg:w-1/2  px-2">
                      <label class={`${theme === 'dark'? 'text-white':'text-black'} flex text-start text-sm   md:text-right mb-0 md:mb-0 pr-4  2xl:text-lg`} >
                      Contents PageId
                      </label>
                        <input class={`appearance-none border border-gray-200 rounded w-full sm:text-md  text-sm p-1.5 leading-8 focus:outline-1px focus:outline-gray-200  ${theme === 'dark' ? 'text-white bg-gray-500  ' : 'text-gray-900 bg-gray-100'}`} placeholder=' Notion Contents Page-Id' id="content-page"  {...register('content_page_id',{required:true})}/>
                          {errors.content_page_id && <p className='text-red-500'>Notion contents page-id required.</p>}
                        </div>
                        <div class="my-3 sm:my-0  w-full lg:w-1/2   px-2">
                        <label class={`${theme === 'dark'? 'text-white':'text-black'} flex text-start text-sm   md:text-right mb-0 md:mb-0 pr-4  2xl:text-lg`} >
                      Pages PageId
                      </label>
                        <input class={`appearance-none border border-gray-200 rounded w-full sm:text-md  text-sm p-1.5 leading-8 focus:outline-1px focus:outline-gray-200  ${theme === 'dark' ? 'text-white bg-gray-500  ' : 'text-gray-900 bg-gray-100'}`} placeholder=' Notion pages Page-Id' id="pages-page" {...register('pages_page_id',{required:true})}/>
                        {errors.pages_page_id && <p className='text-red-500'>Notion pages page-id required.</p>}

                        </div>
                  </div>
                  <div class="flex p-0 sm:p-2 flex-wrap justify-center space-y-0">
                        <div class="my-3 sm:my-0  w-full lg:w-1/2  px-2">
                        <label class={`${theme === 'dark'? 'text-white':'text-black'} flex text-start text-sm   md:text-right mb-0 md:mb-0 pr-4  2xl:text-lg`} >
                      Author PageId
                      </label>
                        <input class={`appearance-none border border-gray-200 rounded w-full sm:text-md  text-sm p-1.5 leading-8 focus:outline-1px focus:outline-gray-200  ${theme === 'dark' ? 'text-white bg-gray-500  ' : 'text-gray-900 bg-gray-100'}`} placeholder=' Notion author Page-Id' id="author_page_id" {...register('author_page_id',{required:true})}/>
                          {errors.author_page_id && <p className='text-red-500'>Notion author page-id required.</p>}

                        </div>
                        <div class="my-3 sm:my-0  w-full lg:w-1/2   px-2">
                        <label class={`${theme === 'dark'? 'text-white':'text-black'} flex text-start text-sm   md:text-right mb-0 md:mb-0 pr-4  2xl:text-lg`} >
                      Tag PageId
                      </label>
                        <input class={`appearance-none border border-gray-200 rounded w-full sm:text-md  text-sm p-1.5 leading-8 focus:outline-1px focus:outline-gray-200  ${theme === 'dark' ? 'text-white bg-gray-500  ' : 'text-gray-900 bg-gray-100'}`} placeholder=' Notion tag Page-Id' id="tag_page_id" {...register('tag_page_id',{required:true})}/>
                          {errors.tag_page_id && <p className='text-red-500'>Notion tag page-id required.</p>}


                        </div>
                  </div>
                  <div class="flex p-0 sm:p-2 flex-wrap justify-center space-y-0">
                        <div class="my-3 sm:my-0  w-full lg:w-1/2   px-2">
                        <label class={`${theme === 'dark'? 'text-white':'text-black'} flex text-start text-sm   md:text-right mb-0 md:mb-0 pr-4  2xl:text-lg`} >
                      Notion Token
                      </label>
                        <input class={`appearance-none border border-gray-200 rounded w-full sm:text-md  text-sm p-1.5 leading-8 focus:outline-1px focus:outline-gray-200  ${theme === 'dark' ? 'text-white bg-gray-500  ' : 'text-gray-900 bg-gray-100'}`} placeholder='Notion Token' id="token-id" {...register('token_secretid',{required:true})}/>
                          {errors.token_secretid && <p className='text-red-500'>Notion-API token required.</p>}
                      

                        </div>
                        <div class="my-3 sm:my-0  w-full lg:w-1/2   px-2">
                        <label class={`${theme === 'dark'? 'text-white':'text-black'} flex text-start text-sm   md:text-right mb-0 md:mb-0 pr-4  2xl:text-lg`} >
                      Template Name
                      </label>
                        <input class={`appearance-none border border-gray-200 rounded w-full sm:text-md  text-sm p-1.5 leading-8 focus:outline-1px focus:outline-gray-200  ${theme === 'dark' ? 'text-white bg-gray-500  ' : 'text-gray-900 bg-gray-100' }`} placeholder='Template Name' id="template"  {...register('template',{required:true})}/>
                          {errors.template && <p className='text-red-500'>Template name required.</p>}

                        </div>
                        
                  </div>
                    
                </div>
                
                  <div class="flex mx-auto justify-center lg:w-1/2 py-5">
                    <button
                      class={`bg-blue lg:w-full  font-bold py-3 px-4 rounded-full ${theme === 'dark'? 'text-white bg-gray-600 hover:bg-gray-500 focus:outline-gray-200 ':'text-gray-500 bg-gray-100 hover:bg-gray-200'}`}
                      type="submit"
                      >
                      Sign Up
                    </button>
                  </div>
          
                </form>
              </div>
            
            </div>
          </div>
        </div>
        
        <ToastContainer />

    </>
  )
}

export default RegisterUser;