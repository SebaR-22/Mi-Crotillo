// src/pantallas/principales/Estadisticas.js
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
let jsPDF, html2canvas;
if (typeof window !== 'undefined') {
  try {
    // Requerir las librerías para que Metro las incluya en la build web
    jsPDF = require('jspdf').default || require('jspdf');
    html2canvas = require('html2canvas').default || require('html2canvas');
  } catch (e) {
    console.warn('Librerías PDF no disponibles en este entorno:', e.message || e);
  }
}
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ScrollView,
} from 'react-native';

const Estadisticas = ({ navigation }) => {
  const [nombreSeccion, setNombreSeccion] = useState('');
  const [anio, setAnio] = useState('');
  const [mes, setMes] = useState('');

  // Datos simulados
  const data = [
    { name: 'Electricidad', value: 50, color: '#e74c3c' },
    { name: 'Agua', value: 30, color: '#3498db' },
    { name: 'Internet', value: 20, color: '#2ecc71' },
  ];

  const handleEnter = () => {
    if (!nombreSeccion || !anio || !mes) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }
    Alert.alert('Éxito', `Estadísticas de ${nombreSeccion} - ${mes}/${anio}`);
  };

  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/transacciones');
        if (!res.ok) throw new Error('Error al obtener historial');
        const dataHist = await res.json();
        // Normalizar forma: backend usa descripcion, nombre puede existir en local
        const normalized = dataHist.map(h => ({
          fecha: h.fecha || h.date || '',
          descripcion: h.descripcion || h.nombre || '',
          monto: typeof h.monto === 'number' ? h.monto : parseFloat(h.monto) || 0,
        }));
        setHistory(normalized);
        return;
      } catch (err) {
        console.error('Error fetch history:', err);
      }

      // Fallback: leer historial desde AsyncStorage (clave: 'transacciones')
      try {
        const raw = await AsyncStorage.getItem('transacciones');
        if (raw) {
          const local = JSON.parse(raw);
          const normalizedLocal = local.map(h => ({
            fecha: h.fecha || '',
            descripcion: h.descripcion || h.nombre || '',
            monto: typeof h.monto === 'number' ? h.monto : parseFloat(h.monto) || 0,
          }));
          setHistory(normalizedLocal);
        } else {
          setHistory([]);
        }
      } catch (e) {
        console.error('Error leyendo historial local:', e);
        setHistory([]);
      }
    };
    fetchHistory();
  }, []);

  const exportToPDF = async () => {
    if (!jsPDF || !html2canvas) {
      alert('Las librerías PDF no están disponibles en este entorno.');
      return;
    }

    if (!history || history.length === 0) {
      alert('No hay historial para exportar. Registra primero una transacción.');
      return;
    }

    try {
      const element = document.getElementById('pdf-content');
      if (!element) {
        alert('No se pudo encontrar la sección para exportar.');
        return;
      }

      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pageWidth - 20; // margen
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save('estadisticas_mibolsillo.pdf');
    } catch (err) {
      console.error('Error exportando PDF:', err);
      alert('Error al exportar PDF. Intentando fallback de texto...');
      // Fallback textual
      try {
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.text('Estadísticas MiBolsillo', 10, 10);
        let y = 20;
        data.forEach(item => {
          pdf.text(`${item.name}: ${item.value}%`, 10, y);
          y += 8;
        });
        y += 8;
        pdf.text('Historial:', 10, y);
        y += 8;
        history.forEach(h => {
          const desc = h.descripcion || '';
          const monto = typeof h.monto === 'number' ? h.monto : parseFloat(h.monto) || 0;
          pdf.text(`${h.fecha} - ${desc} - ${monto}`, 10, y);
          y += 8;
          if (y > 280) { pdf.addPage(); y = 10; }
        });
        pdf.save('estadisticas_mibolsillo_texto.pdf');
      } catch (e) {
        console.error('Fallback falló:', e);
        alert('No se pudo generar el PDF. Revisa la consola.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mi bolsillo</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Formulario */}
        <TextInput
          style={styles.input}
          placeholder="Nombre de la sección"
          value={nombreSeccion}
          onChangeText={setNombreSeccion}
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholder="Ingresar año"
          value={anio}
          onChangeText={setAnio}
          keyboardType="numeric"
          maxLength={4}
        />
        <TextInput
          style={styles.input}
          placeholder="Ingresar mes"
          value={mes}
          onChangeText={setMes}
          keyboardType="numeric"
          maxLength={2}
        />
        <Button title="Enter" onPress={handleEnter} />

        {/* Título y botón exportar */}
        <View style={styles.tituloRow}>
          <Text style={styles.titulo}>Gastos en {mes}/{anio}</Text>
          <Button title="Exportar PDF" onPress={exportToPDF} />
        </View>

        {/* Área que se exportará a PDF (gráfico + historial) */}
        <View id="pdf-content">
          {/* Gráfico de barras horizontales */}
          <View style={styles.graficoContainer}>
          {data.map((item, index) => (
            <View key={index} style={styles.barraItem}>
              <View style={styles.barraLabel}>
                <View style={[styles.colorIndicator, { backgroundColor: item.color }]} />
                <Text style={styles.barraNombre}>{item.name}</Text>
              </View>
              <View style={styles.barraProgreso}>
                <View
                  style={[
                    styles.barraRelleno,
                    { width: `${item.value}%`, backgroundColor: item.color },
                  ]}
                />
              </View>
              <Text style={styles.barraPorcentaje}>{item.value}%</Text>
            </View>
          ))}
          </View>

          {/* Historial (se incluirá en el PDF) */}
          <View style={styles.historialContainer}>
            <Text style={styles.historialTitle}>Historial</Text>
            {history.map((h, i) => (
              <View key={i} style={styles.histItem}>
                <Text style={styles.histFecha}>{h.fecha}</Text>
                <Text style={styles.histDesc}>{h.descripcion}</Text>
                <Text style={styles.histMonto}>{h.monto >= 0 ? `+$${h.monto}` : `-$${Math.abs(h.monto)}`}</Text>
              </View>
            ))}
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
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#f0f0f0',
    width: '100%',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  graficoContainer: {
    width: '100%',
    marginTop: 20,
  },
  barraItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    width: '100%',
  },
  barraLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '35%',
  },
  colorIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  barraNombre: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  barraProgreso: {
    flex: 1,
    height: 20,
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  barraRelleno: {
    height: '100%',
  },
  barraPorcentaje: {
    width: '15%',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#333',
  },
  tituloRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historialContainer: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  historialTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  histItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  histFecha: { width: '25%', color: '#555' },
  histDesc: { width: '55%', color: '#333' },
  histMonto: { width: '20%', textAlign: 'right', color: '#333' },
});

export default Estadisticas;