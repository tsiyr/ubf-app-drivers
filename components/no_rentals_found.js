import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const NoVehiclesFoundView = () => {
  return (
    <View style={styles.container}>
      <Icon name="car" size={150} color="#000" /> 
      <Text style={styles.noVehiclesText}>No rentals found</Text>
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
    marginTop: 20, 
    fontSize: 18,
    color: '#555', 
  },
});

export default NoVehiclesFoundView;
