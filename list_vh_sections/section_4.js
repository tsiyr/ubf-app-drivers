// sections/Section1.js
import React from 'react';
import { View, Text, TextInput } from 'react-native';

const Section4 = ({ formData, setFormData }) => {
  return (
    <View>
      {/* Add your Section 1 fields here */}
      <Text>Vehicle Make:</Text>
      {/* Add a Picker component with data from your JSON API */}
      <TextInput
        placeholder="Vehicle Model"
        value={formData.vehicleModel}
        onChangeText={(text) => setFormData({ ...formData, vehicleModel: text })}
      />
      {/* Add other fields as needed */}
    </View>
  );
};

export default Section4;
