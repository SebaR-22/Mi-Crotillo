// src/pantallas/principales/AgregarCategoria.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

const AgregarCategoria = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [icono, setIcono] = useState('💧');

  const iconos = ['💧', '⚡', '🛒', '🔥', '🌐', '📺', '💰', '💳', '🏠', '🚗'];

  const handleCrear = () => {
    if (!nombre.trim()) {
      Alert.alert('Error', 'El nombre de la categoría es obligatorio');
      return;
    }

    Alert.alert(
      'Éxito',
      `Categoría creada:\nNombre: ${nombre}\nÍcono: ${icono}`
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
        {/* Nombre de la categoría */}
        <View style={styles.campo}>
          <Text style={styles.label}>Nombre de la categoría:</Text>
          <TextInput
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
            placeholder="Ej: Comida, Luz, etc."
          />
        </View>

        {/* Seleccionar ícono */}
        <View style={styles.campo}>
          <Text style={styles.label}>Agregar ícono:</Text>
          <View style={styles.iconosGrid}>
            {iconos.map((ico, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.iconoItem,
                  { backgroundColor: icono === ico ? '#3498db' : '#f0f0f0' },
                ]}
                onPress={() => setIcono(ico)}
              >
                <Text style={[styles.iconoTexto, { color: icono === ico ? '#fff' : '#333' }]}>
                  {ico}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Botón Crear */}
        <TouchableOpacity
          style={styles.botonCrear}
          onPress={handleCrear}
        >
          <Text style={styles.textoBoton}>Crear</Text>
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
  campo: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
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
  iconosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  iconoItem: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconoTexto: {
    fontSize: 24,
  },
  botonCrear: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
});

export default AgregarCategoria;