// src/pantallas/principales/MenuPrincipal.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const MenuPrincipal = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menú Principal</Text>
      <Button title="Ir a Categorías" onPress={() => navigation.navigate('Categorias')} />
      <Button title="Ir a Estadísticas" onPress={() => navigation.navigate('Estadisticas')} />
      <Button title="Cerrar sesión" onPress={() => navigation.replace('Inicio')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default MenuPrincipal;