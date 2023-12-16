import React, {  useEffect, useState } from 'react'
import {  View, StyleSheet, ScrollView, Alert, Modal,  Text, ActivityIndicator, TouchableOpacity, TextInput} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Picker } from '@react-native-picker/picker';
   
import * as Localization from 'expo-localization';

import MapView, { Marker, Polyline } from "react-native-maps";

import {sendRentData, fetchUserVehiclesData, calc_time_btw } from "../utils/services";
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import 'moment-timezone';

import { useNavigation } from '@react-navigation/native'; 

import { useAuth } from '../auth';

import * as Location from "expo-location";


const map_key = 'AIzaSyDatXR6EOR5ohxui9mFgmr7qP3Rnb5n2oI';

 const DSTrip = ({ showModal, setModal }) => {

  const navigation = useNavigation();

  const { user, currency } = useAuth();

  const [err, setErr] = useState('');
  const [pkErr, setPKErr] = useState("");

  const [total_hours_, setTotalHours] = useState("");
  const [day_hours, setDayHours] = useState(10);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());

  const [startDate_, setStartDate_] = useState('0000-00-00');
  const [startTime_, setStartTime_] = useState('00:00');
  
  const [endDate_, setEndDate_] = useState(new Date());

  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);

  const [duration, setDuration] = useState(null);

  const [showToSuggestions, setToSuggestions] = useState(false);
  const [showFromSuggestions, setFromSuggestions] = useState(false);
  const [showPkSuggestions, setPkSuggestions] = useState(false);
 

  const [vehicles, setVehicles] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState(null);


  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);

  const [userTimeZone, setTimeZone] = useState("");

  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);

  const [pkLocation, setPkLocation] = useState(null);

  const [routeCoordinates, setRouteCoordinates] = useState(null);

  const [off_route, setOffRoute] = useState(false);

  const [o_ploc, setOPloc] = useState([]);
  const [or_time_btw, setOrTimeBtw] = useState(0);
  const [or_hrs_btw, setOrHrsBtw] = useState(0);


  const [distance, setDistance] = useState(0);
  const [discount, setDiscount] = useState(0);

  const [discount_text, setDiscountText] = useState("");
  const [discount_info, setDiscountInfo] = useState("");

  const [cost_info, setCostInfo] = useState("");
  
  const [scope, setScope] = useState('one-way');
  const [route_hours, setRouteHours] = useState(0);

  const [fee, setFee] = useState(0);
  const [fee_text, setFeeText] = useState("");

  const [ticket_fee, setCostPerTicket] = useState(0);
  
  const [ds_rate, setDSRate] = useState(2);

  const [seat_cap, setSeatCap] = useState(0);
  const [min_pass, setMinPass] = useState(0);
  const [max_pass, setMaxPass] = useState(0);

  const [max_buffer, setMaxBuffer] = useState(47);
  const [sp_time, setSPTime] = useState("");

  const [vh_id, setVh_id] = useState(0);
  const [cost_fee, setCostFee] = useState(0);
  const [job_fee, setJobFee] = useState(0);
  const [vh_currency, setCurrency] = useState("");

  const [carry_on_bag, setCarryOnBag] = useState(0);
  const [stored_bag, setStoredBag] = useState(0);

  const [day_, setDay_] = useState(0);

  function hoursBetweenTwoTimes(time1, time2) {
    // Parse the time strings
    const [h1, m1, s1, ampm1] = time1.match(/(\d+):(\d+):(\d+) ([APap][Mm])/).slice(1);
    const [h2, m2, s2, ampm2] = time2.match(/(\d+):(\d+):(\d+) ([APap][Mm])/).slice(1);
  
    // Convert hours to 24-hour format
    const hour1 = (ampm1.toLowerCase() === 'pm' ? 12 : 0) + parseInt(h1);
    const hour2 = (ampm2.toLowerCase() === 'pm' ? 12 : 0) + parseInt(h2);
  
    // Calculate the time difference in hours
    const hoursDifference = (hour2 - hour1) + (parseInt(m2) - parseInt(m1)) / 60 + (parseInt(s2) - parseInt(s1)) / 3600;
  
    return hoursDifference;
  }
 

  const handleCloseSuggestions = () => {

    setToSuggestions(false);
    setFromSuggestions(false);
    setPkSuggestions(false)
   
  };

  const handleVehicleSelect = (value) => {

    if(value < 1){

      return
    }

    const selected = vehicles.find(vehicle => vehicle.vh_id === value);
    
    setVh_id(selected.vh_id)
    setJobFee(selected.job_cost)
    setCostFee(selected.price_per_day)

    setSeatCap(selected.passengers)
    setMaxPass(selected.passengers)

    setCurrency(selected.currency)

    setSelectedVehicle(selected);

  };

  useEffect(() => {

    if(userTimeZone.length > 3){

          const dtt = new Date();
        
          const formattedDate = moment(dtt).format('YYYY-MM-DD');
          //setStartDate_(formattedDate);
        
          const formattedTime = moment(dtt).tz(userTimeZone).format('HH:mm');
          //setStartTime_(formattedTime);

    }

  }, [userTimeZone]); 


  useEffect(() => { 

    fetchUserVehiclesData(user.user_id).then((res) => {    

      if(res){

        setVehicles(res)

      }
    
      });

      const origin = 'Ikeja, lagos, Nigeria'
      const destination = 'Dugbe,Ibadan, Nigeria'

      calc_time_btw(origin, destination).then((res) => {    

        if(res){
  
          console.log('dist_btw', res)
  
        }
      
        });

      
        // Get the current time zone
setTimeZone(Localization.timezone); 

console.log('User Time Zone:', userTimeZone);

 
  }, []);

  useEffect(() => {

       console.log(vh_id)

  }, [selectedVehicle]);

  useEffect(() => {

    
    update_timing(false);


}, [o_ploc, startDate_, startTime_]);

useEffect(() => {

  if(or_hrs_btw > 0){

      let pk_err_ = `This pickup location seems off-route\n

      Continuing on this route will extend your expected time of arrival by ${Number(or_hrs_btw.toFixed(1))} hrs`

      setPKErr(pk_err_);

      Alert.alert(
        'WARNING', 
        pk_err_,

        [
          {
            text: 'Undo',
            style: 'cancel', 
            onPress: () => {
              // Your function for the "Cancel" button
              remove_last_ploc()
            },
          },
          {
            text: `That's fine`,
            onPress: () => {
                update_timing(true)
            },
          },
          
        ],
        { cancelable: false }
      );

}

}, [or_hrs_btw]);


 const handleMinPassChange = (value) => {
  setMinPass(value);
}; 

const handleMaxPassChange = (value) => {

  setMaxPass(value);
};




function addMinutesToTime(inputTime, minutesToAdd, src="norm") {

  console.log(inputTime, minutesToAdd, src)

  const inputDate_init = new Date(inputTime);

  const inputDate = new Date(inputTime);

  let time_buffer = minutesToAdd/2
  time_buffer = time_buffer < max_buffer ? time_buffer : max_buffer


 // Add + 30 travel time buffer + 15 loading buffer
 inputDate.setMinutes(inputDate.getMinutes() + minutesToAdd + time_buffer);

 // Create a new Date object for the calculated date
 const newDate = new Date(inputDate);

 // Check if the new date is on the same day as the initial date
 if (newDate.getDate() !== inputDate_init.getDate() && src !== "norm") {

      setDay_(2); // If different days, set day_ to 1

 } else {

     setDay_(0); // If the same day, set day_ to 0
 }

 console.log(inputDate_init, newDate, day_, src)

 // Format the result in the desired format
 const formattedTime = newDate.toLocaleTimeString([], {
   hour: '2-digit',
   minute: '2-digit',
   second: '2-digit',
   hour12: true,
 });

 return formattedTime;
}


function convertTo24HourFormat_bk(timeString) {

  console.log('cv format', timeString)
  let time = new Date("1970-01-01 " + timeString);

  let hours = time.getHours().toString().padStart(2, '0');
  let minutes = time.getMinutes().toString().padStart(2, '0');

  return hours + ":" + minutes;

}

function convertTo24HourFormat(timeString) {

  const parsedTime = moment(timeString, 'h:mm:ss A');

  if (parsedTime.isValid()) {
    // Format the time in 24-hour format
    const formattedTime = parsedTime.format('HH:mm:ss');
    return formattedTime;
  } else {
    console.error('Invalid time string:', timeString);
    // Return a default value or handle the error as needed
    return '';
  }
}

function add_pickup_location(){


  if(fromLocation == null || toLocation == null){

    Alert.alert(`Specify Trip start location`)

    return
}


   let frDate;

    let d_id = o_ploc.length + 1

    let fr_loc = fromLocation?.description;
    let fr_time = startTime_;
    let sp_loc = toLocation?.description;

    
    //console.log(pkLocation,fr_time)
    //return
  
    
    //use pickup location as new start location
    if(o_ploc.length > 0){

        fr_loc = o_ploc[o_ploc.length - 1].location;
        fr_time = convertTo24HourFormat(o_ploc[o_ploc.length - 1].time);

        console.log(fr_loc, fr_time, o_ploc)
        //return
    }
     
    

    if(d_id > 4){

         Alert.alert(`You can only provide 3 pickup locatione per trip`);

            return;
    }


    if(fr_loc <  5){

         Alert.alert(`>Please enter your trip start location.`);
        
         return;
    }
    
    
    if(fr_time.length < 3){

         Alert.alert(`Please enter your trip start time.`)

            return;
    }else{
       
       frDate = startDate_

       fr_time = `${frDate}T${fr_time}`;
    }

   

    let ploc_ = pkLocation;

    let ptime_ = fr_time; //$("#p_time").val();

    console.log(ploc_, ptime_)
    //return


    calc_time_btw(fr_loc, ploc_).then((res) => {    

          if(res && res.durationInt && res.durationInt > 0){

              //console.log('dist_btw', res)
                  
                  let dist_btw = 0; //from pk X to stop location

                  let to_dist_btw = res.distance; //from pk A to pk B

                  let time_btw = parseFloat(res.durationInt); // in mins

                  let min_buffer_ = time_btw / 2

                  min_buffer_ = min_buffer_ < max_buffer ? min_buffer_ : max_buffer //45mins or as set

                  let n_time = "";
                
                  //console.log(to_dist_btw, time_btw, fr_time);

                  if(ploc_.length > 1 && ptime_.length > 0){

                    ptime_ = addMinutesToTime(ptime_, time_btw)

                    n_time = convertTo24HourFormat(ptime_);

                    n_time = `${frDate}T${n_time}`;

                    console.log('cv ptime', ptime_, n_time)

                    ////////////////////////////////////////////////
                    //check for possible off route

                    calc_time_btw(ploc_, sp_loc).then((res) => {    

                      if(res && res.durationInt && res.durationInt > 0){
            
                          //console.log('dist_btw', res)
                          //console.log('or_time_btw', or_time_btw)

                                  dist_btw = res.distance;

                                  setOrTimeBtw(parseFloat(res.durationInt)); // in mins

                                  console.log('n_time2', n_time)
                                  console.log('or_time_btw', res.durationInt)

                                  //time to get to stop location from this pickup location
                                  let sp_time_ = addMinutesToTime(n_time, res.durationInt, 'pk')

                                      console.log(`dist from last pickup to stop location: ${(res.durationInt)} hrs i.e ${res.durationInt} mins >> new stop time is ${sp_time_}` );

                                      setSPTime(sp_time_)

                                      let _dim = {id: d_id, location: ploc_, time: ptime_, min_buffer : min_buffer_, dist_btw: to_dist_btw, min_btw: time_btw, min_to_dest: res.durationInt, dist_to_dest: dist_btw}
                                      
                                      setOPloc(prevOPloc => [...prevOPloc, _dim]);

                                      console.log('pickup locations', o_ploc)

                              }else {

                                console.log('Unable to calculate time and distance.');
                                setOrTimeBtw(0);
                              }

                            })

                      }

                }
          
            });
            
      
     }


function remove_last_ploc(){
  
       if(o_ploc.length > 0){
  
        setOrHrsBtw(0)
        setOrTimeBtw(0)
        setDay_(0)  
        setSPTime("")
  
        o_ploc.pop();
  
        update_fee(false) 

      }
  
  }

function update_timing(off_route = false){ 

  if(fromLocation == null || toLocation == null){

    //Alert.alert(`Specify Trip start location`)

    return
}


  let pk_mins = 0;

  // Iterate through the array and add up the time_buffer values

  for (var i = 0; i < o_ploc.length; i++) {

       pk_mins += parseFloat(o_ploc[i].min_buffer);

       console.log(i, 'min buffer ', o_ploc[i].min_buffer )
  }


  if(off_route){

      update_fee(true)
  }



  const selectedDateTime = new Date(`${startDate_}T${startTime_}`);

   const now = new Date();


 if (selectedDateTime < now) {

     Alert.alert("Please Select a future Time."+startDate_+" "+startTime_);
     return;
    
  }

 
var start_time_ = startDate_+" "+startTime_+":00";

var start_datetime = new Date (Date.parse(start_time_)); 


var end_time = start_time_;

var end_datetime = new Date (Date.parse(end_time)); 

console.log("end date: "+end_time);

var init_datetime = moment(start_datetime).format('dddd, MMMM D, YYYY [at] h:mm:ss A');


let no_of_days = days

let job_hours = (route_hours > 10)  ? route_hours : day_hours
  job_hours = (route_hours < 10)  ? route_hours : job_hours
   
   //if return on same day, double mileage hours if it exceeds day_hours
  if( no_of_days < 2 && trip_mode == "return_trip" && (route_hours * 2) > day_hours ){
      job_hours = (route_hours * 2)
  }

let hoursToAdd = 0;
let minutesToAdd = 0;

if(pk_mins > 0){

   hoursToAdd = Math.floor(pk_mins / 60); // Get whole hours
   minutesToAdd = pk_mins % 60; // Get remaining minutes
}

if(off_route && or_hrs_btw > 0){

    hoursToAdd += or_hrs_btw; // Get whole hours
    //minutesToAdd = pk_mins % 60; // Get remaining minutes

   console.log('hours to add: ', or_hrs_btw, or_time_btw)

}

end_datetime.setHours(end_datetime.getHours() + job_hours + (added_days * 24) + hoursToAdd);
end_datetime.setMinutes(end_datetime.getMinutes() + minutesToAdd);

let init_end_date = end_datetime;



end_datetime = moment(end_datetime).format('dddd, MMMM D, YYYY [at] h:mm A');



let end_time_only = init_end_date.toLocaleString('en-US', {

  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: true

});


setStartDateTime(init_datetime);
setEndDateTime(end_datetime);


var info = `Expected time of arrival ${end_datetime}`;

//Alert.alert(info);

if(sp_time !== "" && !off_route){
      
     console.log('init end_dt ', end_time_only, 'new end dt ', sp_time, "day_ ", day_)

     let hrs_from_pk = hoursBetweenTwoTimes(end_time_only, sp_time)

     if( (hrs_from_pk < 0 && day_ > 0) || (hrs_from_pk > 2) ){

         //let min_btw = or_time_btw / 60;
         const hrs_btw = hrs_from_pk > 2 ? hrs_from_pk : hrs_from_pk + 24
         setOrHrsBtw(hrs_btw);


     }else{
            
            setOrTimeBtw(0);
            setSPTime("")

            setPKErr("")

     }


}



}


function update_fee (off_route = false) {

    console.log("updating fee", off_route)

    let pk_mins = 0;
    let pk_dist = 0;

    let tr_distance = 0

    if(off_route){


                for (var i = 0; i < o_ploc.length; i++) {

                     pk_mins += parseFloat(o_ploc[i].min_btw);

                     let dd_btw = o_ploc[i].dist_btw;

                     let numericPart = dd_btw.replace(/[^\d.-]/g, '');
                     let numericValue = parseFloat(numericPart);

                     pk_dist += numericValue;

                     if(i == (o_ploc.length-1) ){
                          
                          pk_mins += parseFloat(o_ploc[i].min_to_dest);

                          let dd_btw2 = o_ploc[i].dist_to_dest;
                          let numericPart2 = dd_btw2.replace(/[^\d.-]/g, '');
                          let numericValue2 = parseFloat(numericPart2);

                          pk_dist += numericValue2;

                          console.log('added min & dist to dest ', o_ploc[i].min_to_dest, dd_btw2)

                     }

                     console.log(i, dd_btw, pk_dist)
                }
    }

     let pk_hrs = pk_mins / 60; //in hours

     tr_distance = pk_dist > parseInt(distance, 10) ? pk_dist : parseInt(distance, 10); 

     console.log('tr_distance',tr_distance)


     if(toLocation.length < 3 || fromLocation.length < 3){

        return;
     }


      if(max_pass < 1){

         setMaxPass(seat_cap)

      }

       if(min_pass < 1){

          setMinPass(1)

      }

      if( parseInt(max_pass) > parseInt(seat_cap) ){        

         Alert.alert('Maximum number of passenger cannot exceed Vehicle seating capacity.'); 

         setMaxPass(seat_cap)
        
      }

      else if(min_pass > seat_cap){        

          setMaxPass(seat_cap)
        
      }

       else if(min_pass > max_pass){        

          setMaxPass(min_pass)
        
      }else{

          //
      }


    //console.log('route hours', route_hours)

    let break_down = "";
    let break_down_invoice = "";

    let fee_per_km = cost_fee/3; 

    let added_fee = 0; 

    let total_hours = pk_hrs > route_hours ? pk_hrs : route_hours ; 

    setTotalHours(total_hours)

    let no_of_trips = 1;  let no_of_days = 1; 

    let no_of_extra_hours = 0; 
    
    let no_of_hours = 0;  

    let cost_of_job = cost_fee

    const daily_rental_fee = parseFloat(job_fee) + parseFloat(cost_of_job)

    let divs = 1.5; //divident for hourly rental fee calculation

    let fee_ = 0; added_days = 0;

    no_of_extra_hours = (total_hours > 10) ? day_hours - total_hours : 0

    let extra_mileage_fee = 0

     console.log(total_hours+' hrs');

     trip_mode = 'one_way'; //'return_trip'; 
      
     let return_rate = 70

    let extra_hours_ = 0 

    let extra_hour_fee = 0;

    let to_fro_percent = ( (100+parseFloat(return_rate)) / 100 )


    let cost = cost_fee+job_fee

    let cost_fee_ = cost_fee
    let job_fee_ = job_fee

    //console.log('cost', cost)

    //////////////////
    //for cost breakdown usage
  
    let fee_mult = 1 // fee multiplier


    if(parseInt(fee_) > 0){

        cost =  parseInt(fee_)

        cost_fee_ = Math.ceil( (cost_fee /day_hours) * ds_rate * no_of_hours);
        job_fee_ = Math.ceil( (cost_of_job /day_hours) * ds_rate * no_of_hours);


    }else{

        cost = (daily_rental_fee)
        cost_fee_ = (job_fee ) 
        job_fee_ = (cost_of_job)

            //if distance > 350km add multiply fee by amount 0f 350km in distance

            if(tr_distance > 350 ){

                 fee_mult = Math.ceil(tr_distance / 350)

                 cost = (fee_mult * cost)

                 ///////////////
                 cost_fee_ = (fee * fee_mult)
                 job_fee_ = (cost_of_job * fee_mult)


            }

            cost_fee_ = parseInt(cost_fee)
            job_fee_ = parseInt(job_fee)


    }


    
    let other_days_mult = 0;
    let extra_mileage_divisor = 70;

      //extra mileage fee
    if(tr_distance > 100){

        extra_mileage_fee =  Math.round ( fee_per_km*((tr_distance-100)/extra_mileage_divisor)) //no_of_days )

    }
    
    //console.log('xtra mileage fee', extra_mileage_fee)
    //console.log('day hours', day_hours)

    //not used in the computation
    if(total_hours < 1){

        total_hours = (day_hours + parseInt(no_of_extra_hours)) * no_of_days;

    }


     let added_trip_fee = 0
   
    /////////////////////

      fee_total = cost
     
      fee_total += (added_trip_fee + extra_mileage_fee);


        if(total_hours < 8){

          fee_total = parseInt((fee_total / 8) * total_hours * ds_rate);

      }

      
      console.log('fee total', fee_total)


      let cost_per_ticket = parseInt(fee_total / (seat_cap-1)) //e.g 8000 / seat capacity

      const full_load_fee = parseInt( cost_per_ticket * seat_cap)
      
      fee_total = parseInt( cost_per_ticket * max_pass) // * number of seats available


          if(!off_route){ //if not off route updated (6/11/2023)

              update_timing();

          }
       
        var init_cost = parseInt((cost_fee / (seat_cap-1)) * max_pass);
        var init_cost_of_job = parseInt((job_fee / (seat_cap-1)) * max_pass);


        if(total_hours < 8){ //less than day hours

          //fee_total = (fee_total / 8) * route_hours * ds_rate;

            init_cost = parseInt( (( (cost_fee / 8)* total_hours * ds_rate) / (seat_cap-1)) * max_pass);
            init_cost_of_job = parseInt((( (job_fee / 8)* total_hours * ds_rate) / (seat_cap-1))  * max_pass);

      }

        var init_mileage_cost = 0;
        var init_km = 0;

//console.log('tr_dist', tr_distance)
        let appendage = "";

    init_mileage_cost = fee_total - (init_cost + init_cost_of_job )

   
     var days_text = '';

     if(no_of_hours > 0  && tr_distance < 100){

          break_down += `No. of hours: ${no_of_hours}\n`;

     }else{

          days_text += `\nNo. of days: ${no_of_days}\n`;
 
     }


     break_down_invoice = break_down

     break_down += days_text;

     let discount_text = "";



 let _discount = 0;

 let discounted_fee = 0;

let plat_fee = 0;
let exp_rev = 0;


    if(parseFloat(discount) > 0){

            _discount = parseFloat(discount);

            if(_discount > 50){

                     Alert.alert(_discount +"% exceeds the discount allowed for destination services.Please enter an amount lesser than 50.");

                     setDiscount(0);
 
            }else{

                    init_cost = (1 - (_discount / 100)) * init_cost;
                    init_cost_of_job = (1 - (_discount / 100)) * init_cost_of_job;

                 appendage = `\nRental Cost: ${vh_currency} ${init_cost.toLocaleString()}\nCost of Job: ${vh_currency} ${init_cost_of_job.toLocaleString()}`;


                 discounted_fee = (1 - (_discount / 100)) * fee_total;

                 init_mileage_cost = discounted_fee - (init_cost + init_cost_of_job )

                 cost_per_ticket = ( (1 - (_discount / 100)) *cost_per_ticket);

                 plat_fee = Math.ceil(18/100 * discounted_fee);

                 exp_rev = discounted_fee - plat_fee;

                if(init_mileage_cost > 0.0001){

                      appendage += `\nExtra Mileage Cost: ${vh_currency} ${init_mileage_cost.toLocaleString()}`;

                    } 

                appendage += `\n\nCost per Ticket: ${vh_currency} ${cost_per_ticket.toLocaleString()}`;

                appendage += `\nMax Passengers:  ${max_pass.toLocaleString()}`;

                 discount_text = `Platform: marketing & maintenance: 18%\nExpected Revenue: ${vh_currency} ${exp_rev.toLocaleString()} \nDiscount: ${_discount.toLocaleString()} %`;

            }
    

    }else {

      //setDiscount(0)

          appendage = `\nRental Cost: ${vh_currency} ${init_cost.toLocaleString()}\nCost of Job: ${vh_currency} ${init_cost_of_job.toLocaleString()}`;

            if(init_mileage_cost > 0){

              appendage += `\nExtra Mileage Cost: ${vh_currency} ${init_mileage_cost.toLocaleString()}`;

            } 


      plat_fee = Math.ceil(18/100 * fee_total);

       exp_rev = fee_total - plat_fee;

     

      appendage += `\n\nCost per Ticket: ${vh_currency} ${cost_per_ticket.toLocaleString()}`;

       appendage += `\nMax Passengers: ${max_pass.toLocaleString()}`;

        discount_text += `Platform: marketing & maintenance: 18%`;

      discount_text += `\nExpected Revenue: ${vh_currency} ${exp_rev.toLocaleString()} `;
      

    }
    
  
   
 discount_text += `\n\nActual Revenue will depend on the number of ticket sold.`;
  
 appendage +="\n";


    break_down += appendage;

    break_down_invoice += appendage;


    var fee_formated = `${fee_total.toLocaleString()}.00`;

    if(discounted_fee > 0){

         fee_total = discounted_fee.toFixed(2)

         discounted_fee = discounted_fee.toLocaleString(undefined, {minimumFractionDigits: 2});

         setDiscountText(`${discount}|${discounted_fee}`);

         fee_formated = discounted_fee;

         setDiscountInfo(discount_text);
 
    } else{

         setDiscountText('');

    }

    setDiscountInfo(discount_text);

    cost_per_ticket = Math.ceil(cost_per_ticket)

    setDays(no_of_days);

    setCostInfo(break_down_invoice); 

     console.log('cpt', cost_per_ticket); 
  
     setFee(fee_total);
     setFeeText(fee_formated);
     setCostPerTicket(cost_per_ticket)

}


  function getHours(durationString) {

    if(durationString == null || durationString == undefined){

      return false
    }

    const parts = durationString.split(' ');
    //let days = 0;
    let hours = 0;
    let minutes = 0;
  
    // Loop through the parts and extract hours and minutes
    for (let i = 0; i < parts.length; i += 2) {
      const value = parseInt(parts[i], 10); 
      const unit = parts[i + 1]; 
  
      if (unit === 'hours' || unit === 'hour' ) {
        hours += value;
      } else if (unit === 'mins') {
        minutes += value;
      }
    }
  
    // Convert minutes to hours (1 hour = 60 minutes)
    hours += Math.floor(minutes / 60);
  
    return hours;
  }



  const createDS = async () => {
      
       if(fee > 0 && ticket_fee > 0 && vh_id > 0){

          const formData = new FormData();

          console.log('startdatetime', startDateTime)
          //return;

    
          formData.append('user_id', user.user_id); //
          formData.append('fee_total', fee); //
          formData.append('breakdown_val', cost_info); //
          
          formData.append('from_location', fromLocation.description); //
          formData.append('to_location', toLocation.description); //

          formData.append('vehicle_id', vh_id); //
    
          formData.append('currency_code', vh_currency); //
    
          formData.append('start_datetime', startDateTime);  //
          formData.append('end_datetime', endDateTime); //

          const stt_date = startDate_+' '+startTime_
          formData.append('start_date', stt_date);//

          formData.append('description', '');//
    
          formData.append('min_pass', min_pass);
          formData.append('max_pass', max_pass); //
    
          formData.append('c_bag', carry_on_bag);//
          formData.append('s_bag', stored_bag);//

          const route_state = fromLocation.state+"|"+toLocation.state
          formData.append('route_state', route_state);//
    
          formData.append('discounted_fee', discount_text);//
    
          formData.append('platform_fee', 0);//
    
          formData.append('cost_per_ticket', ticket_fee); //
          formData.append('pickup_loc',JSON.stringify(o_ploc)); //
        
          try{  
            
            const response = await fetch('https://urbanfleet.biz/includes/ds_io_api.php', {
              method: 'POST',
              headers: {
                'Content-Type': 'multipart/form-data',
              },
              body: formData,
            });
        
            const responseText = await response.text(); // Log the raw response text
            console.log('Raw response:', responseText);
        
             const data = JSON.parse(responseText);

             console.log('js response:', data)

             if(data.success && data.success == true){
                 
                 Alert.alert('Done!', 'Your DS trip has been succesfully scheduled.' )

                 setOPloc([])
                 setFee(0)
                 setCostPerTicket(0)

                 setModal(false);
             }
    
          } catch (error) {
             console.error('Error uploading image:', error);
          }
    
    
  
       }else{
         
          Alert.alert(
            'Review form',
            'You might have ommited some information your rent form. please update and retry.',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false }
          );
          
       }
};
  
  const handleStartDateChange = (event, selectedDate) => {

    if (selectedDate) {

      const formattedDate = moment(selectedDate).format('YYYY-MM-DD');

      setStartDate_(formattedDate);
      setStartDate(selectedDate);
      console.log(formattedDate)

    }
  };


  const handleStartTimeChange = (event, selectedTime) => {

    if (selectedTime) {

        console.log('selected time ', selectedTime)
        
        const formattedTime = moment(selectedTime).tz(userTimeZone).format('HH:mm');

        setStartTime(selectedTime);
        setStartTime_(formattedTime);

        console.log('formatted time ', formattedTime)


    }
};

  const toggleModal = () => {
    setModal(!showModal);
  };


    useEffect(() => {
        const getLocation = async () => {

          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            console.log("Permission to access location was denied");
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setCurrentLocation(location.coords);
    
          setInitialRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
        };
    
        getLocation();
      }, []);

     
    
      const onLocationSelect = (data, details, source) => {

        if (data && details) {

            //console.log(data, details)

             const description = data["description"];
             const placeId = data["place_id"];

             const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${map_key}`;

              fetch(placeDetailsUrl)
                .then(response => response.json())
                .then(data => {
                  if (data.status === "OK" && data.result && data.result.geometry && data.result.geometry.location) {

                    const country = data.result.address_components.find(component => component.types.includes('country'))?.long_name || '';
                    const state = data.result.address_components.find(component => component.types.includes('administrative_area_level_1'))?.long_name || '';
                    const locality = data.result.address_components.find(component => component.types.includes('locality'))?.long_name || '';
              
                    //console.log('Country:', country);
                    //console.log('State:', state);
                    //console.log('Locality:', locality);
                     
                     const latitude = data.result.geometry.location.lat;
                     const longitude = data.result.geometry.location.lng;

                     const initialPlaceData = {
                      description: description,
                      place_id: placeId,
                      latitude: latitude,
                      longitude: longitude,
                      state: state
                    };


                   if(source === "from"){

                       setFromLocation(initialPlaceData);

                   }else if(source === "to"){

                      setToLocation(initialPlaceData);

                }else{

                        setPkLocation(initialPlaceData.description);
                   }
                    
                  } else {

                    console.error("Error getting place details");
                  }

                })
                .catch(error => {

                  console.error("Error fetching place details:", error);
                });

          
          } else {
            console.error("Error selecting location. Data and details are missing.");
          }
        
           
      };


      function decodePolyline(encoded) {
        const poly = [];
        let index = 0;
        let lat = 0;
        let lng = 0;
      
        while (index < encoded.length) {
          let b;
          let shift = 0;
          let result = 0;
      
          do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
          } while (b >= 0x20);
      
          lat += (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      
          shift = 0;
          result = 0;
      
          do {
            b = encoded.charCodeAt(index++) - 63;
            result |= (b & 0x1f) << shift;
            shift += 5;
          } while (b >= 0x20);
      
          lng += (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      
          const latitude = lat * 1e-5;
          const longitude = lng * 1e-5;
      
          poly.push({ latitude, longitude });
        }
      
        return poly;
      }
   
      const handleCancel = (id) => {
        // Filter out the item with the given id
        const updatedOPloc = o_ploc.filter(item => item.id !== id);
        setOPloc(updatedOPloc);

      };
    

  const calculateDistanceAndTime = () => {

    if (fromLocation !== null && toLocation !== null && fromLocation !== undefined && toLocation !== undefined ) {

      const api_url = `https://maps.googleapis.com/maps/api/directions/json?origin=place_id:${fromLocation.place_id}&destination=place_id:${toLocation.place_id}&key=${map_key}`

      fetch(api_url)
      .then(response => response.json())
      .then(data => {;

        const encodedPolyline = data.routes[0].overview_polyline.points;

      // Decode the polyline data into an array of coordinates
      const routeCoordinates = decodePolyline(encodedPolyline);

      setRouteCoordinates(routeCoordinates)

        const distance_ = data.routes[0].legs[0].distance.text;
        const duration_ = data.routes[0].legs[0].duration.text;

        setDistance(distance_)
        setDuration(duration_)

        let hrs = Math.ceil(getHours(duration_))

       hrs = (hrs < 2) ? (hrs + 1) : (hrs + 2); //2;

        setRouteHours( hrs )

      })
      .catch(error => {
        console.error('Error:', error);
      });

    }else{

     // console.log('provide to and fro location')
    }
  };


    
 

     useEffect(() => { 

      calculateDistanceAndTime()
    
    }, [toLocation, fromLocation]);


    useEffect(() => { 

      if(pkLocation !== null){

           add_pickup_location()
      }
    
    }, [pkLocation]);


    useEffect(() => { 

    
     if( (discount > 0 || min_pass > 0 || max_pass > 0) && vh_id > 0 && seat_cap > 0 && distance.length > 2 && route_hours > 0 && fromLocation !== null && toLocation !==null  ){
      
         update_fee(false)
  
    }else{

       console.log('fee not computed', distance, route_hours, seat_cap, vh_id)
    }
    
    }, [route_hours, vh_id, distance, fromLocation, toLocation, min_pass, max_pass, min_pass, discount]);


    // useEffect to update mapRegion when routeCoordinates change
    useEffect(() => {

      if (routeCoordinates && routeCoordinates.length > 0) {
        // Calculate the bounds and set the mapRegion accordingly
        let minLat = Number.MAX_VALUE;
        let maxLat = Number.MIN_VALUE;
        let minLng = Number.MAX_VALUE;
        let maxLng = Number.MIN_VALUE;
  
        routeCoordinates.forEach(coord => {
          minLat = Math.min(minLat, coord.latitude);
          maxLat = Math.max(maxLat, coord.latitude);
          minLng = Math.min(minLng, coord.longitude);
          maxLng = Math.max(maxLng, coord.longitude);
        });
  
        const centerLat = (minLat + maxLat) / 2;
        const centerLng = (minLng + maxLng) / 2;
  
        const padding = 0.6; 
        const spanLat = (maxLat - minLat) + padding;
        const spanLng = (maxLng - minLng) + padding;
  
        const newMapRegion = {
          latitude: centerLat,
          longitude: centerLng,
          latitudeDelta: spanLat,
          longitudeDelta: spanLng,
        };

        //console.log(newMapRegion)
  
        setInitialRegion(newMapRegion);
        //setFromLocation(newMapRegion);
      }
    }, [routeCoordinates]);
  
 

  return(

                       <Modal
                            transparent={true}
                            visible={showModal}
                            animationType="slide"
                            onRequestClose={toggleModal}
                        >
                            <View style={styles.modalContainer}>
      
                            <View style={styles.modalHeader}>

                            <Text style={{padding:12, fontWeight: 800, fontSize: 20}}>New Destination Trip </Text>

                                <TouchableOpacity onPress={toggleModal} style={{padding:12}}>
                                <Icon name="times" size={20} color="black" />
                                </TouchableOpacity>

                               

                            </View>

                            <View style={styles.modalContent}>

                                <View >
                                  
                                {!initialRegion &&
          
                              (
                                <ActivityIndicator style={{padding:100}} size="large" color="#0000ff" />
                              )
                              }
                                 {initialRegion && (
                                    <MapView style={styles.map} region={initialRegion}>
          

          {fromLocation !== null  && fromLocation !== undefined &&  (
            <Marker
              coordinate={{
                latitude: fromLocation.latitude,
                longitude: fromLocation.longitude,
              }}
              title="From Location"
            >
               <Icon name="map-marker" size={21} color="red" />
               </Marker>
          )}
          {toLocation !== null && toLocation !== undefined && (
            <Marker
              coordinate={{
                latitude: toLocation.latitude,
                longitude: toLocation.longitude,
              }}
              title="To Location"
              >
                 <Icon name="map-marker" size={21} color="red" />

              </Marker>
          
          )}

{routeCoordinates && routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeWidth={3}
            strokeColor="blue"
          />
        )}
                                    </MapView>
                                )}
                                </View>
 <ScrollView >

 <View style={{ marginVertical: 0, flex: 1, flexDirection: 'col', paddingVertical: 0, marginBottom: 10}}>


<Text style={{margin: 5}}>Select Vehicle</Text>

<Picker style={{marginHorizontal:30}}
        selectedValue={selectedVehicle ? selectedVehicle.vh_id : null}
        onValueChange={(itemValue) => handleVehicleSelect(itemValue)}
      >
        <Picker.Item key={0} label={`Select a Vehicle`} value={0} />
        {vehicles && vehicles.map(vehicle => (
          <Picker.Item key={vehicle.vh_id} label={vehicle.vh_title} value={vehicle.vh_id} />
        ))}
      </Picker>


<TouchableOpacity onPress={() => setFromSuggestions(true)}  style={{margin: 5}}>

<Text style={{margin: 5}}>start location</Text>

    <Text style={styles.input}>{fromLocation && (fromLocation.description)}{!fromLocation && ('Start Location')}
    </Text>
 </TouchableOpacity>

 <TouchableOpacity  onPress={() => setToSuggestions(true)} style={{margin: 5}}>

<Text style={{margin: 5}}>stop location</Text>
    <Text style={styles.input}>{toLocation && (toLocation.description)}{!toLocation && ('Stop Location')}
    </Text>
 </TouchableOpacity>

</View> 




<View style={{ flex: 1, flexDirection: 'row', paddingVertical: 0, marginVertical:0}}>

<View style={{flex: 0, paddingHorizontal: 2, paddingVertical:3,  justifyContent:"space-between", flexDirection: 'row', marginBottom: 20}} >
  <View>
 <Text style={{padding:12}}>StartDate</Text>
 <DateTimePicker
   value={startDate}
   mode="date"
   display="calendar"
   onChange={handleStartDateChange}
   is24Hour={true}
   textColor="black"
 />
 </View> 

 <View>
 <Text style={{padding:12, textAlign: 'right'}}>Start Time</Text>
  <DateTimePicker
    value={startTime}
    mode="time"
    display="clock"
    onChange={handleStartTimeChange}
    is24Hour={true}
    textColor="black"
  /> 
 </View>
 </View>

</View> 

<View style={styles2.container}>
      <View>
        
          <Text style={{margin: 5}}>seat capacity</Text>
      
          <TextInput
            style={styles.num_input}
            value={seat_cap}
            editable={false}
            placeholder="Seating Capacity"
          />
      </View>

      <View>
        
          <Text style={{margin: 5}}>min. passenger</Text>
      

      <TextInput
        style={styles.num_input}
        value={min_pass}
        onChangeText={handleMinPassChange}
        keyboardType="numeric"
        placeholder="Min Passengers"
      />

      </View>
      <View>
        
        <Text style={{margin: 5}}>max. passenger</Text>
    
      <TextInput
        style={styles.num_input}
        value={max_pass}
        onChangeText={handleMaxPassChange}
        keyboardType="numeric"
        placeholder="Max Passengers"
      />
      </View>
    </View>

    <View style={[styles2.container, { marginTop: 8, justifyContent:'flex-start' }]}>
  
      <View>
        
          <Text style={{margin: 5}}>carry-on bag(s)</Text>
      
      <TextInput
        style={styles.num_input}
        value={carry_on_bag}
        onChangeText={(num) => setCarryOnBag(num)}
        keyboardType="numeric"
      />

      </View>
      <View>
        
        <Text style={{margin: 5}}>Stored bags</Text>
    
      <TextInput
        style={styles.num_input}
        value={stored_bag}
        onChangeText={(num) => setStoredBag(num)}
        keyboardType="numeric"
      />
      </View>

      <View>
        
        <Text style={{margin: 5}}>apply discount</Text>
    
      <TextInput
        style={styles.num_input}
        value={discount}
        onChangeText={(num) => setDiscount(num)}
        keyboardType="numeric"
      />
      </View>

    </View>

    <View>
    <TouchableOpacity  onPress={() => setPkSuggestions(true)} style={[{margin: 5} ]}>

    <Text style={{margin: 5}}><Icon name='plus' size={24} color="black" /> add a pickup location</Text>
          
      </TouchableOpacity>

    </View>


    <View>
      {o_ploc.map((item) => (

        <View key={item.id+Math.random(500)+Math.random(200)} style={styles_ploc.box}>
          <Text style={{color:'white', fontWeight:'800', width:'90%'}}>{item.location} | {item.time}</Text>

          <TouchableOpacity onPress={() => handleCancel(item.id)} style={styles_ploc.cancelButton}>
            <Icon name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>

      ))}
    </View>


<View style={{marginVertical:50}}>
  
<Text style={{marginHorizontal:12, fontSize: 20, fontWeight:800}}>Trip info</Text>

<Text style={styles.info_input}>

  {duration ? `Route Hours: ${duration}` : null}{`\n`}{distance !== null && duration !== null ? `Distance: ${distance}` : null}

</Text>

{job_fee > 0 && cost_info && (

    <Text style={styles.info_input}>

    {`${cost_info}`}

    </Text>
    
  )} 

{discount_info  && (

<Text style={styles.info_input}>

{`${discount_info}`}

</Text>

)} 

</View>

</ScrollView>



      {ticket_fee > 0 && (
        <View style={{marginTop: 10}}>

          <View style={{marginLeft: 15}}>
          <Text style={{fontSize:15}}>Total Fee:</Text>
          <Text style={{fontSize:21, fontWeight:800}}>{vh_currency} {fee_text}</Text>
          </View>

          <View style={{marginLeft: 15, marginTop: 14}}>
          <Text style={{fontSize:15}}>Cost Per Ticket:</Text>
          <Text style={{fontSize:21, fontWeight:800}}>{vh_currency} {ticket_fee.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
          </View>

        <TouchableOpacity
          style={styles.calculateButton}
          onPress={createDS}
        >
          
          <Text style={{textAlign:'center', color:'white'}}>Schedule Destination Service</Text>
        </TouchableOpacity>
        </View>

      )}
    


                            </View>

                            </View>


                            <Modal visible={showPkSuggestions} animationType="slide">

<TouchableOpacity onPress={() => handleCloseSuggestions()}  style={{marginTop: 45, padding: 12}}>
    <Text>Save & Close</Text>
  </TouchableOpacity>
   
   <View style={styles.loc_modal}>
       <GooglePlacesAutocomplete
              placeholder="Pickup Location"
              onPress={(data, details) => onLocationSelect(data, details, 'pickup')}
              query={{
                key: map_key,
                language: "en",
                fields: "formatted_address",
              }}
              textInputProps={{
                placeholderTextColor: 'gray',
              }}
              styles={{
              
                textInput: {
                  fontSize: 16,
                  backgroundColor: 'white',
                  margin: 7,
                  borderColor:'grey',
                  borderWidth:2,
                },
                description: {
                  color: 'green',
                },
              }}

            />
   </View>

</Modal>

  <Modal visible={showToSuggestions} animationType="slide">

<TouchableOpacity onPress={() => handleCloseSuggestions()}  style={{marginTop: 45, padding: 12}}>
    <Text>Close</Text>
  </TouchableOpacity>
   
   <View style={styles.loc_modal}>
       <GooglePlacesAutocomplete
              placeholder="To Location"
              onPress={(data, details) => onLocationSelect(data, details, 'to')}
              query={{
                key: map_key,
                language: "en",
                fields: "formatted_address",
              }}
              textInputProps={{
                placeholderTextColor: 'gray',
              }}
              styles={{
              
                textInput: {
                  fontSize: 16,
                  backgroundColor: 'white',
                  margin: 7,
                  borderColor:'grey',
                  borderWidth:2,
                },
                description: {
                  color: 'green',
                },
              }}

            />
   </View>

</Modal>

<Modal visible={showFromSuggestions} animationType="slide" >

<TouchableOpacity onPress={() => handleCloseSuggestions()}  style={{marginTop: 45, padding: 12}}>
    <Text>Close</Text>
  </TouchableOpacity>
   
   <View  style={styles.loc_modal}>
       <GooglePlacesAutocomplete
              placeholder="From Location"
              onPress={(data, details) => onLocationSelect(data, details, 'from')}
              query={{
                key: map_key,
                language: "en",
                fields: "formatted_address",
              }}
              textInputProps={{
                placeholderTextColor: 'gray',
              }}
              styles={{
              
                textInput: {
                  fontSize: 16,
                  backgroundColor: 'white',
                  margin: 7,
                  borderColor:'grey',
                  borderWidth:2,
                },
                description: {
                  color: 'green',
                },
              }}

            />
   </View>

</Modal>


                        </Modal>  

  )
}



const styles_ploc = StyleSheet.create({
  box: {
    backgroundColor: 'green',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'red',
    borderRadius: 50,
    padding: 5,
  },
});

const styles = StyleSheet.create({

  loc_modal:{

     zIndex: 1000,
     flex: 1,
     
  },


  loc_wrapper:{
      
      flex:1,
      //width: '100%',
      //flexDirection: 'col'
  },

  input_container:{
      flex: 1,
      paddingHorizontal: 12,
      flexDirection: 'row',
      justifyContent: 'space-between'
  },

    rent_btn:{
        marginVertical: 14,
        padding: 8,
        borderRadius: 14,
        borderColor: 'red',
        borderWidth: 3,
        textAlign:'center',
        width: 100
    },

    title:{
        marginVertical: 7,
        fontSize: 21,
        fontWeight: 'bold'
    },

  vh_container: {
    paddingVertical: 36,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  wrapper:{
    flex: 1,
    //flexDirection:'col'
  },
  container: {
    //backgroundColor: 'lightgreen',
    alignItems: 'center'
  },
  modalContainer: {
    flex: 1,
    flexDirection:'col',
    justifyContent:'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.98)', // Background color of the modal
    paddingVertical: 24,
    zIndex: 1000,
    
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 3,
  },
  modalContent: {
    flex: 1,
    flexDirection:'col',
    justifyContent: 'flex-start',
    alignContent:'flex-start'
  },
  
map: {
    width: "100%",
    height: 200, 
  },

  calculateButton: {
    borderWidth: 2,
    borderColor: 'green',
    backgroundColor:'green',
    padding: 10,
    margin: 10,
    borderRadius: 15,
  },
  input:{

    fontSize: 16,
    //backgroundColor: '#fcfa6d',
    marginHorizontal: 7,
    padding: 7,
    borderRadius: 12,
    borderWidth: 1

  },

  num_input:{
    flex: 1,
    fontSize: 16,
    //backgroundColor: '#fcfa6d',
    marginHorizontal: 7,
    padding: 7,
    borderRadius: 12,
    borderWidth: 1,
    width: 110

  },


  info_input:{

    fontSize: 16,
    //backgroundColor: '#fcfa6d',
    marginHorizontal: 7,
    padding: 7,
    fontWeight: 800,

  },


}) 


const styles2 = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 5,
    paddingHorizontal: 10,
  },
});

 
export default DSTrip