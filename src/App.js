import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../src/pages/now/Home'
import Today from '../src/pages/today/Today';
import Week from '../src/pages/week/Week';
import Month from './pages/month/Month';
import 'bootstrap/dist/css/bootstrap.min.css'
import Charts from './pages/apiData/charts';
import DeviceSettings from './pages/apiData/deviceSettings';

import Login from './pages/login/Login';
import Year from './pages/year/Year';
import Custom from './pages/custom/Custom';
// import TodayCost from '../src/pages/today/TodayCost';
// import WeekCost from '../src/pages/week/WeekCost';
// import MonthCost from './pages/month/MonthCost';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/today' element={<Today/>}/>
        <Route path='/week' element={<Week/>}/>
        <Route path='/month' element={<Month/>}/>
<<<<<<< Updated upstream
        <Route path='/apiData/charts' element={<Charts/>}/>
        <Route path='/apiData/deviceSettings' element={<DeviceSettings/>}/>
=======
        <Route path='/year' element={<Year/>}/>
        <Route path='/custom' element={<Custom/>}/>
        <Route path='/apiData' element={<APIData/>}/>
>>>>>>> Stashed changes
        {/* <Route path='/cost' element={<Cost/>}/> */}
        {/* <Route path='/todaycost' element={<TodayCost/>}/> */}
        {/* <Route path='/weekcost' element={<WeekCost/>}/> */}
        {/* <Route path='/monthcost' element={<MonthCost/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
