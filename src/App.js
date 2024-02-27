import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../src/pages/now/Home'
import Today from '../src/pages/today/Today';
import Week from '../src/pages/week/Week';
import Month from './pages/month/Month';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/js/dist/tab'
import Charts from './pages/apiData/charts';
import DeviceSettings from './pages/apiData/deviceSettings';

import Login from './pages/login/Login';
import Year from './pages/year/Year';
import Custom from './pages/custom/Custom';
import APIData from './pages/apiData/charts';

import DeviceInfo from './pages/device/DeviceInfo';
import Service from './pages/settings/Service';
import Register from './pages/register/Register';
// import Connection from './pages/settings/Connection';




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/today' element={<Today/>}/>
        <Route path='/week' element={<Week/>}/>
        <Route path='/month' element={<Month/>}/>
        <Route path='/apiData/charts' element={<Charts/>}/>
        <Route path='/year' element={<Year/>}/>
        <Route path='/custom' element={<Custom/>}/>
        {/* <Route path='/device' element={<Device/>}/> */}
        <Route path='/deviceinfo' element={<DeviceInfo/>}/>
        <Route path='/service' element={<Service/>}/>
        {/* <Route path='/connection' element={<Connection/>}/> */}
        <Route path='/apiData/deviceSettings' element={<DeviceSettings/>}/>
        <Route path='/apiData' element={<APIData/>}/>
        {/* <Route path='/cost' element={<Cost/>}/> */}
        {/* <Route path='/todaycost' element={<TodayCost/>}/> */}
        {/* <Route path='/weekcost' element={<WeekCost/>}/> */}
        {/* <Route path='/monthcost' element={<MonthCost/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
