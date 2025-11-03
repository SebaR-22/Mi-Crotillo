// src/pantallas/autenticacion/Login.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import InputTexto from '../../componentes/InputTexto';
import Boton from '../../componentes/boton';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (loading) return;
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa correo y contraseña');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.replace('AppPrincipal');
    }, 800);
  };

  const handleForgotPassword = () => {
    navigation.navigate('RecuperarContrasena');
  };

  const handleRegister = () => {
    navigation.navigate('Registro');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* Header con logo */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/imagenes/Logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Bienvenidos a la app</Text>
        <Text style={styles.subtitle}>mi bolsillo</Text>
      </View>

      <View style={styles.inner}>
        <InputTexto
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <InputTexto
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Boton
          title={loading ? 'Ingresando...' : 'Entrar'}
          onPress={handleLogin}
          disabled={loading}
        />

        <Text
          style={styles.link}
          onPress={handleForgotPassword}
        >
          ¿Olvidaste tu contraseña?
        </Text>

        <Text
          style={styles.link}
          onPress={handleRegister}
        >
          ¿No tienes cuenta? Regístrate
        </Text>
      </View>
    </KeyboardAvoidingView>
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
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2c3e50',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#3498db',
    textAlign: 'center',
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  link: {
    marginTop: 16,
    color: '#3498db',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Login;