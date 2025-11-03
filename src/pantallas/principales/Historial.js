// src/pantallas/principales/Historial.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Historial = ({ navigation }) => {
  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');
  const [anio, setAnio] = useState('');

  // Datos simulados
  const [transacciones, setTransacciones] = useState([]);

  useEffect(() => {
    const fetchTransacciones = async () => {
      // Intentamos consultar el backend; si falla, usamos AsyncStorage local
      try {
        const res = await fetch('http://127.0.0.1:8000/transacciones');
        if (res.ok) {
          const data = await res.json();
          setTransacciones(data);
          return;
        }
      } catch (err) {
        // ignore, fallback abajo
      }

      try {
        const raw = await AsyncStorage.getItem('transacciones');
        if (raw) {
          const local = JSON.parse(raw);
          setTransacciones(local);
        } else {
          setTransacciones([]);
        }
      } catch (err) {
        console.error('Error leyendo transacciones locales:', err);
      }
    };

    // Ejecutar al montar
    fetchTransacciones();

    // Refrescar cada vez que la pantalla gana foco (si navigation está disponible)
    let unsubscribe;
    try {
      // navigation may not be passed in all contexts
      if (typeof navigation !== 'undefined' && navigation && navigation.addListener) {
        unsubscribe = navigation.addListener('focus', fetchTransacciones);
      }
    } catch (e) {
      // ignore
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleFiltrar = () => {
    if (!dia && !mes && !anio) {
      Alert.alert('Error', 'Ingresa al menos un campo para filtrar');
      return;
    }
    Alert.alert('Éxito', 'Filtro aplicado');
  };

  const renderTransaccion = (t) => {
    const esIngreso = t.monto > 0;
    const color = esIngreso ? '#2ecc71' : '#e74c3c';
    return (
      <View key={t.id} style={styles.transaccion}>
        <Text style={styles.fecha}>{t.fecha}</Text>
        <Text style={styles.descripcion}>{t.descripcion || t.nombre || ''}</Text>
        <Text style={[styles.monto, { color }]}>
          {esIngreso ? '+' : '-'} ${Math.abs(t.monto).toFixed(2)}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header sin botón */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mi bolsillo</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.titulo}>Historial de transacciones</Text>

        {/* Filtros */}
        <View style={styles.filtros}>
          <TextInput
            style={styles.input}
            placeholder="Día (1-31)"
            value={dia}
            onChangeText={setDia}
            keyboardType="numeric"
            maxLength={2}
          />
          <TextInput
            style={styles.input}
            placeholder="Mes (1-12)"
            value={mes}
            onChangeText={setMes}
            keyboardType="numeric"
            maxLength={2}
          />
          <TextInput
            style={styles.input}
            placeholder="Año (YYYY)"
            value={anio}
            onChangeText={setAnio}
            keyboardType="numeric"
            maxLength={4}
          />
          <TouchableOpacity style={styles.botonFiltrar} onPress={handleFiltrar}>
            <Text style={styles.textoBoton}>Filtrar</Text>
          </TouchableOpacity>
        </View>

        {/* Lista */}
        <View style={styles.lista}>
          {transacciones.map(renderTransaccion)}
        </View>
      </View>

      {/* Botón Atrás en la esquina inferior izquierda */}
      <TouchableOpacity
        style={styles.botonAtras}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.textoBotonAtras}>←</Text>
      </TouchableOpacity>
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
  filtros: {
    flexDirection: 'row',
    gap: 5,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f0f0f0',
    fontSize: 16,
  },
  botonFiltrar: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  lista: {
    gap: 10,
  },
  transaccion: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
  },
  fecha: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  descripcion: {
    fontSize: 16,
    marginBottom: 5,
  },
  monto: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  botonAtras: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 10,
  },
  textoBotonAtras: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default Historial;