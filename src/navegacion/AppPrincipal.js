// src/navegacion/AppPrincipal.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavegador from './TabNavegador';
import DetallesCuenta from '../pantallas/principales/DetallesCuenta';

const Stack = createNativeStackNavigator();

const AppPrincipal = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="TabNavegador" component={TabNavegador} />
        <Stack.Screen name="DetallesCuenta" component={DetallesCuenta} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppPrincipal;