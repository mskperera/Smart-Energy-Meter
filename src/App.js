import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../src/pages/now/Home';
import HomeMode from '../src/pages/now/HomeMode';
import Today from '../src/pages/today/Today';
import Week from '../src/pages/week/Week';
import Month from './pages/month/Month';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/tab';
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
import Admin from './pages/custom/customadmin/Admin';
import Group from './pages/managegroup/Group';
import Status from './pages/status/Status';
import Inventory from './pages/deviceInventory/Inventory';
import AccountReg from './pages/serviceAccount/AccountReg';
import Layout from './Layout';

import Unauthorized from './pages/other/unauthorized';

import Setup from './pages/serviceAccount/Setup';

import MonthActive from './pages/month copy/MonthActive';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/userregister/:userRegId/:saveType' element={<UserRegister />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/billingsession' element={<BillingSession />} />
          <Route path='/Notify' element={<Notify />} />
          <Route path='/status' element={<Status />} />
          <Route path='/userlist' element={<Userlist />} />
          <Route path='/home' element={<Home />} />
          <Route path='/homemode' element={<HomeMode />} />
          <Route path='/homecopy' element={<Home />} />
          <Route path='/today' element={<Today />} />
          <Route path='/week' element={<Week />} />
          <Route path='/month' element={<Month />} />
          <Route path='/monthactive' element={<MonthActive />} />
          <Route path='/apiData/charts' element={<Charts />} />
          <Route path='/year' element={<Year />} />
          <Route path='/custom' element={<Custom />} />
          <Route path='/deviceinfo' element={<DeviceInfo />} />
          <Route path='/service' element={<Service />} />
          <Route path='/management' element={<Management />} />
          <Route path='/inventory' element={<Inventory />} />
          <Route path='/accountreg' element={<AccountReg />} />
          <Route path='/setup' element={<Setup/>} />
          <Route path='/deviceregister/:deviceRegId/:saveType' element={<DeviceRegister />} />
          <Route path='/apiData/deviceSettings' element={<DeviceSettings />} />
          <Route path='/apiData' element={<APIData />} />
          <Route path='/device' element={<DeviceMan />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/group' element={<Group />} />
          <Route path='/unauthorized' element={<Unauthorized />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
