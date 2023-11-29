//const { cookieParser } = require("./functions");

const backendUrl = "https://urbanfleet.biz/";


const FetchHandler = (prop) => {

  if (prop.method === "POST") {
    return fetch(backendUrl + prop.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: ""//cookieParser("token"),
      },
      body: prop.data,
    }).then((res) => {
      return res.json();
    });
  }

  if (prop.method === "GET") {

    return fetch(backendUrl + prop.url, {
    
    }).then((res) => {
     // console.log(res)
      return res.json();
    });
  }
};

const FetchAPIHandler = (prop) => {

  if (prop.method === "POST") {
    return fetch(prop.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

      },
      body: prop.data,
    }).then((res) => {
      return res.json();
    });
  }

  if (prop.method === "GET") {

    return fetch(prop.url)
    .then((res) => {
      return res.json();
    });
  }
};



const loginFetch = (email, password) => {
  return FetchHandler({
    url: `includes/authenticate.php?email=${email}&password=${password}`,
    method: "GET",
  });
};

const signupFetch = (email,first_name, last_name, gender, phone, country) => {
  return FetchHandler({
    url: `includes/api_register.php?country=${country}&email=${email}&first_name=${first_name}&last_name=${last_name}&gender=${gender}&phone=${phone}`,
    method: "GET",
  });
};


const adminLoginFetch = (data) => {
  return FetchHandler({
    url: "user/admin-login",
    method: "POST",
    data: JSON.stringify(data),
  });
};

const registationFetch = (data) => {

  if (data.username.length < 5) {
    return new Promise((resolve, reject) => {
      resolve({ message: "Please enter a valid name" , type: "danger"});
    });
  }
  return FetchHandler({
    url: "user/register",
    method: "POST",
    data: JSON.stringify(data),
  });
};



const resetPassword = (data) => {
  return FetchHandler({
    url: "user/reset",
    method: "POST",
    data: JSON.stringify(data),
  });
};

const resetEmail = (data) => {
  return FetchHandler({
    url: "user/reset-email",
    method: "POST",
    data: JSON.stringify(data),
  });
};


const updatePassword = (data) => {
  return FetchHandler({
    url: "user/change_password",
    method: "POST",
    data: JSON.stringify(data),
  });
};



const profileFetch = () => {
  return FetchHandler({
    url: "user",
    method: "GET",
  });
};


const getCountryCode = () => {
  return FetchAPIHandler({
    url: "https://api.country.is",
    method: "GET",
  });
};



const postPayment = (data) => {
  return FetchHandler({
    url: "user/send",
    method: "POST",
    data: JSON.stringify({ data: data }),
  });
};

const postWithdrawal = (data) => {
  return FetchHandler({
    url: "user/withdraw",
    method: "POST",
    data: JSON.stringify({ data: data }),
  });
};


const updatePayment = (id, note, status) => {
  return FetchHandler({
    url: "user/update-payment-status",
    method: "POST",
    data: JSON.stringify({ trx_id: id, note: note, status: status }),
  });
};


const updateWithdrawal = (id, reason, status) => {
  return FetchHandler({
    url: "user/update-withdrawal-status",
    method: "POST",
    data: JSON.stringify({ trx_id: id,  reasons: reason, status: status }),
  });
};



const fetchVehicles = async (category) => {
  try {

    const response = await fetch(backendUrl + "api_fetch_vehicles.php?category=" + category, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {

      throw new Error(`Request failed with status: ${response.status}`);
    }
  } catch (error) {
   // console.error('derr',error);
    throw error; 
  }
};

const fetchVehicle = async (vhid, currency) => {
  try {

    const response = await fetch(backendUrl + "api_fetch_vehicle.php?vhid=" + vhid+"&currency=" + currency, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {

      throw new Error(`Request failed with status: ${response.status}`);
    }
  } catch (error) {
    //console.error('derr',error);
    throw error; 
  }
};


const sendRentData = async (rentData) => {
  try {

    // Create a query string
    const queryString = Object.entries(rentData)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

    const url = backendUrl + `api_rent_vehicle.php?${queryString}`

    //console.log(url)

    const response = await fetch(url, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {

      throw new Error(`Request failed with status: ${response.status}`);
    }
  } catch (error) {
    //console.error('derr',error);
    throw error; 
  }
};

const fetchRentals = (user_id) => {
  return FetchHandler({
    url: "api_fetch_rental_req.php?id="+user_id, 
    method: "GET",
  });
};

const fetchUserVehicles = (user_id) => {
  return FetchHandler({
    url: "api_fetch_vendor_vehicles.php?id="+user_id, 
    method: "GET",
  });
};


const getUserData = (user_id) => {
  return FetchHandler({
    url: "admin/user_data/"+user_id, 
    method: "GET",
  });
};

const getUserDebits = (user_id) => {
  return FetchHandler({
    url: "admin/user_debits/"+user_id, 
    method: "GET",
  });
};

const getUserCredits = (user_id) => {
  return FetchHandler({
    url: "admin/user_credits/"+user_id, 
    method: "GET",
  });
};


const fetchAccName = (data) => {
  return FetchHandler({
    url: "user/acc-name/"+data,
    method: "GET",
  });
};

const getHistoryFetch = () => {
  return FetchHandler({
    url: "history", /*ticket*/
    method: "GET",
  });
};


const getReferrals = () => {
  return FetchHandler({
    url: "user/referrals", /*ticket*/
    method: "GET",
  });
};



const getPayments = (data) => {
  return FetchHandler({
    url: "user/transfers/"+data,
    method: "GET",
  });
};


const getUserTotalBalance = (user_id, wallet_id) => {
  return FetchHandler({
    url: "admin/user_balance/"+user_id+"/"+wallet_id, 
    method: "GET",
  });
};


const verifyEmail = (email, vcode) => {
  return FetchHandler({
    url: "user/verify/"+email+"/"+vcode, 
    method: "GET",
  });
};




const getAllUsers = () => {
  return FetchHandler({
    url: "admin/all_users", 
    method: "GET",
  });
};


const getMailStatus = (wallet_id) => {
  return FetchHandler({
    url: "user/mail_status/"+wallet_id, 
    method: "GET",
  });
};

const getTotalTranx = () => {
  return FetchHandler({
    url: "admin/total_amount_exchanged", 
    method: "GET",
  }); 
};




module.exports = {
  fetchAccName,
  getAllUsers,
  getMailStatus,
  getTotalTranx,
  loginFetch,
  signupFetch,
  adminLoginFetch,
  registationFetch,
  getHistoryFetch,
  getReferrals,
  profileFetch,
  postPayment,
  postWithdrawal,
  updatePayment,
  updateWithdrawal,
  getPayments,
  fetchVehicles,
  fetchUserVehicles,
  fetchVehicle,
  sendRentData,
  fetchRentals,
  getUserData,
  getUserDebits,
  getUserCredits,
  getUserTotalBalance,
  resetPassword,
  resetEmail,
  updatePassword,
  getCountryCode,
  verifyEmail
};
