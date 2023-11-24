import React, { useRef, useEffect } from 'react';
import { FlatList, View, Text, Animated, Easing, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const DepartureBoard = () => {

    const navigation = useNavigation();

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

  const scrollY = useRef(new Animated.Value(0)).current;
  const ITEM_HEIGHT = 40; // Adjust this based on your row height

  useEffect(() => {
    const animation = Animated.timing(scrollY, {
      toValue: data.length * ITEM_HEIGHT,
      duration: data.length * 1600, // Adjust the speed of scrolling
      easing: Easing.linear,
      useNativeDriver: false,
    });

    const loopAnimation = () => {
      animation.start(() => {
        scrollY.setValue(0);
        loopAnimation();
      });
    };

    loopAnimation();
  }, []);


  const renderItem = ({ item, index }) => {
    const translateY = scrollY.interpolate({
      inputRange: [0, data.length * ITEM_HEIGHT],
      outputRange: [0, -data.length * ITEM_HEIGHT],
    });

    return (

      <Animated.View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          backgroundColor: index % 2 === 0 ? 'lightgray' : 'white',
          transform: [{ translateY }],
        }}
      >
        <Text>{item.from}</Text>
        <Text>{item.destination}</Text>
        <Text>{item.date_time}</Text>
      </Animated.View>
    );
  };

  
  const go_to_ds_page = () => {

    navigation.navigate('Category');
    console.log('Element clicked!');
  };

  return (

    <View style={{  width: '100%', height: 200, overflow: 'hidden' }}>

    <View style={{  padding: 12, flexDirection:'row', justifyContent:'space-between'}}>
        <Text>Multi-State Carpool (Destination Service) </Text>

        <TouchableOpacity onPress={go_to_ds_page}>
        <View style={{ paddingHorizontal:14,paddingVertical:4, borderRadius:50, backgroundColor:'lightgreen' }}>
            <Text>See All </Text>
            </View>
        </TouchableOpacity>
    </View>
    
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 8,
        
      }}
    >
      <Text>FROM</Text>
      <Text>DESTINATION</Text>
      <Text>DATE/TIME</Text>
    </View>

      <Animated.FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  
  );
};

export default DepartureBoard;
