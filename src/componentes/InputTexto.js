// src/componentes/InputTexto.js
import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const InputTexto = (props) => {
  return (
    <TextInput
      style={styles.input}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
});

export default InputTexto;