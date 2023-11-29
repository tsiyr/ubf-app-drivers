import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './navigation';
import { AuthProvider } from './auth';
import { SharedDataProvider } from './sharedDataContext';
//import registerNNPushToken from 'native-notify';

import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import * as Constants from 'expo-constants'



async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }

    try{

      token = await Notifications.getExpoPushTokenAsync({
        projectId: 'a75e63eb-69c5-47c1-91b0-9ffd5431c686' //Constants.expoConfig.extra.eas.projectId,
      });
      console.log(token);

  }catch(err){
      // handle rejection
      console.error(err)
   }

  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token.data;
}

const App = () => {

  //registerNNPushToken(15297, 'tmamG0DXwLdrsi7pvDZA6R');
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
  
    useEffect(() => {

      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
  
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });
  
      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
      
    }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <AuthProvider>
        <SharedDataProvider>

          <NavigationContainer>
            <Navigation />
          </NavigationContainer>

        </SharedDataProvider>
      </AuthProvider>

    </SafeAreaView>
  );
};

export default App;
