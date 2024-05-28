import customAxios from "../utils/axios";


export const  calculateBillAmountByUnits= async (payload) => {
  try {
    return await customAxios
      .post(`/tarrif/calculateBillAmountByUnits`,payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
  } catch (err) {
    return err;
  }
}
// calculateBillAmountByUnits
// {
//   "deviceId":4,
//   "units":50,
//   "noOfDays":20
//  }

 

export const calculateUnitsForBudgetByBillAmount= async (payload) => {
    try {
      return await customAxios
        .post(`/tarrif/calculateUnitsForBudgetByBillAmount`,payload, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
    } catch (err) {
      return err;
    }
  }
  // calculateUnitsForBudgetByBillAmount
  // {
  //   "deviceId":4,
  //   "billAmount":50,
  //   "noOfDays":20
  //  }
   