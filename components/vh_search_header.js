// CustomHeader.js
import React from 'react';
import { View, TextInput, StyleSheet, Text, Dimensions } from 'react-native';


const VRHeader = () => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={[styles.header, { width: screenWidth }]}>
      <Text style={{padding:5, marginTop:12, color: 'white'}}>Vehicle Rental Service</Text>
      <TextInput
        style={styles.input}
        //onChangeText={onChangeNumber}
        //value={number}
        placeholder="search vehicle"
        keyboardType="numeric"
      />
      
    </View>
  );
};


const styles = StyleSheet.create({
  header: {
    width: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'green',
    paddingHorizontal:12 ,
    marginBottom: 0,
  },
  input: {
    margin: 12,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 50,
    backgroundColor: 'white'
  }
});

export default VRHeader;
