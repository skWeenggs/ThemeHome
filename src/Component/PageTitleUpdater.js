import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import getPageTitle from './Context/PageTitle';
const PageTitleUpdater=()=> {
    const location=useLocation();
    useEffect(()=>{
        const {pathname} = location;
        const pageTitle = getPageTitle(pathname); 
        document.title=pageTitle;
    },[location])
  return null
}

export default PageTitleUpdater;