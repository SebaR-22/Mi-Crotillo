// src/pantallas/principales/Categorias.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

const Categorias = ({ navigation }) => {
  const categorias = [
    { nombre: 'AGUA', icono: '💧' },
    { nombre: 'ELECTRICIDAD', icono: '⚡' },
    { nombre: 'COMPRAS', icono: '🛒' },
    { nombre: 'GAS', icono: '🔥' },
    { nombre: 'Internet', icono: '🌐' },
    { nombre: 'Servicio de streaming', icono: '📺' },
  ];

  return (
    <View style={styles.container}>
      {/* Header con logo */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/imagenes/Logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>Mi bolsillo</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.grid}>
          {categorias.map((cat, index) => (
            <TouchableOpacity
              key={index}
              style={styles.categoria}
              onPress={() => navigation.navigate('TransaccionCategoria', { categoriaNombre: cat.nombre })}
            >
              <Text style={styles.icono}>{cat.icono}</Text>
              <Text style={styles.categoriaNombre}>{cat.nombre}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Botones fijos en la parte inferior */}
      <View style={styles.botonesFijos}>
        <TouchableOpacity
          style={styles.botonAzul}
          onPress={() => navigation.navigate('AgregarCategoria')}
        >
          <Text style={styles.botonTexto}>Agregar categorías</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botonAzul}
          onPress={() => navigation.navigate('AgregarSaldo')}
        >
          <Text style={styles.botonTexto}>Agregar saldo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3498db',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoria: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  icono: {
    fontSize: 30,
    marginBottom: 10,
  },
  categoriaNombre: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
    color: '#2c3e50',
  },
  botonesFijos: {
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  botonAzul: {
    backgroundColor: '#3498db',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Categorias;