import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, StyleSheet, StatusBar, useColorScheme } from 'react-native';

// Tema Claro
export const temaClaro = {
  fondo: '#ffffff',
  fondoSecundario: '#f5f5f5',
  fondoTerciario: '#e9ecef',
  textoBase: '#333333',
  textoPrimario: '#000000',
  textoSecundario: '#666666',
  primario: '#3498db',
  secundario: '#2ecc71',
  acento: '#e74c3c',
  borde: '#dddddd',
  fondoInput: '#f0f0f0',
  fondoCard: '#ffffff',
  barraProgreso: '#ecf0f1',
  error: '#e74c3c',
  exito: '#2ecc71',
  advertencia: '#f1c40f',
  info: '#3498db',
  separador: '#e0e0e0',
  placeholder: '#999999',
  sombra: '#000000',
  overlay: 'rgba(0,0,0,0.5)',
  iconoInactivo: '#95a5a6',
  textoBoton: '#ffffff',
  fondoBoton: '#3498db',
  fondoBotonSecundario: '#2ecc71',
  fondoBotonDesactivado: '#bdc3c7',
  textoBotonDesactivado: '#7f8c8d',
};

// Tema Oscuro con tonos violeta
export const temaOscuro = {
  fondo: '#121212',
  fondoSecundario: '#1e1e1e',
  fondoTerciario: '#2d2d2d',
  textoBase: '#e0e0e0',
  textoPrimario: '#ffffff',
  textoSecundario: '#b0b0b0',
  primario: '#9c27b0', // Violeta principal
  secundario: '#7c4dff', // Violeta secundario
  acento: '#e040fb', // Violeta acento
  borde: '#333333',
  fondoInput: '#2d2d2d',
  fondoCard: '#1e1e1e',
  barraProgreso: '#333333',
  error: '#ff1744',
  exito: '#00e676',
  advertencia: '#ffab00',
  info: '#2196f3',
  separador: '#333333',
  placeholder: '#666666',
  sombra: '#000000',
  overlay: 'rgba(0,0,0,0.7)',
  iconoInactivo: '#666666',
  textoBoton: '#ffffff',
  fondoBoton: '#9c27b0',
  fondoBotonSecundario: '#7c4dff',
  fondoBotonDesactivado: '#424242',
  textoBotonDesactivado: '#666666',
  // Colores específicos del tema oscuro
  violetaPrincipal: '#9c27b0',
  violetaClaro: '#ba68c8',
  violetaOscuro: '#6a1b9a',
  negro: '#000000',
  negroSecundario: '#121212',
  negroTerciario: '#1e1e1e',
};

const TemaContext = createContext();

export const TemaProvider = ({ children }) => {
  const sistemaColorScheme = useColorScheme();
  const [modoOscuro, setModoOscuro] = useState(false);
  const [temaActual, setTemaActual] = useState(temaClaro);
  const [temaInicializado, setTemaInicializado] = useState(false);

  // Cargar preferencia de tema guardada
  useEffect(() => {
    const cargarTema = async () => {
      try {
        const temaGuardado = await AsyncStorage.getItem('modoOscuro');
        if (temaGuardado !== null) {
          const modoOscuroGuardado = JSON.parse(temaGuardado);
          setModoOscuro(modoOscuroGuardado);
          setTemaActual(modoOscuroGuardado ? temaOscuro : temaClaro);
        } else {
          // Si no hay tema guardado, usar el del sistema
          const usarModoOscuro = sistemaColorScheme === 'dark';
          setModoOscuro(usarModoOscuro);
          setTemaActual(usarModoOscuro ? temaOscuro : temaClaro);
        }
        setTemaInicializado(true);
      } catch (error) {
        console.error('Error al cargar el tema:', error);
        setTemaActual(temaClaro);
        setTemaInicializado(true);
      }
    };

    cargarTema();
  }, [sistemaColorScheme]);

  // Función para cambiar el tema
  const toggleTema = async () => {
    try {
      const nuevoModoOscuro = !modoOscuro;
      setModoOscuro(nuevoModoOscuro);
      setTemaActual(nuevoModoOscuro ? temaOscuro : temaClaro);
      await AsyncStorage.setItem('modoOscuro', JSON.stringify(nuevoModoOscuro));
      
      // Actualizar la barra de estado
      StatusBar.setBarStyle(nuevoModoOscuro ? 'light-content' : 'dark-content');
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor(nuevoModoOscuro ? '#121212' : '#ffffff');
      }
    } catch (error) {
      console.error('Error al guardar el tema:', error);
    }
  };

  // Actualizar la barra de estado cuando cambia el tema
  useEffect(() => {
    if (temaInicializado) {
      StatusBar.setBarStyle(modoOscuro ? 'light-content' : 'dark-content');
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor(modoOscuro ? '#121212' : '#ffffff');
      }
    }
  }, [modoOscuro, temaInicializado]);

  const valor = {
    tema: temaActual,
    modoOscuro,
    toggleTema,
    temaInicializado,
  };

  if (!temaInicializado) {
    return null; // O un componente de carga
  }

  return (
    <TemaContext.Provider value={valor}>
      {children}
    </TemaContext.Provider>
  );
};

export const useTema = () => {
  const context = useContext(TemaContext);
  if (!context) {
    throw new Error('useTema debe ser usado dentro de un TemaProvider');
  }
  return context;
};

// Hooks de utilidad para estilos
export const useEstilosBase = () => {
  const { tema } = useTema();
  
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: tema.fondo,
    },
    contenido: {
      padding: 20,
      flex: 1,
    },
    texto: {
      color: tema.textoBase,
      fontSize: 16,
    },
    textoPrimario: {
      color: tema.textoPrimario,
      fontSize: 16,
      fontWeight: 'bold',
    },
    textoSecundario: {
      color: tema.textoSecundario,
      fontSize: 14,
    },
    input: {
      backgroundColor: tema.fondoInput,
      color: tema.textoBase,
      borderWidth: 1,
      borderColor: tema.borde,
      borderRadius: 8,
      padding: 12,
      marginBottom: 15,
      width: '100%',
    },
    boton: {
      backgroundColor: tema.fondoBoton,
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 2,
      shadowColor: tema.sombra,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    textoBoton: {
      color: tema.textoBoton,
      fontSize: 16,
      fontWeight: 'bold',
    },
    tarjeta: {
      backgroundColor: tema.fondoCard,
      borderRadius: 12,
      padding: 15,
      marginVertical: 8,
      elevation: 3,
      shadowColor: tema.sombra,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    separador: {
      height: 1,
      backgroundColor: tema.separador,
      marginVertical: 10,
    },
    header: {
      backgroundColor: tema.primario,
      paddingVertical: 15,
      paddingHorizontal: 20,
      elevation: 4,
      shadowColor: tema.sombra,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    headerTitulo: {
      color: tema.textoPrimario,
      fontSize: 20,
      fontWeight: 'bold',
    },
  });
};