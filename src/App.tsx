import React from 'react';
import './index.scss'
import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

/* Pages */
const Dashboard = lazy(() => import('./page/dashboard').then(({ Dashboard }) => ({ default: Dashboard })));
const Login = lazy(() => import('./page/login').then(({ Login }) => ({ default: Login })));
const Register = lazy(() => import('./page/register').then(({ Register }) => ({ default: Register })));



const App = () => {
  
  const root = document.getElementById('root');
  
  const toggleFullScreen = ()  => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } /*else if (document.exitFullscreen) {
      document.exitFullscreen();
    }*/
  }

  useEffect(()=> {root && setTimeout(() =>{ toggleFullScreen()},500)},[])

  return (
    <Router>
      <Suspense fallback={<>Loading Here</>}>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
