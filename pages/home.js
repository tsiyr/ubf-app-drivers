import React from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
//import ImageCarousel from "./components/carousel";
//import CustomHeader from "../components/header";
import DepartureBoard from "../components/ds_board";
import VRHeader from "../components/vh_search_header";
import VRBtns from "../components/vr_btns";
import CategoryCards from "../components/category_cards";
import { useAuth } from '../auth';

 const Home = () => {

  const { currency } = useAuth();

  //console.log('user data', user)
  console.log('user currency', currency)

  return(

         <SafeAreaView style={styles.wrapper}>


          <View style={styles.container}>

         
          <DepartureBoard />

          <VRHeader />
          <ScrollView style={styles.scroll_container}>
          <VRBtns />
          <CategoryCards />
          </ScrollView>

          </View>
         

          </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrapper:{
    flex: 1,
  },
  container: {
    //backgroundColor: 'lightgreen',
    alignItems: 'center'
  },
  scroll_container:{
     marginBottom: 14
  }
}) 

export default Home