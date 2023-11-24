import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CustomHeader from './components/header';
import HomeHeader from './components/home-header';
import Category from './pages/category';
import UserProfile from './pages/profile';
import Auth from './pages/login';
import { useAuth } from './auth';
import VehiclesPage from './pages/vehicles';
import RentalsPage from './pages/rentals';

const Stack = createStackNavigator();

const Navigation = () => {
  const { user } = useAuth();

  if (!user) {
    // User not authenticated, show login screen
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Auth}
          options={{ headerShown: false }} // Hide header for the login screen
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>

<Stack.Screen
        name="Profile"
        component={UserProfile}
        options={({ navigation }) => ({
          header: () => <HomeHeader title="Home" navigation={navigation} />,
        })}
      />

  
      <Stack.Screen
        name="Category"
        component={Category}
        options={({ route, navigation }) => ({
          header: () => <CustomHeader title={route.params.category} navigation={navigation} />,
        })}
      />
      <Stack.Screen
            name="Rentals"
            component={RentalsPage}
            options={({ navigation }) => ({
              header: () => <CustomHeader title='Rentals' navigation={navigation} />,
            })}
          />
      

    <Stack.Screen
            name="Vehicles"
            component={VehiclesPage}
            options={({ navigation }) => ({
              header: () => <CustomHeader title='My Vehicles' navigation={navigation} />,
            })}
          />



    </Stack.Navigator>


  );
};

export default Navigation;
