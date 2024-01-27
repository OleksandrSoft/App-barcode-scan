import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'


import Main from '../screens/Main.screen';
import Scan from '../screens/Scan.screen';
import { colorStyles } from '../assets/styles';


const Stack = createNativeStackNavigator()

const MainNavigation = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Main">
        
        <Stack.Screen name="Main" component={Main}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: colorStyles.headerColor,
            },
            headerTitle: 'Bar/QR Code Scanner',
            headerTitleAlign: 'center',
            headerTintColor: 'white',
            headerBackTitle: ''
          }}          
        />

        <Stack.Screen name="Scan" component={Scan}
          options={{ 
            headerShown: true,
            headerStyle: {
              backgroundColor: colorStyles.headerColor,
            },
            headerTitle: 'Bar/QR Code Scanner',
            headerTitleAlign: 'center',
            headerTintColor: 'white',
            headerBackTitle: ''
          }}          
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigation
