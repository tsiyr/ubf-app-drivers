// sections/Section1.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, ScrollView, Switch, Modal, TouchableOpacity  } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const map_key = 'AIzaSyDatXR6EOR5ohxui9mFgmr7qP3Rnb5n2oI';

const Section1 = ({ formData, setFormData }) => {


  const [showOthers, setShowOthers] = useState(false);
  const [showAddress, setShowAddress] = useState(false);

  const options = [

    { value: '', label: 'Select Vehicle Make' },
    { value: '3', label: 'Audi' },
    { value: '27', label: 'Acura' },
    { value: '5', label: 'Toyota' },
    { value: '24', label: 'SCION' },
    { value: '26', label: 'Skoda' },
    { value: '8', label: 'Mack' },
    { value: '11', label: 'Maruti' },
    { value: '22', label: 'Mercedes Benz' },
    { value: '25', label: 'Ford' },
    { value: '18', label: 'Innosons' },
    { value: '2', label: 'BMW' },
    { value: '23', label: 'John Deere' },
    { value: '21', label: 'Land Rover' },
    { value: '28', label: 'Chevrolet' },
    { value: '19', label: 'Zenvo' },
    { value: '7', label: 'Volkswagen' },
    { value: '4', label: 'Nissan' },
    { value: '20', label: 'Honda' },
    { value: 'others', label: 'Others' },
  ];
  
  // Sort the options alphabetically based on labels
  options.sort((a, b) => a.label.localeCompare(b.label));

  const update_make = (vm) => {

    
  setFormData({ ...formData, vehicleMake: vm })

    if(vm === 'others'){

       setShowOthers(true)

    }else{
      
      setShowOthers(false)

    }
  }

  const onLocationSelect = (data, details, src) => {

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
          
                console.log('Country:', country);
                console.log('State:', state);
                console.log('Locality:', locality);
          
                
                setFormData({
                  ...formData,
                  vcountry: country,
                  vstate: state,
                  vlga: locality
                });

                
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


  const handleCloseAddress = () => {

      setShowAddress(false)
  }

 
  
  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
  
    <View style={styles.container}>

      <Text>Vehicle Make:</Text>
      <Picker

       style = {styles.picker}
        selectedValue={formData.vehicleMake}
        onValueChange={(itemValue) => update_make(itemValue)}
      >
        {options.map((option) => (
          <Picker.Item key={option.value} label={option.label} value={option.value} />
        ))}
        
      </Picker>

    {showOthers && 
    <View style={{alignItems:'center', marginVertical: 20, width:'100%'}}>
      <Text>Specify Your Vehicle Make:</Text>
      <TextInput
        style = {[styles.input]}
        placeholder="e.g Toyota"
        value={formData.vehicleMakeOther}
        onChangeText={(text) => setFormData({ ...formData, vehicleMakeOther: text })}
      />
      </View>
      }


      
    <Text>Model Name:</Text>
      <TextInput
      style = {styles.input}
        placeholder="e.g Camry"
        value={formData.modelName}
        onChangeText={(text) => setFormData({ ...formData, modelName: text })}
      />

<Text style={{marginTop:20}}>Model Year:</Text>
      <TextInput
      style = {styles.input}
        placeholder="Model Year"
        value={formData.modelYear}
        onChangeText={(text) => setFormData({ ...formData, modelYear: text })}
      />


<Text style={{marginTop:20}}>Vehicle Category:</Text>
<Picker

style = {styles.picker}
 selectedValue={formData.category}
 onValueChange={(itemValue) => setFormData({ ...formData, category: itemValue })}
>
 <Picker.Item label="Select Vehicle Category" value="" />
 <Picker.Item label="Car" value="Car" />
 <Picker.Item label="SUV" value="SUV" />
 <Picker.Item label="Bus" value="Bus" />
 <Picker.Item label="Van" value="Van" />
 <Picker.Item label="Pickup" value="Pickup" />
 <Picker.Item label="Light Truck" value="lighttruck" />
 <Picker.Item label="Earth Moving Equipment" value="EarthMover" />
</Picker>


  

      <Text>Reg/Plate Number:</Text>
      <TextInput
      style = {styles.input}
        placeholder="Reg/Plate Number"
        value={formData.regPlateNumber}
        onChangeText={(text) => setFormData({ ...formData, regPlateNumber: text })}
      />

      <Text>VIN Number:</Text>
      <TextInput
      style = {styles.input}
        placeholder="VIN Number"
        value={formData.vinNumber}
        onChangeText={(text) => setFormData({ ...formData, vinNumber: text })}
      />



<Text>Usage Type:</Text>
<Picker

style = {styles.picker}
 selectedValue={formData.usageType}
 onValueChange={(itemValue) => setFormData({ ...formData, usageType: itemValue })}
>
 <Picker.Item label="Select Usage Type" value="" />
 <Picker.Item label="Haulage" value="Haulage" />
 <Picker.Item label="Passenger" value="Passenger" />
</Picker>

      

      {/* Add conditional rendering based on the selected usage type */}
      {formData.usageType === 'Passenger' && (
        <View style={{width:'100%', marginHorizontal: 12, alignItems:'center'}}>
          <Text>Seating Capacity:</Text>
          <TextInput
          style = {styles.input}
            placeholder="Seating Capacity"
            value={formData.seatingCapacity}
            onChangeText={(text) => setFormData({ ...formData, seatingCapacity: text })}
          />
        </View>
      )}

      {formData.usageType === 'Haulage' && (
         <View style={{width:'100%', marginHorizontal: 12, alignItems:'center'}}>
          <Text>Tonnage:</Text>
          <TextInput
          style = {styles.input}
            placeholder="Tonnage"
            value={formData.tonnage}
            onChangeText={(text) => setFormData({ ...formData, tonnage: text })}
          />
        </View>
      )}

     

      <Picker

      style = {styles.picker}
      selectedValue={formData.fuelType}
      onValueChange={(itemValue) => setFormData({ ...formData, fuelType: itemValue })}
      >
      <Picker.Item label="Select Fuel Type" value="" />
      <Picker.Item label="Petrol" value="Petrol" />
      <Picker.Item label="Diesel" value="Diesel" />
      <Picker.Item label="Electric" value="Electric" />

      </Picker>

      <View style={styles.switchContainer}>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Air Conditioner:</Text>
          <Switch
            value={formData.hasAirConditioner}
            onValueChange={(value) => setFormData({ ...formData, hasAirConditioner: value })}
          />
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Seat Belt:</Text>
          <Switch
            value={formData.hasSeatBelt}
            onValueChange={(value) => setFormData({ ...formData, hasSeatBelt: value })}
          />
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Spare Tire:</Text>
          <Switch
            value={formData.hasSpareTire}
            onValueChange={(value) => setFormData({ ...formData, hasSpareTire: value })}
          />
        </View>
      </View>


      <Text style={{marginTop:20}}>Why should I rent your vehicle?:</Text>
      <TextInput
      style = {styles.input}
        placeholder="Tell us about this vehicle"
        value={formData.overview}
        onChangeText={(text) => setFormData({ ...formData, overview: text })}
      />


     <Text style={{marginTop:20}}>What is your vehicle's current worth in {formData.vcurrency}?</Text>
      <TextInput
      style = {styles.input}
        placeholder="Vehicle's value"
        value={formData.vprice}
        onChangeText={(text) => setFormData({ ...formData,vprice: text })}
      />


    <TouchableOpacity onPress={() => setShowAddress(true)}  style={{margin: 5, width: '100%', alignItems: 'center'}}>

    <Text style={{margin: 5}}>Where is this vehicle located?</Text>

        <Text style={styles.input}>{formData.vstate.length > 2 && (`${formData.vlga}, ${formData.vstate}, ${formData.vcountry}`)}{formData.vstate.length < 2 && ('Vehicle Address')}
        </Text>

    </TouchableOpacity>




    </View>

    </ScrollView>

             
<Modal visible={showAddress} animationType="slide">

<TouchableOpacity onPress={() => handleCloseAddress()}  style={{marginTop: 45, padding: 12}}>
    <Text>Save & Close</Text>
  </TouchableOpacity>
   
   <View style={styles.loc_modal}>
       <GooglePlacesAutocomplete
              placeholder="Your Vehicle Address"
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
    </KeyboardAvoidingView>

    
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    width: '100%',
    alignItems:'center',
    marginBottom: 200
  },

  loc_modal:{

    zIndex: 334000,
    flex: 1,
    
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
  input: {
    width: '100%',
    padding: 10,
    margin: 10,
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  picker: {
    width: '100%',
    padding: 10,
    margin: 10,
    //borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 5,
  },

  switchContainer: {
    flexDirection: 'row', // Arrange items horizontally
    justifyContent: 'space-between', // Add space between items
    marginTop: 10, // Adjust spacing as needed
  },
  switchRow: {
    flexDirection: 'col',
    alignItems: 'center', // Align switches vertically
    marginHorizontal: 12,
  },
  switchLabel: {
    marginRight: 10, // Add space between label and switch
    paddingVertical: 5
  },
});

export default Section1;
