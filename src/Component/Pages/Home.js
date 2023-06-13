import React,{useState,useEffect, useContext} from 'react'
import Carousel from 'react-elastic-carousel';
import { Link } from 'react-router-dom';
import '../../App.css'
import { ThemeContext } from '../Context/ThemeContext';
const Home = () => {
  const [id, setId] = useState(true)

  const [items, setItems] = useState([
    {title:"Notion is most usefull for making any type of blog-post pages",
    image:'https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png',
    name:'Yash',
    link:'Chat Production'
   },
    {title:"Notion is most usefull for making any type of blog-post pages",
    image:"https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png",
    name:'Satish',
    link:'Chat Production'
   },
    {title:"Notion is most usefull for making any type of blog-post pages",
    image:'https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png',
    name:'Akshay',
    link:'Chat Production'
   },
    
  ]);
  const { theme } = useContext(ThemeContext);
  useEffect(()=>{
    setTimeout(()=>{
      setId(!id)
    },10000)
  })
  const breakPoints1 = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 1},
    { width: 768, itemsToShow: 2 },
    { width: 1200, itemsToShow: 2 }
  ];

  return (
    <div className={`${theme === 'dark'?  'bg-gray-800':'bg-white'} min-h-[calc(100vh-65px-100px)]`}>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 '>

      <div class="mx-auto max-w-xl text-center lg:max-w-4xl py-5">
          <h1 class={`text-5xl font-bold tracking-tight ${theme === 'dark'?  'text-white':'text-gray-700'} sm:text-6xl xl:text-7xl`}>Notion to Blog in minutes</h1>
          <h2 class={`mt-4 text-lg font-normal leading-7 ${theme === 'dark'?  'text-white':'text-gray-700'} sm:text-xl lg:mx-auto lg:max-w-3xl xl:text-2xl xl:leading-9`}>
              Write your content on Notion and automatically publish it to your SEO-friendly blog – No coding or design skills required.
          </h2>
      </div>
        <img className='p-5 hover:scale-110 ease-in duration-300 rounded-md  ' src='https://firebasestorage.googleapis.com/v0/b/hip-beaker-350107.appspot.com/o/mixed.png?alt=media&token=746273f7-8517-4665-b74a-72ff485b5577&_gl=1*6z345d*_ga*NTA2MDI4MzQ5LjE2ODYwMjI0ODY.*_ga_CW55HF8NVT*MTY4NjA0MDA4NC4yLjEuMTY4NjA0MDE1MS4wLjAuMA..' alt='' />
      </div>
    
      <div  className={`py-12 sm:py-16  lg:py-20 xl:py-24 ${theme === 'dark'?'bg-gray-800' : 'bg-white'} `}>
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
          <div class="text-center">
              <p class={`text-sm font-bold uppercase tracking-widest text-gray-700 ${theme === 'dark'?  'text-white':'text-gray-700'}`}>Showcase</p>
              <h2 class={`mt-6 text-3xl font-bold tracking-tight  ${theme === 'dark'?  'text-white':'text-gray-900'} sm:text-4xl lg:text-5xl`}>
                  Beautiful &amp; minimal Notion blog templates <br />
                  built with ChatG.
              </h2>
              <h3 class={`mx-auto mt-4 max-w-2xl  ${theme === 'dark'?  'text-white':'text-gray-700'} lg:text-xl lg:leading-8`}>Check out these Notion blog templates  possibilites.</h3>
          </div>
          <ul class="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-x-10 gap-y-12 sm:mt-12 sm:grid-cols-2 lg:mt-16 xl:grid-cols-3">
          <li class="group relative transition-all duration-200 hover:-translate-y-1">
                  <div class="aspect-w-2 overflow-hidden rounded-2xl border border-gray-100" >
                      <img alt="" src="https://firebasestorage.googleapis.com/v0/b/hip-beaker-350107.appspot.com/o/Mixed.png?alt=media&token=ee6161e1-cf95-4e91-82d0-fb5b457f0ae6&_gl=1*1nrabf*_ga*NTA2MDI4MzQ5LjE2ODYwMjI0ODY.*_ga_CW55HF8NVT*MTY4NjAyMjQ4Ny4xLjEuMTY4NjAyMjgwMi4wLjAuMA.." class="h-full w-full rounded-2xl object-cover object-top px-6 pt-6" loading="lazy" />
                  </div>
                  <div class="mt-4 flex items-start justify-between space-x-6">
                      <div class="flex-1">
                          <p class={`text-lg font-bold  ${theme === 'dark'?  'text-white':'text-gray-700'} `}>Chat Blog Post</p>
                          <p class={`mt-0.5 text-sm font-normal  ${theme === 'dark'?  'text-white':'text-gray-600'}`}>Personal Developer Blog</p>
                      </div>
                      <div class="shrink-0">
                          <Link  to="https://domain121.netlify.app/" class={`flex items-center gap-2  ${theme === 'dark'?  'text-white':'text-gray-900'} opacity-0 transition-all duration-200 group-hover:opacity-100`} >
                              <span class="text-sm font-medium ">domain121.netlify.app</span>
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
          <div class="mt-8 text-center sm:mt-12">
              <Link
                  to={'/blog'}
                  class={`inline-flex h-10 items-center justify-center rounded-xl border  px-4 py-2 font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2  text-sm ${theme === 'dark'?'text-white hover:bg-gray-200 hover:text-gray-800 focus:ring-gray-300' :'text-gray-900  hover:bg-gray-200 hover:border-gray-500' } `}
                  role="button"
              >
                  View all examples
              </Link>
          </div>
          
      </div>
      </div>
      <section className='max-w-7xl block m-auto py-20 '>
      <div class="text-center py-5">
          <p class={`text-sm font-bold uppercase tracking-widest ${theme === 'dark'?  'text-white':'text-gray-700'}`}>Testimonials</p>
          <h2 class={`mt-6 text-3xl font-bold tracking-tight  ${theme === 'dark'?  'text-white':'text-gray-900'}  sm:text-4xl lg:text-5xl`}>Our growing wall of love ❤️</h2>
          <p class={`mx-auto mt-4 max-w-2xl text-lg font-normal  ${theme === 'dark'?  'text-white':'text-gray-700'} lg:text-xl lg:leading-8`}>These are the stories of some of our very early customers about their experience.</p>
      </div>
  
        <div className='lg:pt-30 pt-30 h-full '>
          <div className="container  m-auto my-5">
          <div className="flex flex-col w-full h-fit">
          <Carousel breakPoints={breakPoints1} showArrows={true} >
                          {items.map((item) => (
                            <div className="lg:w-[400px] m-auto text-[#e3dede] bg-[#1a1818] h-auto p-[20px]  rounded-lg ">
                             <div className="flex justify-end">
                              <img src="https://assets.website-files.com/63d0c13bf294b9ad2ad7a1f0/63d9e827eb207e7608d19d6c_quote.png" loading="lazy" alt="Testimonial Quote" />
                            </div>
                            <p className=' text-md mb-5'>
                                {item.title}
                            </p>
                            <div className='flex justify-between '>
                              <div className='p-2'>
                              <h1 className='font-medium text-orange-300 '>{item.name}</h1>
                              <p>{item.link}</p>
                              </div>
                           
                            <img className='mx-4 border-solid m-auto rounded-full mr-2 p-[15px]' width="80" height="80" src={item.image} class="custom-logo"  alt="" />
                             </div>                         
                            
                          </div>
                          ))}
                  </Carousel>
             </div>
        </div>
       
        </div>
       
      </section>
    </div>
  )
}

export default Home;