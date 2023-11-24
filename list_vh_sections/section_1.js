// sections/Section1.js
import React from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, ScrollView, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Section1 = ({ formData, setFormData }) => {

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

  
  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
  
    <View style={styles.container}>
      <Text>Vehicle Make:</Text>
      {/* Replace the Picker component with your actual dropdown component */}
      <Picker

       style = {styles.picker}
        selectedValue={formData.vehicleMake}
        onValueChange={(itemValue) => setFormData({ ...formData, vehicleMake: itemValue })}
      >
        {options.map((option) => (
          <Picker.Item key={option.value} label={option.label} value={option.value} />
        ))}
        
      </Picker>


<Text>Vehicle Category:</Text>
<Picker

style = {styles.picker}
 selectedValue={formData.category}
 onValueChange={(itemValue) => setFormData({ ...formData, category: itemValue })}
>
 <Picker.Item label="Select Vehicle Category" value="" />
 <Picker.Item label="Car" value="car" />
 <Picker.Item label="SUV" value="suv" />
 <Picker.Item label="Bus" value="bus" />
 <Picker.Item label="Van" value="van" />
 <Picker.Item label="Pickup" value="pickup" />
 <Picker.Item label="Light Truck" value="lighttruck" />
 <Picker.Item label="Earth Moving Equipment" value="EarthMover" />
 {/* Add more items based on your JSON API data */}
</Picker>

      <Text>Model Year:</Text>
      <TextInput
      style = {styles.input}
        placeholder="Model Year"
        value={formData.modelYear}
        onChangeText={(text) => setFormData({ ...formData, modelYear: text })}
      />

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
 <Picker.Item label="Haulage" value="haulage" />
 <Picker.Item label="Passenger" value="passenger" />
 {/* Add more items based on your JSON API data */}
</Picker>

      

      {/* Add conditional rendering based on the selected usage type */}
      {formData.usageType === 'passenger' && (
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

      {formData.usageType === 'haulage' && (
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

      <Text>Fuel Type:</Text>
      <TextInput
      style = {styles.input}
        placeholder="Fuel Type"
        value={formData.fuelType}
        onChangeText={(text) => setFormData({ ...formData, fuelType: text })}
      />

      <Picker

      style = {styles.picker}
      selectedValue={formData.fuelType}
      onValueChange={(itemValue) => setFormData({ ...formData, fuelType: itemValue })}
      >
      <Picker.Item label="Select Fuel Type" value="" />
      <Picker.Item label="Petrol" value="haulage" />
      <Picker.Item label="Diesel" value="passenger" />
      <Picker.Item label="Electric" value="electric" />

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

    </View>

    </ScrollView>
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
