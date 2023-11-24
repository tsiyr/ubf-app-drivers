import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Assuming FontAwesome or another icon library

const NoVehiclesFoundView = () => {
  return (
    <View style={styles.container}>
      <Icon name="car" size={150} color="#000" /> 
      <Text style={styles.noVehiclesText}>No vehicles found</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noVehiclesText: {
    marginTop: 20, // Adjust spacing between icon and text
    fontSize: 18,
    color: '#555', // Adjust text color
  },
});

export default NoVehiclesFoundView;
