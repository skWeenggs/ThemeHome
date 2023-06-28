import Header from './Component/Header';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Home from './Component/Pages/Home';
import Blog from './Component/Pages/Blog';
import Price from './Component/Pages/Price';
import RegisterUser from './Component/Pages/Register';
import Login from './Component/Pages/Login';
import Footer from './Component/Pages/Footer';
import { ThemeContext } from './Component/Context/ThemeContext';
import { useContext } from 'react';
import Dashboard from './Component/AdminPages/Dashboard';
import { useAuth0 } from "@auth0/auth0-react";
import Loading from './Component/Loading';
import PageNotFound from './Component/Pages/PageNotFound';
import Content from './Component/AdminPages/Content';
import Pages from './Component/AdminPages/Pages';
import Tags from './Component/AdminPages/Tags';
import Authors from './Component/AdminPages/Author';
import Domain from './Component/AdminPages/Domain';
import Settings from './Component/AdminPages/Settings';
import Analysis from './Component/AdminPages/Analysis';
import PageTitleUpdater from './Component/PageTitleUpdater';
import Features from './Component/AdminPages/Features';
import FooterAdd from './Component/AdminPages/FooterAdd';

function App() {
  const { theme } = useContext(ThemeContext);
  const { isLoading, error , isAuthenticated } = useAuth0();
  if (isLoading) {
    return <Loading />;
  }
  return (
      <div className={` ${theme === 'dark'?'bg-gray-800' : 'bg-white'} min-h-[calc(100vh-60px-100px)]`}>
  <Router>
  <Header />
  <PageTitleUpdater />
  <Routes>
         {isAuthenticated ? (
              <>
                <Route  path="/" element={<Dashboard />} />
                <Route  path="/dashboard" element={<Dashboard />} />
                <Route  path="/content" element={<Content />} />
                <Route  path="/pages" element={<Pages />} />
                <Route  path="/tags" element={<Tags />} />
                <Route  path="/authors" element={<Authors />} />
                <Route path='/domain' element={<Domain />}/>
                <Route path='/analysis' element={<Analysis />} />
                <Route path='/settings' element={<Settings />} />
                <Route path='/settings/features' element={<Features />} />
                <Route path='/settings/footer' element={<FooterAdd />} />
              </>
            ) : (
              <>
              <Route path='/' element={<Home />} />
              </>
          )}
    {/* <Route path='/' element={isAuthenticated ? <Dashboard/>:<Home />}/> */}
    <Route path='/blog' element={<Blog />}/>
    <Route path='/pricing' element={<Price />}/>
    <Route path='/register' element={<RegisterUser />}/>
    <Route path='/login' element={<Login />}/>
    <Route path='*' element={<PageNotFound />} />
  </Routes>
  <Footer />
  </Router>
  </div>
  )
}

export default App;
