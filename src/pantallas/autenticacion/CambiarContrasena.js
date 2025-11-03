// src/pantallas/autenticacion/CambiarContrasena.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

const CambiarContrasena = ({ navigation, route }) => {
  const { email } = route.params || {};
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [repetirContrasena, setRepetirContrasena] = useState('');

  const handleCambiarContrasena = () => {
    if (!nuevaContrasena || !repetirContrasena) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }

    if (nuevaContrasena !== repetirContrasena) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    if (nuevaContrasena.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    // Simulamos el cambio de contraseña
    Alert.alert(
      'Éxito',
      `Contraseña cambiada correctamente para ${email}`
    );

    // Volver a la pantalla de login
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mi bolsillo</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.titulo}>Ingresar nueva contraseña</Text>

        <TextInput
          style={styles.input}
          placeholder="Nueva contraseña"
          value={nuevaContrasena}
          onChangeText={setNuevaContrasena}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Repetir contraseña"
          value={repetirContrasena}
          onChangeText={setRepetirContrasena}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.botonEnviar}
          onPress={handleCambiarContrasena}
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

export default CambiarContrasena;