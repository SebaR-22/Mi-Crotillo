// src/navegacion/Navegador.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../pantallas/autenticacion/Login';
import Registro from '../pantallas/autenticacion/Registro';
import TabNavegador from './TabNavegador';
import DetallesCuenta from '../pantallas/principales/DetallesCuenta'; // ← Importada
import Historial from '../pantallas/principales/Historial';         // ← Importada
import ConfirmarCerrarSesion from '../pantallas/principales/ConfirmarCerrarSesion';
import TransaccionCategoria from '../pantallas/principales/TransaccionCategoria'; 
import AgregarCategoria from '../pantallas/principales/AgregarCategoria';
import AgregarSaldo from '../pantallas/principales/AgregarSaldo';
import RecuperarContrasena from '../pantallas/autenticacion/RecuperarContrasena';
import VerificarCodigo from '../pantallas/autenticacion/VerificarCodigo';
import CambiarContrasena from '../pantallas/autenticacion/CambiarContrasena';



const Stack = createNativeStackNavigator();

const Navegador = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Registro" component={Registro} options={{ headerShown: false }} />
        <Stack.Screen name="AppPrincipal" component={TabNavegador} options={{ headerShown: false }} />
        
        {/* Pantallas secundarias */}
        <Stack.Screen name="DetallesCuenta" component={DetallesCuenta} options={{ headerShown: false }} />
        <Stack.Screen name="Historial" component={Historial} options={{ headerShown: false }} />
        <Stack.Screen name="ConfirmarCerrarSesion" component={ConfirmarCerrarSesion} options={{ headerShown: false }} />
        <Stack.Screen name="TransaccionCategoria" component={TransaccionCategoria} options={{ headerShown: false }} />
        <Stack.Screen name="RecuperarContrasena" component={RecuperarContrasena} options={{ headerShown: false }} />
        <Stack.Screen name="VerificarCodigo" component={VerificarCodigo} options={{ headerShown: false }} />
        <Stack.Screen name="CambiarContrasena" component={CambiarContrasena} options={{ headerShown: false }} />
        <Stack.Screen 
  name="AgregarCategoria" 
  component={AgregarCategoria} 
  options={{ headerShown: false }} 
/>
<Stack.Screen 
  name="AgregarSaldo" 
  component={AgregarSaldo} 
  options={{ headerShown: false }} 
/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navegador;