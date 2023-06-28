import React,{useEffect, useState,useRef, useContext, Fragment} from 'react'
import axios from 'axios'
import { Link, NavLink,useNavigate } from 'react-router-dom';
import '../App.css'
import { ThemeContext } from './Context/ThemeContext';
import {MdDarkMode} from 'react-icons/md'
import {BsFillSunFill} from 'react-icons/bs'
import { useAuth0 } from "@auth0/auth0-react";
import chatG from '../Images/50.1.svg'
import chatblack from '../Images/50.svg'
import Loading from './Loading';

const Header = () => {
    const item=sessionStorage.getItem("UserList")
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [open, setOpen] = useState(false);
    const [header,setHeader]=useState([])
    const [databaseId, setDatabaseId] = useState(null);
    const [domain,setDomain]=useState('')
    const [array,setArray]=useState(item ? JSON.parse(item):[]);
    const navigate = useNavigate();
    let menuRef = useRef(null);

    const { loginWithRedirect,isAuthenticated,logout,user  } = useAuth0();

    // useEffect(() => {
    //   let handler = (e) => {
    //     if (menuRef.current &&  !menuRef.current.contains(e.target)) {
    //       setOpen(false);
    //     }
    //   };
    //   document.addEventListener("mousedown", handler);
  
    //   return () => {
    //     document.removeEventListener("mousedown", handler);
    //   };
    // });
    
    // const handlecall=(res)=>{
        
    //   navigate(`/${res?.properties.Slug.rich_text[0].plain_text}`,{ state: { myData: res}, replace:true })
  
    // }

    useEffect(()=>{
        async function LoadData(){
            const res=await axios.get(`https://vercel-notion.vercel.app/users`);
            const uniqueData = res.data.results.filter(newData => !array.some(existingData => existingData.properties.ContentPageId.rich_text.plain_text === newData.properties.ContentPageId.rich_text.plain_text));
            sessionStorage.setItem("UsersList",JSON.stringify(uniqueData))
            setArray(uniqueData)
        }
        async function callonce(){
            const response=await axios.get(`https://vercel-notion.vercel.app/fetchuserdata/${databaseId}/${domain}`)
            setHeader(response.data)
            sessionStorage.setItem('header',JSON.stringify(response.data))
        }
        if(array.length <1  ){
            LoadData()
        }
        const head=sessionStorage.getItem("header")
        setHeader(JSON.parse(head));
        const currentDomain = window.location.hostname;
        console.log(currentDomain);
        const matchingDomain = array?.find(mapping => mapping.properties.Domain?.rich_text[0].plain_text === currentDomain);
   
        if (matchingDomain) {
    
        setDatabaseId(matchingDomain.properties.PagesPageId.rich_text[0].plain_text);
        setDomain(matchingDomain.properties.Domain.rich_text[0].plain_text)
        }
    
        if(databaseId !==null && !header){
        
        callonce()
        }
    },[array,databaseId])
   
     const handlecall=(res)=>{
        
         navigate(`/${res?.properties.Slug.rich_text[0].plain_text}`,{ state: { myData: res}, replace:true })
     
       }
      // useEffect(()=>{
      //  console.log(window.location.pathname) 
      // })
      const handleLogoutClick = (event) => {
        event.preventDefault(); // Prevents the default behavior (refreshing the page)
    
        // Call the logout function with the desired parameters
        logout({ logoutParams: { returnTo: window.location.origin } });
      };
    
     
  return (
    <section className='top-0 w-full sticky z-50 '>
         <header className={`navbar  h-16  shadow-sm backdrop-blur-lg top-0 py-3 ${theme === 'dark'?  'text-white bg-gray-700':'text-gray-900 bg-white/90'} ` }>
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between">
                <div className="shrink-0">
                  <Link
                    className="logo flex items-center umami--click---"
                    to="/"
                  >
                    <img
                      alt="ChatG.in"
                      src={theme === 'dark' ? chatG: chatblack}
                      className={`h-[30px] w-[50px] `}
                    />
                  </Link>
                </div>
               
                <div className='flex gap-5'>
                {/* {header && header?.users?.results.map((data)=>
                           {

                             return( */}
                             {isAuthenticated ? (
                               <></>
                             )
                                 :(<div className="nav-link-wrapper-left hidden lg:flex lg:items-center lg:justify-end lg:gap-4">
                                     <NavLink  to={'/'} end activeClassName="active" className='group inline-flex items-center justify-center gap-1 text-base transition-all duration-200 rounded-md px-3 py-1.5 hover:bg-gray-100 focus:outline-none   font-medium text-gray-500 hover:text-gray-900 focus:ring-gray-200' >Home</NavLink>
                                     <NavLink  to={'/pricing'}  className='group inline-flex items-center justify-center gap-1 text-base transition-all duration-200 rounded-md px-3 py-1.5 hover:bg-gray-100 focus:outline-none  font-medium text-gray-500 hover:text-gray-900 focus:ring-gray-200 ' >Price</NavLink>
                                     <NavLink  to={'/blog'}  className='group inline-flex items-center justify-center gap-1 text-base transition-all duration-200 rounded-md px-3 py-1.5 hover:bg-gray-100 focus:outline-none   font-medium text-gray-500 hover:text-gray-900 focus:ring-gray-200' >Blog</NavLink>
                                     <NavLink  to={'/register'}  className='group inline-flex items-center justify-center gap-1 text-base transition-all duration-200 rounded-md px-3 py-1.5 hover:bg-gray-100 focus:outline-none   font-medium text-gray-500 hover:text-gray-900 focus:ring-gray-200' >Registration</NavLink>
                                 </div>
                                  ) }
                                {/* )
                            }
                        )} */}
                  </div>
                <div className="nav-links-wrapper-right flex items-center justify-end gap-3 lg:gap-4">
                  <div className="flex items-center justify-end gap-3 lg:gap-2">
                    {/* <button
                      type="button"
                      className="site-search-btn inline-flex h-10 w-10 items-center justify-center text-gray-600 transition-all duration-200 rounded-lg hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                      aria-label="Search"
                    >
                      <span className="sr-only">Search</span>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                      >
                        <path
                          d="M21 21L17.364 17.364M17.364 17.364C18.9926 15.7353 20 13.4853 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C13.4853 20 15.7353 18.9926 17.364 17.364Z"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        ></path>
                      </svg>
                    </button> */}
                  </div>
                  <div onClick={toggleTheme} className="cursor-pointer">
                    { theme === 'dark'? <MdDarkMode /> : <BsFillSunFill />  }
                  </div>
                  <div className="hidden lg:flex sm:items-center sm:gap-4"  >
                  {isAuthenticated?(
                   <div className="items-center"> 
                    <button  onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                      className="group inline-flex items-center justify-center gap-1 text-[0.95rem]  transition-all duration-200 rounded-md px-3 hover:bg-gray-100 focus:outline-none focus:ring-2  font-medium text-gray-500 hover:text-gray-900 focus:ring-gray-200 "
               
                    >
                      LogOut 
                      
                    </button>
                    <h2>

                      {user.name}
                    </h2>
                      </div>
                  ):
                  (
                    <button onClick={loginWithRedirect} 
                      className="group inline-flex items-center justify-center gap-1 text-base transition-all duration-200 rounded-md px-3 py-1.5 hover:bg-gray-100 focus:outline-none focus:ring-2  font-medium text-gray-500 hover:text-gray-900 focus:ring-gray-200 "
               
                    >
                      Login
                    </button>

                  )

                  } 
                    {/* <a
                      className="nav-link nav-link-right  nav-link-NOTION_PAGE nav-link-dad51fa7-49af-43c9-ac95-87c70fd42710 group 
                    inline-flex h-10 items-center justify-center gap-1.5 bg-pink-500 text-base font-semibold text-white transition-all 
                    duration-200 rounded-md border border-transparent px-3 py-1.5 hover:bg-pink-600 focus:outline-none 
                    focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 umami--click---about-me"
                      href="#"
                    >
                      Subscribe
                    </a> */}
                  </div>

               
                  <div className="flex lg:hidden">
                
                    {/* <details className="menu-details"> */}
                        {/* <span className="sr-only">Open main menu</span> */}
                        {open ? (
                          <div onClick={() => setOpen(false) }>
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

                          <summary   onClick={() => setOpen(true)} className="inline-flex  p-2 items-center justify-center text-gray-600 transition-all duration-200 rounded-md border border-gray-200 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2">
       
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
                      
                      <div className="absolute w-full bg-white shadow-lg left-0 mt-2 top-[50px]">
                        {open  ?
                        <div  className="nav-link-items-mobile px-4 pb-4 ">
                     
                        {/* {header && header?.users?.results.map((data,key)=>
                           {
                             
                               return( */}
                                <div  onClick={() => setOpen(false) }  className="-mx-2 space-y-1 pt-4">
                                  <NavLink  to={'/'} activeClassName="active" className="nav-link no-underline nav-link-left group flex items-center text-base rounded-lg px-3 py-1.5 hover:bg-gray-100 font-medium text-gray-500 hover:text-gray-900  " >Home</NavLink>
                                  <NavLink  to={'/pricing'} className="nav-link no-underline nav-link-left group flex items-center text-base rounded-lg px-3 py-1.5 hover:bg-gray-100 font-medium text-gray-500 hover:text-gray-900  " >Price</NavLink>
                                  <NavLink  to={'/blog'} activeClassName="active" className="nav-link no-underline nav-link-left group flex items-center text-base rounded-lg px-3 py-1.5 hover:bg-gray-100 font-medium text-gray-500 hover:text-gray-900  " >Blog</NavLink>
                                  <NavLink  to={'/register'} className="nav-link no-underline nav-link-left group flex items-center text-base rounded-lg px-3 py-1.5 hover:bg-gray-100 font-medium text-gray-500 hover:text-gray-900  " >Registration</NavLink>
                                 
                                </div>
                                {/* )
                            }
                        )} */}
                          <div onClick={() => setOpen(false) } className="nav-links-wrapper-right-mobile -mx-3 space-y-4 px-3 pt-4">
                          {isAuthenticated?(
                            <>
                            <div className='flex w-full hover:bg-gray-100 justify-between items-center rounded-lg px-3 py-1.5 cursor-pointer ' onClick={handleLogoutClick}>
                            <button 
                              className="nav-link  no-underline nav-link-left group flex items-center text-base hover:bg-gray-100 font-medium text-gray-500 hover:text-gray-900 focus:ring-gray-900   "
                              // href="/about-me"
                            >
                              LogOut
                            </button>
                            <h2 className='items-end'>{user.name}</h2>
                            </div>
                            </>
                          ):(
                            <button onClick={loginWithRedirect}
                            className="nav-link w-full no-underline nav-link-left group flex items-center text-base rounded-lg px-3 py-1.5 hover:bg-gray-100 font-medium text-gray-500 hover:text-gray-900   "
                            // href="/about-me"
                          >
                            Login
                          </button>
                          )}
                            {/* <NavLink
                              className="nav-link nav-link-right hover:text-green-50 rounded-lg  group inline-flex h-10 w-full items-center justify-center gap-1.5 bg-pink-500 text-base font-semibold text-green-50 transition-all duration-200 rounded-cta-button-radius border border-transparent px-3 py-1.5 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 "
                              // href="/about-me"
                            >
                              Subscribe
                            </NavLink> */}
                          </div>
                        </div>
                       :''}
                      </div>
                    {/* </details> */}
                  </div>
                
                </div>
              </div>
            </div>
          </header>
    </section>
  )
}

export default Header;