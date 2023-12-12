import React, {  useEffect, useState } from 'react'
import { View, SafeAreaView, StyleSheet, ScrollView, Alert, Modal, Dimensions,Image, Text, ActivityIndicator, TouchableOpacity,} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import VRHeader from "../components/vh_search_header";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import MapView, { Marker, Polyline } from "react-native-maps";

import { useRoute } from '@react-navigation/native';
import { fetchVehicle, sendRentData } from "../utils/services";
import Rating from '../components/star-rating';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native'; 

import { useAuth } from '../auth';

import * as Location from "expo-location";


const map_key = 'AIzaSyDatXR6EOR5ohxui9mFgmr7qP3Rnb5n2oI';

 const Vehicle = () => {

  const navigation = useNavigation();

  const { user, currency } = useAuth();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());

  const [startDate_, setStartDate_] = useState(new Date());
  const [endDate_, setEndDate_] = useState(new Date());

  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [fee, setFee] = useState(0);

  const [cost_fee, setCostFee] = useState(0);
  const [job_fee, setJobFee] = useState(0);

  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);


  const [showToSuggestions, setToSuggestions] = useState(false);
  const [showFromSuggestions, setFromSuggestions] = useState(false);
 

  const [vehicle, setVehicle] = useState(false)

  const [isModalVisible, setModalVisible] = useState(false);

  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);

  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);

  const [routeCoordinates, setRouteCoordinates] = useState(null);

 

  const handleCloseSuggestions = () => {
    setToSuggestions(false);
    setFromSuggestions(false);
   
  };


  function getHours(durationString) {
    // Split the string into parts using space as a delimiter

    if(durationString == null || durationString == undefined){

      return false
    }

    const parts = durationString.split(' ');
  
    // Initialize variables to store hours and minutes
    let hours = 0;
    let minutes = 0;
  
    // Loop through the parts and extract hours and minutes
    for (let i = 0; i < parts.length; i += 2) {
      const value = parseInt(parts[i], 10); // Parse the integer value
      const unit = parts[i + 1]; // Get the unit (hours or mins)
  
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

  
  const rentVehicle = () => {
      
       if(fee > 0){

        const rentData = {

          fee: fee, 
          startDateTime: startDateTime, 
          endDateTime: endDateTime, 

          startDate: startDate_, 
          endDate: endDate_, 

          fromLocation: fromLocation.description,
          toLocation: toLocation.description, 

          vhid: vehicle.id,

          no_of_days : days,
          no_of_hours : hours,

          distance: distance,

          userEmail: user.login,
          currency: currency,
          phone: user.your_phone
      
          };

        
          sendRentData(rentData).then((res) => {
      
            if(res.status){

              console.log(res)

              setModalVisible(!isModalVisible);
      
              navigation.navigate('Rentals');
      
            }else{
              
                Alert.alert(
                  'An Error Has Occured',
                  'Please try again after a while',
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
      
              //console.log(res)
          
            });
  
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

      //setShowStartDatePicker(false);
    if (selectedDate) {
      console.log(selectedDate)
      setStartDate_(selectedDate);
      setStartDate(selectedDate);
    }
  };

  const handleEndDateChange = (event, selectedDate) => {
      // setShowEndDatePicker(false);
    if (selectedDate) {
      //console.log(selectedDate)
      setEndDate_(selectedDate);
      setEndDate(selectedDate);
    }
  };

  const handleStartTimeChange = (event, selectedTime) => {
    // setShowEndDatePicker(false);
    if (selectedTime) {
      //console.log('selected time ', selectedTime)
      setStartTime(selectedTime);
    }
};

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

    const route = useRoute();
    const { vhid } = route.params;

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

             const description = data["description"];
             const placeId = data["place_id"];

             const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${map_key}`;

              fetch(placeDetailsUrl)
                .then(response => response.json())
                .then(data => {
                  if (data.status === "OK" && data.result && data.result.geometry && data.result.geometry.location) {
                     
                     const latitude = data.result.geometry.location.lat;
                     const longitude = data.result.geometry.location.lng;

                     const initialPlaceData = {
                      description: description,
                      place_id: placeId,
                      latitude: latitude,
                      longitude: longitude
                    };
                  
                    //console.log(source)

                   if(source === "from"){

                       setFromLocation(initialPlaceData);

                   }else{

                        setToLocation(initialPlaceData);
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
         

  const calculateDistanceAndTime = () => {

    if (fromLocation !== null && toLocation !== null && fromLocation !== undefined && toLocation !== undefined ) {

      const api_url = `https://maps.googleapis.com/maps/api/directions/json?origin=place_id:${fromLocation.place_id}&destination=place_id:${toLocation.place_id}&key=${map_key}`

      fetch(api_url)
      .then(response => response.json())
      .then(data => {

        //console.log(data);

        const encodedPolyline = data.routes[0].overview_polyline.points;

      // Decode the polyline data into an array of coordinates
      const routeCoordinates = decodePolyline(encodedPolyline);

      // Now you have an array of coordinates that make up the route
      //console.log("Route Coordinates:", routeCoordinates);

      setRouteCoordinates(routeCoordinates)


        const distance_ = data.routes[0].legs[0].distance.text;
        const duration_ = data.routes[0].legs[0].duration.text;

        setDistance(distance_)
        setDuration(duration_)

        //console.log(`Distance: ${distance_}`);
        //console.log(`Duration: ${duration_}`);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    }else{

     // console.log('provide to and fro location')
    }
  };




    useEffect(() => {
    
      fetchVehicle(vhid, currency).then((res) => {
        setVehicle(res[0])
    
      });
      
    }, []);

    
    useEffect(() => { 

       //console.log(vehicle)
     
     }, [vehicle]);

     useEffect(() => { 

      calculateDistanceAndTime()
    
    }, [toLocation, fromLocation]);


    useEffect(() => { 

    
     if(distance !== null && duration !== null && fromLocation !== null && toLocation !==null && vehicle.price  > 0 ){

        //startDate, endDate, feeTotal, from Location, to

        //const no_of_trip = 1;
        //const extra_mileage_divisor = 70;
        const divs = vehicle.hr_rate;
        const day_hours = 10;
        const to_fro_percent = ( (100+parseFloat(vehicle.return_rate)) / 100 ); 

            // Two example dates
        const date1 = moment(startDate);
        const date2 = moment(endDate); // current date
        
            // Calculate the difference in days
        let no_of_days = date2.diff(date1, 'days')+ 1 ;

        no_of_days = no_of_days > 0 ? no_of_days : 1

        //console.log(no_of_days, )

        setDays(no_of_days)

        const no_of_hours =  Math.ceil(getHours(duration)) * no_of_days;

        setHours(no_of_hours)

        const total_fee = vehicle.price + vehicle.cost_of_job

        let fee = (total_fee / day_hours) * divs * no_of_hours;

        let cost_fee = Math.ceil( (vehicle.price /day_hours) * divs * no_of_hours);
        let job_fee = Math.ceil( (vehicle.cost_of_job /day_hours) * divs * no_of_hours);

        if(distance > 350 ){

          const fee_mult = Math.ceil(distance / 350)

          fee = (fee_mult * fee)

          ///////////////
          cost_fee = (cost_fee * fee_mult)
          job_fee = (job_fee * fee_mult)


       }

        setFee(fee)
        setCostFee(cost_fee)
        setJobFee(job_fee)

        if(no_of_days > 1) { //to_fro_calculated

          fee = (to_fro_percent * fee)

          ////////////////////
          cost_fee = (cost_fee * to_fro_percent)
          job_fee = (job_fee * to_fro_percent)

      }


      const additionalHours = Math.ceil(getHours(duration)); // Change this to the desired number of hours
  
      // Parse the current date
      const parsedDate = moment(endDate);
      const parsedTime = moment(startTime);

      const parsedStartDate = moment(startDate);
      
      // Extract date and time components
      const datePart = parsedDate.format('YYYY-MM-DD');
      const timePart = parsedTime.format('HH:mm');

      const combinedDateTime = moment(`${datePart} ${timePart}`, 'YYYY-MM-DD HH:mm');

    // Add hours to the combined date and time
      const newCombinedDate = combinedDateTime.add(additionalHours, 'hours');

    // Format the result
      const formattedResult = newCombinedDate.format('dddd, MMMM D, YYYY [at] h:mm:ss A');

      const formattedResult2 = parsedStartDate.format('dddd, MMMM D, YYYY [at] h:mm:ss A');
  
      //console.log(`Original Date: ${datePart} ${timePart} ${no_of_hours} hrs`);
      //console.log(`New Date: ${formattedResult}`);

      setStartDateTime(formattedResult2);
      setEndDateTime(formattedResult);
  

    }else{

      //console.log('fee not computed', fromLocation, toLocation, vehicle.price)
    }
    
    }, [distance, startDate, endDate, startTime]);


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
  
        const padding = 0.6; // Adjust padding as needed
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

         <SafeAreaView style={styles.wrapper}>

          <View style={styles.container}>
          <VRHeader />

          {!vehicle &&
          
          (
            <ActivityIndicator style={{padding:100}} size="large" color="#0000ff" />
          )
          }
          
          {vehicle &&


                <View style={{width:'100%'}}>

                    <Image
                    source={{ uri: vehicle.image1 }}
                    style={{ width: '100%',
                    height: 200}}
                    />

            
                <View contentContainerStyle_={styles.vh_container}>

                  <View style={{marginHorizontal: 9}} >

                       <Text style={styles.title}>{vehicle.name}</Text>
                       <Text style={{fontSize: 18, marginBottom: 7}}>{vehicle.location}</Text>

                       <Text style={{marginBottom:7}}>NGN {vehicle.price.toLocaleString()}</Text>

                       <Rating rating={vehicle.rating} starColor="green" />

                       <TouchableOpacity onPress={toggleModal}>
                        <Text style={styles.rent_btn} >Rent Now</Text>
                       </TouchableOpacity>

                       <Modal
                            transparent={true}
                            visible={isModalVisible}
                            animationType="slide"
                            onRequestClose={toggleModal}
                        >
                            <View style={styles.modalContainer}>
      
                            <View style={styles.modalHeader}>

                            <Text style={{padding:12, fontWeight: 800, fontSize: 20}}>Price Per Day: NGN {vehicle.price.toLocaleString()}</Text>

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
 <View style={{marginVertical: 0, flex: 1, flexDirection: 'col', paddingVertical: 0, marginBottom: 10}}>


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


<View style={{marginVertical: 0, flex: 1, flexDirection: 'row', paddingVertical: 0, marginVertical:0}}>

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
 <Text style={{padding:12}}>Return Date</Text>
<DateTimePicker
   value={endDate}
   mode="date"
   display="calendar"
   onChange={handleEndDateChange}
   is24Hour={true}
   textColor="black"
 />
 </View> 

 <View>
 <Text style={{padding:12, textAlign: 'right'}}>Start Time</Text>
  <DateTimePicker
    value={endDate}
    mode="time"
    display="clock"
    onChange={handleStartTimeChange}
    is24Hour={true}
    textColor="black"
  /> 
 </View>
 </View>

</View> 

<View style={{marginBottom:50}}>
  
<Text style={{marginHorizontal:12}}>Trip info</Text>

<Text style={styles.info_input}>

  {duration ? `Route Hours: ${duration}` : null}  {distance !== null && duration !== null ? `Distance: ${distance}` : null}

</Text>

{fee > 0 && (

    <Text style={styles.info_input}>

    {`Rental Cost: ${cost_fee.toLocaleString()} \nCost of Job: ${job_fee.toLocaleString()} \nNo. of Days: ${days.toLocaleString()}\n\nTotal Fee: ${fee.toLocaleString()} \n\nThis rental service will end not later than: ${endDateTime} `}

    </Text>
    
  )} 

</View>

</ScrollView>



      {fee > 0 && (

        <TouchableOpacity
          style={styles.calculateButton}
          onPress={rentVehicle}
        >
          <Text style={{textAlign:'center', color:'white'}}>Book Now</Text>
        </TouchableOpacity>

      )}
    


                            </View>

                            </View>


                              
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

      



                    </View>
                    
                </View> 

      </View>
}



          </View>

          </SafeAreaView>
  )
}

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
    height: 200, // Adjust the height as needed
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

  info_input:{

    fontSize: 16,
    //backgroundColor: '#fcfa6d',
    marginHorizontal: 7,
    padding: 7,
    fontWeight: 800,

  },


}) 
 
export default Vehicle