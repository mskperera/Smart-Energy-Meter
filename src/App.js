import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../src/pages/now/Home'
import Today from '../src/pages/today/Today';
import Week from '../src/pages/week/Week';
import Month from './pages/month/Month';
import 'bootstrap/dist/css/bootstrap.min.css'
import APIData from './pages/APIData';
import Login from './pages/login/Login';
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
