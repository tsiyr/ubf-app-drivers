// sections/Section4.js
import React from 'react';
import { View, Text, TextInput } from 'react-native';

const Section4 = ({ formData, setFormData }) => {
  return (
    <View>
     
      <Text>Vehicle Make:</Text>
     
      <TextInput
        placeholder="Vehicle Model"
        value={formData.vehicleModel}
        onChangeText={(text) => setFormData({ ...formData, vehicleModel: text })}
      />
      
    </View>
  );
};

export default Section4;
