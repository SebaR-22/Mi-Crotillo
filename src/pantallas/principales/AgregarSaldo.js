// src/pantallas/principales/AgregarSaldo.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

const AgregarSaldo = ({ navigation }) => {
  const [monto, setMonto] = useState('');

  const handleActualizarSaldo = () => {
    const valor = parseFloat(monto);
    if (isNaN(valor) || valor <= 0) {
      Alert.alert('Error', 'Ingresa un monto válido mayor a 0');
      return;
    }

    Alert.alert(
      'Éxito',
      `Saldo actualizado a: $${valor.toFixed(2)}`
    );

    navigation.goBack();
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
        {/* Instrucción */}
        <Text style={styles.instruccion}>
          Ingresa el nuevo saldo total (reemplazará el actual)
        </Text>

        {/* Saldo actual */}
        <View style={styles.saldoActualContainer}>
          <Text style={styles.saldoActualLabel}>Saldo actual:</Text>
          <Text style={styles.saldoActualValor}>$25000.00</Text>
        </View>

        {/* Campo Monto */}
        <View style={styles.campo}>
          <Text style={styles.label}>Nuevo saldo:</Text>
          <TextInput
            style={styles.input}
            value={monto}
            onChangeText={setMonto}
            placeholder="Ej: 30000.00"
            keyboardType="numeric"
            placeholderTextColor="#999"
          />
        </View>

        {/* Botón Actualizar */}
        <TouchableOpacity
          style={styles.botonActualizar}
          onPress={handleActualizarSaldo}
        >
          <Text style={styles.textoBoton}>Actualizar saldo</Text>
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
  instruccion: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#555',
  },
  saldoActualContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  saldoActualLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  saldoActualValor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2ecc71',
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
  botonActualizar: {
    backgroundColor: '#2ecc71',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
});

export default AgregarSaldo;