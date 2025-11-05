import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const GlobalChatButton = ({ onPress, currentRouteName }) => {
  // Don't show the button in these screens
  const hideInScreens = [
    'Login',
    'Registro',
    'RecuperarContrasena',
    'VerificarCodigo',
    'CambiarContrasena',
    'AgregarCategoria',
    'AgregarSaldo',
    'ConfirmarCerrarSesion'
  ];
  
  // No mostrar el botón en las pantallas especificadas
  if (hideInScreens.includes(currentRouteName)) {
    return null;
  }

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons name="chatbubble-ellipses" size={24} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 20,
    bottom: 90, // Above the tab bar
    backgroundColor: '#0084ff',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default GlobalChatButton;