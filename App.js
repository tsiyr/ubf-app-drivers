import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './navigation';
import { AuthProvider } from './auth';
import { SharedDataProvider } from './sharedDataContext';
import registerNNPushToken from 'native-notify';

const App = () => {

  registerNNPushToken(15297, 'tmamG0DXwLdrsi7pvDZA6R');

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
