import React from 'react';
import { FlatList, View, Text } from 'react-native';

const DepartureBoard = () => {
  const data = [
    { from: 'New York', destination: 'New York',  date_time: '08:00 AM'},
    { from: 'New York', destination: 'New York',  date_time: '08:00 AM'},
    { from: 'New York', destination: 'New York',  date_time: '08:00 AM'},
    { from: 'New York', destination: 'New York',  date_time: '08:00 AM'},
    { from: 'New York', destination: 'New York',  date_time: '08:00 AM'},
    { from: 'New York', destination: 'New York',  date_time: '08:00 AM'},
    { from: 'New York', destination: 'New York',  date_time: '08:00 AM'},
    { from: 'New York', destination: 'New York',  date_time: '08:00 AM'},
    { from: 'New York', destination: 'New York',  date_time: '08:00 AM'},
    // Add more departure data as needed
  ];

  const renderItem = ({ item, index }) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: index % 2 === 0 ? 'lightgray' : 'white',
      }}
    >
      <Text>{item.from}</Text>
      <Text>{item.destination}</Text>
      <Text>{item.date_time}</Text>
    </View>
  );

  return (
   <View style={{
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: 'GREEN',
  }}
  
  >
    
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'GREEN',
        padding: 8,
        
      }}
    >
      <Text>FROM</Text>
      <Text>DESTINATION</Text>
      <Text>DATE/TIME</Text>
    </View>

    <View style={{ height: 300, flexDirection:'row', }}>
        
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
    </View>
  );
};

export default DepartureBoard;
