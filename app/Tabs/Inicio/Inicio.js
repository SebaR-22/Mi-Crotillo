/* Conecta todas las paginas y hace el orden */

// App.js - Punto de entrada principal de la aplicación
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Importar pantallas
import PantallaSplash from './src/pantallas/bienvenida/PantallaSplash';
import PantallaLogin from './src/pantallas/autenticacion/Login';
import PantallaRegistro from './src/pantallas/autenticacion/Registro';
import MenuPrincipal from './src/pantallas/principales/MenuPrincipal';
import Historial from './src/pantallas/principales/Historial';
import Estadisticas from './src/pantallas/principales/Estadisticas';
import FormularioMovimiento from './src/pantallas/principales/FormularioMovimiento';

import TemaColores from './src/estilos/TemaColores';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Navegador de pestañas inferior (cuando el usuario ya está autenticado)
function NavegadorTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: TemaColores.colores.azulPrimario,
        tabBarInactiveTintColor: TemaColores.colores.textoGris,
        tabBarStyle: {
          height: TemaColores.dimensiones.alturaTabBar,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: TemaColores.colores.fondoBlanco,
          borderTopWidth: 1,
          borderTopColor: TemaColores.colores.bordeGrisClaro,
        },
        tabBarLabelStyle: {
          fontSize: TemaColores.tipografia.tamañoMuyPequeño,
          fontWeight: TemaColores.tipografia.pesoMedio,
        },
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={MenuPrincipal}
        options={{
          tabBarLabel: 'Inicio',
          // Aquí puedes agregar iconos cuando los tengas
          // tabBarIcon: ({ color, size }) => (
          //   <Icon name="home" color={color} size={size} />
          // ),
        }}
      />
      
      <Tab.Screen
        name="Agregar"
        component={FormularioMovimiento}
        options={{
          tabBarLabel: 'Agregar',
          // tabBarIcon: ({ color, size }) => (
          //   <Icon name="plus" color={color} size={size} />
          // ),
        }}
      />

      <Tab.Screen
        name="Historial"
        component={Historial}
        options={{
          tabBarLabel: 'Historial',
          // tabBarIcon: ({ color, size }) => (
          //   <Icon name="list" color={color} size={size} />
          // ),
        }}
      />

      <Tab.Screen
        name="Estadisticas"
        component={Estadisticas}
        options={{
          tabBarLabel: 'Gráficos',
          // tabBarIcon: ({ color, size }) => (
          //   <Icon name="bar-chart" color={color} size={size} />
          // ),
        }}
      />
    </Tab.Navigator>
  );
}

// Navegador principal de la aplicación
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        {/* Pantalla de carga inicial */}
        <Stack.Screen
          name="Splash"
          component={PantallaSplash}
          options={{
            headerShown: false,
          }}
        />

        {/* Pantallas de autenticación */}
        <Stack.Screen
          name="PantallaLogin"
          component={PantallaLogin}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="PantallaRegistro"
          component={PantallaRegistro}
          options={{
            headerShown: false,
          }}
        />

        {/* Pantallas principales (con tabs) */}
        <Stack.Screen
          name="Principal"
          component={NavegadorTabs}
          options={{
            headerShown: false,
            gestureEnabled: false, // No permite volver con gesto
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;