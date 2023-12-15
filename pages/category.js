import React, {  useEffect, useState } from 'react'
import { View, SafeAreaView, StyleSheet, ScrollView , TouchableOpacity, Image, Text, ActivityIndicator} from "react-native";

import VRHeader from "../components/vh_search_header";

import { useRoute, useNavigation } from '@react-navigation/native';
import VhCards from "../components/vh_cards";
import { fetchVehicles } from "../utils/services";


 const Category = () => {


  const navigation = useNavigation(); 

  const handleCardPress = (vhid) => {
    navigation.navigate('Vehicle', { vhid });
  };


  const [vehicles, setVehicles] = useState(false)

    const route = useRoute();
    const { category } = route.params;


    useEffect(() => {
    
      fetchVehicles(category).then((res) => {
        setVehicles(res)
    
      });
      
    }, []);

    
    useEffect(() => { 

       console.log(vehicles)
     
     }, [vehicles]);

     const Card = ({ imageUrl, text, title, vhid }) => (
    
      <TouchableOpacity style={styles.card}
      key={title}
      onPress={() => handleCardPress(vhid)}
    >
      <View >
      <Image source={{ uri: imageUrl }} style={styles.cardImage} resizeMode="cover" />
        <Text style={styles.cardText}>{text}</Text>
      </View>
    
      </TouchableOpacity>
    );
    

  return(

         <SafeAreaView style={styles.wrapper}>

          <View style={styles.container}>
          <VRHeader />

          {!vehicles &&
          
            (
            <ActivityIndicator style={{padding:100}} size="large" color="#0000ff" />
            )
          }
          {vehicles && (
            
              <ScrollView contentContainerStyle={styles.vh_container}>

                {vehicles.reduce((rows, item, index) => {
                  if (index % 2 === 0) {
                    rows.push([]);
                  }
                  rows[rows.length - 1].push(item);
                  return rows;
                }, []).map((row, rowIndex) => (
                  
                  <View style={styles.row} key={rowIndex}>
                    
                    {row.map((data, cardIndex) => (
                      <Card
                        key={cardIndex}
                        title={data.title}
                        vhid={data.id}
                        imageUrl={data.image}
                        text={data.price}
                      />
                    ))}

                  </View>
                ))}

              </ScrollView>
)}

          </View>

          </SafeAreaView>
  )
}

const styles = StyleSheet.create({

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
  },
  container: {
    //backgroundColor: 'lightgreen',
    alignItems: 'center'
  },
 
  card: {
    width: '49%', 
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 150, 
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardText: {
    padding: 2,
    textAlign: 'center',
  },

}) 
 
export default Category