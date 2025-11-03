// src/pantallas/principales/ConfirmarCerrarSesion.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const ConfirmarCerrarSesion = ({ navigation }) => {
  const handleSi = () => {
    // Aquí podrías limpiar el token si lo usas
    // Por ahora, solo navega a Login
    navigation.replace('Login');
  };

  const handleNo = () => {
    // Vuelve a la pantalla anterior (Perfil)
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mi bolsillo</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.pregunta}>
          ¿Deseas cerrar sesión de tu cuenta?
        </Text>

        <TouchableOpacity style={styles.boton} onPress={handleSi}>
          <Text style={styles.textoBoton}>Sí</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.boton} onPress={handleNo}>
          <Text style={styles.textoBoton}>No</Text>
        </TouchableOpacity>
      </View>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  pregunta: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  boton: {
    width: '60%',
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  textoBoton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ConfirmarCerrarSesion;