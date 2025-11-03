// src/pantallas/autenticacion/Registro.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import InputTexto from '../../componentes/InputTexto';
import Boton from '../../componentes/boton';

const Registro = ({ navigation }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.inner}>
        <Text style={styles.title}>Registro</Text>
        <Text style={styles.subtitle}>Crea tu cuenta</Text>

        <InputTexto placeholder="Nombre" autoCapitalize="words" />
        <InputTexto placeholder="Apellido" autoCapitalize="words" />
        <InputTexto
          placeholder="Correo electrónico"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <InputTexto placeholder="Contraseña" secureTextEntry />

        <Boton
          title="Crear cuenta"
          onPress={() => {
            Alert.alert('Registro', 'Cuenta creada exitosamente');
            navigation.replace('AppPrincipal');
          }}
        />

        <Text
          style={styles.link}
          onPress={() => navigation.goBack()}
        >
          Volver al login
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  link: {
    marginTop: 15,
    color: '#3498db',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Registro;