import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ThemeContext } from '../Context/ThemeContext';
import chatG from '../../Images/50.1.svg'
import chatblack from '../../Images/50.svg'
import '../../App.css'
const Footer = () => {
  const { theme } = useContext(ThemeContext);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return (
    <footer class={`  shadow dark:bg-gray-900   ${theme === 'dark' ? 'bg-gray-700' : 'bg-white/90  '}  bottom-0 top-0  `}>
      <hr />
      <div class="w-full  mx-auto px-5 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
          <Link to="/" class="flex items-center mb-4 sm:mb-0">
            <img  src={theme === 'dark' ? chatG: chatblack} class="h-8 mr-3 mt-2 sm:mt-0" alt="ChatG" />
          </Link>
          <ul  className=" gap-3 flex flex-col sm:flex-row  flex-wrap items-center text-sm font-medium text-gray-500  dark:text-gray-400">
            <NavLink onClick={scrollToTop } to={'/'} end activeClassName="active" className={`group mb-2 sm:mb-0 inline-flex items-center justify-center gap-1 text-base transition-all duration-200 rounded-md px-3 py-1.5 ${theme=== 'dark'?'hover:bg-gray-100 ':""} focus:outline-none   font-medium text-gray-500 hover:text-gray-900 focus:ring-gray-200 w-full sm:w-auto`} >Home</NavLink>
            <NavLink to={'/pricing'} onClick={scrollToTop } className={`group inline-flex items-center mb-2 sm:mb-0  justify-center gap-1 text-base transition-all duration-200 rounded-md px-3 py-1.5  ${theme=== 'dark'?'hover:bg-gray-100 ':""} focus:outline-none  font-medium text-gray-500 hover:text-gray-900 focus:ring-gray-200  w-full sm:w-auto`} >Price</NavLink>
            <NavLink to={'/blog'} onClick={scrollToTop } className={`group inline-flex items-center mb-2 sm:mb-0  justify-center gap-1 text-base transition-all duration-200 rounded-md px-3 py-1.5  ${theme=== 'dark'?'hover:bg-gray-100 ':""} focus:outline-none   font-medium text-gray-500 hover:text-gray-900 focus:ring-gray-200  w-full sm:w-auto`} >Blog</NavLink>
            <NavLink to={'/register'} onClick={scrollToTop } className={`group inline-flex items-center mb-2 sm:mb-0  justify-center gap-1 text-base transition-all duration-200 rounded-md px-3 py-1.5  ${theme=== 'dark'?'hover:bg-gray-100':""} focus:outline-none   font-medium text-gray-500 hover:text-gray-900 focus:ring-gray-200  w-full sm:w-auto`} >Registeration</NavLink>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer