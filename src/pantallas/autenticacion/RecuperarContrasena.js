// src/pantallas/autenticacion/RecuperarContrasena.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

const RecuperarContrasena = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleEnviarCorreo = () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Ingresa tu correo electrónico');
      return;
    }

    // Simulamos el envío de código
    Alert.alert(
      'Código enviado',
      `Se ha enviado un código de recuperación a ${email}`
    );

    // Navega a la siguiente pantalla
    navigation.navigate('VerificarCodigo', { email });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mi bolsillo</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.titulo}>Ingresar tu correo electrónico</Text>
        <Text style={styles.subtitulo}>Se enviará un código a tu correo</Text>

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={styles.botonEnviar}
          onPress={handleEnviarCorreo}
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

export default RecuperarContrasena;