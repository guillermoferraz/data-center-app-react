import React from 'react';
import './index.scss'
import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/* Pages */
const Dashboard = lazy(() => import('./page/dashboard').then(({ Dashboard }) => ({ default: Dashboard })));
const Login = lazy(() => import('./page/login').then(({ Login }) => ({ default: Login })));
const Register = lazy(() => import('./page/register').then(({ Register }) => ({ default: Register })));
const ContentSubmodule = lazy(() => import('./page/contentSubmodule').then(({ ContentSubmodule }) => ({ default: ContentSubmodule })));
const EditModules = lazy(() => import ('./page/editModules').then(({ EditModules }) => ({default: EditModules})));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<>Loading Here</>}>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/contentsubmodule" element={<ContentSubmodule/>}/>
          <Route path="/editmodules" element={<EditModules/>}/>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
