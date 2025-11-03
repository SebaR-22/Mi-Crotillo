// src/componentes/boton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Boton = ({ title, onPress, disabled = false }) => {
  return (
    <TouchableOpacity
      style={[styles.boton, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.texto}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  boton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  disabled: {
    backgroundColor: '#bdc3c7',
  },
texto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Boton;