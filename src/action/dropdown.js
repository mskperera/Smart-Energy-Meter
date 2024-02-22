import customAxios from "../utils/axios";


export const  getDrpConsumerCategories= async () => {
  try {
    return await customAxios
      .get(`/drpdowns/getDrpConsumerCategories`, {
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

export const getDrpConsumerSubCategoriesById= async (id) => {
  try {
    return await customAxios
      .get(`/drpdowns/getDrpConsumerSubCategoriesById/${id}`, {
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

export const getDrpSupplier= async () => {
  try {
    return await customAxios
      .get(`/drpdowns/getDrpSupplier`, {
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


export const getDrpSupplyType= async () => {
  try {
    return await customAxios
      .get(`/drpdowns/getDrpSupplyType`, {
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