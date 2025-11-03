// src/pantallas/principales/TransaccionCategoria.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';

const TransaccionCategoria = ({ navigation, route }) => {
  const { categoriaNombre } = route.params || {};

  const [tipo, setTipo] = useState('gasto');
  const [fecha, setFecha] = useState('');
  const [nombre, setNombre] = useState('');
  const [monto, setMonto] = useState('');
  const [saldoActual, setSaldoActual] = useState(25000);
  const [localHist, setLocalHist] = useState([]);
  
  // AsyncStorage for local persistence when backend is off
  const AsyncStorage = require('@react-native-async-storage/async-storage').default;

  useEffect(() => {
    const loadLocal = async () => {
      try {
        const raw = await AsyncStorage.getItem('transacciones');
        if (raw) setLocalHist(JSON.parse(raw));
      } catch (e) {
        console.error('Error leyendo historial local:', e);
      }
    };
    loadLocal();
  }, []);

  const handleEnviar = async () => {
    if (!fecha || !nombre || !monto) {
      Alert.alert('Error', 'Completa todos los campos (fecha, nombre, monto)');
      return;
    }

    const valor = parseFloat(monto);
    if (isNaN(valor)) {
      Alert.alert('Error', 'El monto debe ser un número válido');
      return;
    }

    const nueva = {
      id: Date.now().toString(),
      tipo,
      categoria: categoriaNombre || 'General',
      monto: valor,
      nombre,
      fecha,
    };

    try {
      // Guardar en AsyncStorage local
      const raw = await AsyncStorage.getItem('transacciones');
      const arr = raw ? JSON.parse(raw) : [];
      arr.unshift(nueva);
      await AsyncStorage.setItem('transacciones', JSON.stringify(arr));
      setLocalHist(arr);
    } catch (e) {
      console.error('Error guardando transacción local:', e);
    }

    Alert.alert('Éxito', `Transacción registrada: ${nombre} (${tipo}) - Fecha: ${fecha} - Monto: $${valor}`);

    if (tipo === 'gasto') {
      setSaldoActual(saldoActual - valor);
    } else {
      setSaldoActual(saldoActual + valor);
    }

    setFecha('');
    setNombre('');
    setMonto('');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mi bolsillo</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Botón Atrás más abajo y accesible */}
        <TouchableOpacity
          style={styles.botonAtras}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.textoBoton}>←</Text>
        </TouchableOpacity>

        {/* Saldo */}
        <View style={styles.saldoContainer}>
          <Text style={styles.saldoLabel}>Saldo:</Text>
          <Text style={styles.saldoValor}>{saldoActual}</Text>
        </View>

        {/* Categoría actual */}
        {categoriaNombre && (
          <View style={styles.categoriaContainer}>
            <Text style={styles.categoriaTexto}>Categoría: {categoriaNombre}</Text>
          </View>
        )}

        {/* Tipo: Ingreso o Gasto */}
        <View style={styles.selector}>
          <Text style={styles.label}>Ingreso o gasto:</Text>
          <TouchableOpacity
            style={[styles.tipoButton, tipo === 'ingreso' && styles.tipoSelected]}
            onPress={() => setTipo('ingreso')}
          >
            <Text style={styles.tipoTexto}>Ingreso</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tipoButton, tipo === 'gasto' && styles.tipoSelected]}
            onPress={() => setTipo('gasto')}
          >
            <Text style={styles.tipoTexto}>Gasto</Text>
          </TouchableOpacity>
        </View>

        {/* Fecha */}
        <View style={styles.campo}>
          <Text style={styles.label}>Fecha:</Text>
          <TextInput
            style={styles.input}
            value={fecha}
            onChangeText={setFecha}
            placeholder="YYYY-MM-DD"
            keyboardType="numeric"
          />
        </View>

        {/* Nombre (Descripción) */}
        <View style={styles.campo}>
          <Text style={styles.label}>Nombre:</Text>
          <TextInput
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
            placeholder="Ej: Compra en supermercado"
          />
        </View>

        {/* Monto */}
        <View style={styles.campo}>
          <Text style={styles.label}>Monto:</Text>
          <TextInput
            style={styles.input}
            value={monto}
            onChangeText={setMonto}
            placeholder="Ej: 1500.00"
            keyboardType="numeric"
          />
        </View>

        {/* Botón Enviar */}
        <TouchableOpacity
          style={styles.botonEnviar}
          onPress={handleEnviar}
        >
          <Text style={styles.textoBoton}>Enviar</Text>
        </TouchableOpacity>

        {/* Historial local (se usa cuando backend no está disponible) */}
        <View style={styles.historialContainer}>
          <Text style={styles.historialTitulo}>Historial</Text>
          <View style={styles.historialBox}>
            {localHist.length === 0 ? (
              <Text style={styles.historialTexto}>No hay transacciones locales</Text>
            ) : (
              localHist.map((t) => (
                <Text key={t.id} style={styles.historialTexto}>{t.tipo === 'ingreso' ? '+' : '-'} ${Math.abs(t.monto).toFixed(2)} | {t.fecha} | {t.nombre}</Text>
              ))
            )}
          </View>
        </View>
      </ScrollView>
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
  botonAtras: {
  alignSelf: 'flex-start',
  backgroundColor: '#306488ff', // Gris claro
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 5,
  marginBottom: 20,
},
textoBoton: {
  fontSize: 16,
  color: '#fbf8f8ff', // Texto oscuro
  fontWeight: 'bold',
},
  
  saldoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  saldoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  saldoValor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3498db',
  },
  categoriaContainer: {
    marginBottom: 20,
  },
  categoriaTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  selector: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  tipoButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  tipoSelected: {
    backgroundColor: '#3498db',
  },
  tipoTexto: {
    fontSize: 16,
    color: '#333',
  },
  tipoSelected: {
    backgroundColor: '#3498db',
  },
  tipoTexto: {
    fontSize: 16,
    color: '#fff',
  },
  campo: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f0f0f0',
    fontSize: 16,
  },
  botonEnviar: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  historialContainer: {
    marginTop: 30,
  },
  historialTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  historialBox: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
  },
  historialTexto: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default TransaccionCategoria;