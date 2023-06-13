import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'
import { ThemeContext } from '../Context/ThemeContext';

const Blog = () => {
const { theme } = useContext(ThemeContext);
  return (
    <>
<section id="showcase" className={`py-12 sm:py-16 lg:py-20 xl:py-24 ${theme === 'dark'?'bg-gray-800' : 'bg-white'} lg:min-h-[calc(100vh-65px-100px)]`}>
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="text-center">
              <p class={`text-sm font-bold uppercase tracking-widest text-gray-700 ${theme === 'dark'?  'text-white':'text-gray-700'}`}>Showcase</p>
              <h2 class={`mt-6 text-3xl font-bold tracking-tight  ${theme === 'dark'?  'text-white':'text-gray-900'} sm:text-4xl lg:text-5xl`}>
                  Beautiful &amp; minimal Notion blog templates <br />
                  built with ChatG.
              </h2>
              <h3 class={`mx-auto mt-4 max-w-2xl text-lg font-normal  ${theme === 'dark'?  'text-white':'text-gray-700'} lg:text-xl lg:leading-8`}>Check out these Notion blog templates  possibilites.</h3>
          </div>
          <ul class="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-x-10 gap-y-12 sm:mt-12 sm:grid-cols-2 lg:mt-16 xl:grid-cols-3">
             <li class="group relative transition-all duration-200 hover:-translate-y-1">
                  <div class="aspect-w-2 overflow-hidden rounded-2xl border border-gray-100" >
                      <img alt="" src="https://firebasestorage.googleapis.com/v0/b/hip-beaker-350107.appspot.com/o/Carboniya%20blog%20post.png?alt=media&token=22a20f74-1cf6-4186-b991-eda0c85cce82&_gl=1*mcgg4w*_ga*MTg5MjQ4OTY5My4xNjg1NTA4NTIy*_ga_CW55HF8NVT*MTY4NTUwODUyNi4xLjEuMTY4NTUwOTczNy4wLjAuMA" class="h-full w-full rounded-2xl object-cover object-top px-6 pt-6" loading="lazy" />
                  </div>
                  <div class="mt-4 flex items-start justify-between space-x-6">
                      <div class="flex-1">
                          <p class={`text-lg font-bold  ${theme === 'dark'?  'text-white':'text-gray-700'} `}>Carboniya Blog Post</p>
                          <p class={`mt-0.5 text-sm font-normal  ${theme === 'dark'?  'text-white':'text-gray-600'}`}>Personal Developer Blog</p>
                      </div>
                      <div class="shrink-0">
                          <Link  to="https://carbonia.netlify.app" class={`flex items-center gap-2  ${theme === 'dark'?  'text-white':'text-gray-900'} opacity-0 transition-all duration-200 group-hover:opacity-100`} >
                              <span class="text-sm font-medium ">carbonia.netlify.app</span>
                              <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M6.74967 3.33325C6.74967 2.91904 7.08546 2.58325 7.49967 2.58325H16.6663C17.0806 2.58325 17.4163 2.91904 17.4163 3.33325V12.4999C17.4163 12.9141 17.0806 13.2499 16.6663 13.2499C16.2521 13.2499 15.9163 12.9141 15.9163 12.4999V5.14391L3.86334 17.1969C3.57044 17.4898 3.09557 17.4898 2.80268 17.1969C2.50978 16.904 2.50978 16.4291 2.80268 16.1363L14.8557 4.08325H7.49967C7.08546 4.08325 6.74967 3.74747 6.74967 3.33325Z"
                                  ></path>
                              </svg>
                              <span class="absolute inset-0" aria-hidden="true"></span>
                          </Link>
                      </div>
                  </div>
              </li>
              <li class="group relative transition-all duration-200 hover:-translate-y-1">
                  <div class="aspect-w-2 overflow-hidden rounded-2xl border border-gray-100" >
                      <img alt="" src="https://firebasestorage.googleapis.com/v0/b/hip-beaker-350107.appspot.com/o/Tynigone%20blog%20post.png?alt=media&token=ee04928e-5647-49fa-856b-e280ee15e471&_gl=1*115ucvb*_ga*MTg5MjQ4OTY5My4xNjg1NTA4NTIy*_ga_CW55HF8NVT*MTY4NTUwODUyNi4xLjEuMTY4NTUxMDIyNy4wLjAuMA.." class="h-full w-full rounded-2xl object-cover object-top px-6 pt-6" loading="lazy" />
                  </div>
                  <div class="mt-4 flex items-start justify-between space-x-6">
                      <div class="flex-1">
                          <p class={`text-lg font-bold  ${theme === 'dark'?  'text-white':'text-gray-700'} `}>Tinygone Blog Post</p>
                          <p class={`mt-0.5 text-sm font-normal  ${theme === 'dark'?  'text-white':'text-gray-600'}`}>Personal Developer Blog</p>
                      </div>
                      <div class="shrink-0">
                          <Link  to="https://tynigone.netlify.app/" class={` ${theme === 'dark'?  'text-white':'text-gray-900'} flex items-center gap-2 text-gray-900 opacity-0 transition-all duration-200 group-hover:opacity-100 `} >
                              <span class="text-sm font-medium ">tynigone.netlify.app/</span>
                              <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M6.74967 3.33325C6.74967 2.91904 7.08546 2.58325 7.49967 2.58325H16.6663C17.0806 2.58325 17.4163 2.91904 17.4163 3.33325V12.4999C17.4163 12.9141 17.0806 13.2499 16.6663 13.2499C16.2521 13.2499 15.9163 12.9141 15.9163 12.4999V5.14391L3.86334 17.1969C3.57044 17.4898 3.09557 17.4898 2.80268 17.1969C2.50978 16.904 2.50978 16.4291 2.80268 16.1363L14.8557 4.08325H7.49967C7.08546 4.08325 6.74967 3.74747 6.74967 3.33325Z"
                                  ></path>
                              </svg>
                              <span class="absolute inset-0" aria-hidden="true"></span>
                          </Link>
                      </div>
                  </div>
              </li>
            
          </ul>
         
      </div>
      </section>
    </>
  )
}

export default Blog