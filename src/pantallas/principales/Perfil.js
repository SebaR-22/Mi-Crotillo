// src/pantallas/principales/Perfil.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const Perfil = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mi bolsillo</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Avatar y nombre */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
          <Text style={styles.nombre}>Nombre y apellido</Text>
        </View>

        {/* Opciones */}
        <TouchableOpacity
          style={styles.opcionDiscreta}
          onPress={() => navigation.navigate('DetallesCuenta')}
        >
          <Text style={styles.opcionTexto}>Detalles de la cuenta</Text>
        </TouchableOpacity>
        

        <TouchableOpacity
          style={styles.opcionDiscreta}
          onPress={() => navigation.navigate('Historial')}
        >
          <Text style={styles.opcionTexto}>Historial</Text>
        </TouchableOpacity>

        <TouchableOpacity
  style={[styles.opcionDiscreta, styles.cerrarSesion]}
  onPress={() => navigation.navigate('ConfirmarCerrarSesion')} // ← Cambiado
>
  <Text style={styles.opcionTexto}>Cerrar sesión</Text>
</TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
    paddingBottom: 100, // Para que la barra no tape el contenido
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    fontSize: 30,
    color: '#777',
  },
  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  opcionDiscreta: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  opcionTexto: {
    fontSize: 16,
    color: '#3498db',
  },
  cerrarSesion: {
    marginTop: 20,
  },
});

export default Perfil;