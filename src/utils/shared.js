import { getDevicesByUserId } from "../action/device";

export const loadDevicesByUserId = async () => {
    const userData=JSON.parse(localStorage.getItem('userData'));  
    
    console.log('userData',userData.userId);
      const result = await getDevicesByUserId(userData.userId);
      console.log('deviceDetails', result);
      return result.data.deviceId
      
  }