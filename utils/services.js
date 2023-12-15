//const { cookieParser } = require("./functions");

const backendUrl = "https://urbanfleet.biz/";


const FetchHandler = (prop) => {
  if (prop.method === "POST") {
    return fetch(backendUrl + prop.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: "" //cookieParser("token"),
      },
      body: prop.data,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .catch((error) => {
        // Handle the error here without crashing
        console.error("Error in POST request:", error.message);
        return { status: "error", message: error.message };
      });
  }

  if (prop.method === "GET") {
    return fetch(backendUrl + prop.url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        // Handle the error here without crashing
        console.error("Error in GET request:", error.message);
        return { status: "error", message: error.message };
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


const toggle_vh = (vh_id) => {
  return FetchHandler({
    url: `includes/vehicle_status_api.php?vhID=${vh_id}`,
    method: "GET",
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

const calc_time_btw = async (origin, destination) => {

  try {

    const response = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=AIzaSyDatXR6EOR5ohxui9mFgmr7qP3Rnb5n2oI`, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();

        const result = data.rows[0].elements[0];
        const distance = result.distance.text;
        const duration = result.duration.text;
        const durationInt = (result.duration.value/60); //in minutes

        return {
          success: true,
          distance,
          durationInt,
          
        };

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

const fetchDSTrips = (user_id) => {
  return FetchHandler({
    url: "ds-trips-api.php?user_id="+user_id, 
    method: "GET",
  });
};


const fetchTicketData = (user_id, tk_id) => {
  return FetchHandler({
    url: "includes/verify_code_api.php?user_id="+user_id+"&tk_id="+tk_id, 
    method: "GET",
  });
};

const fetchUserVehicles = (user_id) => {
  return FetchHandler({
    url: "api_fetch_vendor_vehicles.php?id="+user_id, 
    method: "GET",
  });
};



const fetchUserVehiclesData = (user_id) => {
  return FetchHandler({
    url: "api_fetch_vendor_vehicles_data.php?user_id=37", 
    method: "GET",
  });
};

const getUserData = (user_id) => {
  return FetchHandler({
    url: "admin/user_data/"+user_id, 
    method: "GET",
  });
};



const fetchAccName = (data) => {
  return FetchHandler({
    url: "user/acc-name/"+data,
    method: "GET",
  });
};




module.exports = {
  fetchAccName,
  calc_time_btw,
  loginFetch,
  signupFetch,
  toggle_vh,
  registationFetch,
  profileFetch,
  fetchVehicles,
  fetchUserVehicles,
  fetchUserVehiclesData,
  fetchVehicle,
  sendRentData,
  fetchRentals,
  fetchDSTrips,
  fetchTicketData,
  getUserData,
  resetPassword,
  resetEmail,
  updatePassword,
  getCountryCode,
};
