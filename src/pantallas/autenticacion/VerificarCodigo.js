// src/pantallas/autenticacion/VerificarCodigo.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

const VerificarCodigo = ({ navigation, route }) => {
  const { email } = route.params || {};
  const [codigo, setCodigo] = useState('');

  const handleVerificar = () => {
    if (!codigo) {
      Alert.alert('Error', 'Ingresa el código');
      return;
    }

    // Simulamos la verificación del código
    if (codigo === '123456') { // Código fijo para prueba
      Alert.alert('Éxito', 'Código verificado');
      navigation.navigate('CambiarContrasena', { email });
    } else {
      Alert.alert('Error', 'Código incorrecto');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mi bolsillo</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.titulo}>Ingresar código</Text>
        <Text style={styles.subtitulo}>Se envió un código a {email}</Text>

        <TextInput
          style={styles.input}
          placeholder="Código de verificación"
          value={codigo}
          onChangeText={setCodigo}
          keyboardType="numeric"
          maxLength={6}
        />

        <TouchableOpacity
          style={styles.botonEnviar}
          onPress={handleVerificar}
        >
          <Text style={styles.textoBoton}>Enviar</Text>
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
    padding: 20,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
  },
  botonEnviar: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBoton: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default VerificarCodigo;