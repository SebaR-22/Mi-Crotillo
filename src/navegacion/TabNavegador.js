// src/navegacion/TabNavegador.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import Categorias from '../pantallas/principales/Categorias';
import Estadisticas from '../pantallas/principales/Estadisticas';
import Perfil from '../pantallas/principales/Perfil';

const Tab = createBottomTabNavigator();

const TabNavegador = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#3498db',
        tabBarInactiveTintColor: '#777',
        tabBarStyle: {
          backgroundColor: '#f0f0f0',
          borderTopWidth: 1,
          borderTopColor: '#ddd',
        },
      }}
    >
      <Tab.Screen
        name="Categorias"
        component={Categorias}
        options={{
          tabBarLabel: 'Categorías',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>{'📈'}</Text>,
        }}
      />
      <Tab.Screen
        name="Estadisticas"
        component={Estadisticas}
        options={{
          tabBarLabel: 'Estadísticas',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>{'📊'}</Text>,
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>{'👤'}</Text>,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavegador;