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
import Profile from './pages/profile/Profile';
import Userlist from './pages/userlist/Userlist';
import Management from './pages/management/Management';
import DeviceMan from './pages/apiData/deviceMan';
import UserRegister from './pages/register/UserRegister';
import DeviceRegister from './pages/register/DeviceRegister';
import Notify from './pages/alert/Notify';
import BillingSession from './pages/session/BillingSession';



/// thisis new comment2 from fidasp
// testing develpment branch
// 2024-03-17 change testing
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/userregister/:userRegId/:saveType' element={<UserRegister/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/billingsession' element={<BillingSession/>}/>
        <Route path='/Notify' element={<Notify/>}/>
        <Route path='/userlist' element={<Userlist/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/today' element={<Today/>}/>
        <Route path='/week' element={<Week/>}/>
        <Route path='/month' element={<Month/>}/>
        <Route path='/apiData/charts' element={<Charts/>}/>
        <Route path='/year' element={<Year/>}/>
        <Route path='/custom' element={<Custom/>}/>
        <Route path='/deviceinfo' element={<DeviceInfo/>}/>
        <Route path='/service' element={<Service/>}/>
        <Route path='/management' element={<Management/>}/>
        <Route path='/deviceregister/:deviceRegId/:saveType' element={<DeviceRegister/>}/>
        <Route path='/apiData/deviceSettings' element={<DeviceSettings/>}/>
        <Route path='/apiData' element={<APIData/>}/>
        <Route path='/device' element={<DeviceMan/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
