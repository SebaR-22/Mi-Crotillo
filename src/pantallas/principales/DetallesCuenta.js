// src/pantallas/principales/DetallesCuenta.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

const DetallesCuenta = ({ navigation }) => {
  const [nombre, setNombre] = useState('Taylor');
  const [apellido, setApellido] = useState('Swift');
  const [email, setEmail] = useState('taylor@example.com');
  const [password, setPassword] = useState('miContraseñaSegura123');
  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  const handleMostrarContrasena = () => {
    if (!mostrarContrasena) {
      Alert.alert(
        'Confirmar',
        '¿Estás seguro de que quieres ver tu contraseña?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Mostrar',
            onPress: () => setMostrarContrasena(true),
          },
        ]
      );
    } else {
      setMostrarContrasena(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.botonAtras}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.textoBoton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mi bolsillo</Text>
      </View>

      <View style={styles.content}>
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
        </View>

        {/* Campos */}
        <View style={styles.campo}>
          <Text style={styles.label}>Nombre:</Text>
          <TextInput
            style={styles.input}
            value={nombre}
            editable={false}
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Apellido:</Text>
          <TextInput
            style={styles.input}
            value={apellido}
            editable={false}
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Correo electrónico:</Text>
          <TextInput
            style={styles.input}
            value={email}
            editable={false}
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Contraseña:</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              value={mostrarContrasena ? password : '••••••••••••'}
              secureTextEntry={!mostrarContrasena}
              editable={false}
            />
            <TouchableOpacity
              style={styles.botonMostrar}
              onPress={handleMostrarContrasena}
            >
              <Text style={styles.textoBotonMostrar}>
                {mostrarContrasena ? 'Ocultar' : 'Mostrar'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  botonAtras: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 10, // ← Esto baja el botón 10 píxeles
  },
  textoBoton: {
    fontSize: 16,
    color: '#333',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  avatarContainer: {
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
  },
  avatarText: {
    fontSize: 30,
    color: '#777',
  },
  campo: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f0f0f0',
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  botonMostrar: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  textoBotonMostrar: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default DetallesCuenta;