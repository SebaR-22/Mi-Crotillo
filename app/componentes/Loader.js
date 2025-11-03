
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
} from 'react-native';
import TemaColores from '../../estilos/TemaColores';

const PantallaSplash = ({ navigation }) => {
  // Animaciones
  const opacidadLogo = useRef(new Animated.Value(0)).current;
  const escalaLogo = useRef(new Animated.Value(0.3)).current;
  const opacidadTexto = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Secuencia de animaciones
    Animated.sequence([
      // 1. Aparece el logo con escala
      Animated.parallel([
        Animated.timing(opacidadLogo, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(escalaLogo, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]),
      // 2. Aparece el texto después
      Animated.timing(opacidadTexto, {
        toValue: 1,
        duration: 500,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // Navegar después de 3 segundos
    const timer = setTimeout(() => {
      // Aquí verificas si el usuario ya tiene sesión
      // Por ahora navegamos directo al Login
      navigation.replace('PantallaLogin');
      
      // Si el usuario ya tiene sesión activa:
      // navigation.replace('MenuPrincipal');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={estilos.contenedor}>
      {/* Logo animado */}
      <Animated.View
        style={[
          estilos.contenedorLogo,
          {
            opacity: opacidadLogo,
            transform: [{ scale: escalaLogo }],
          },
        ]}
      >
        <View style={estilos.circuloLogo}>
          <Image
            source={require('../../recursos/imagenes/logo/logo-mi-bolsillo.png')}
            style={estilos.logo}
            resizeMode="contain"
          />
        </View>
      </Animated.View>

      {/* Texto animado */}
      <Animated.View
        style={[
          estilos.contenedorTexto,
          { opacity: opacidadTexto },
        ]}
      >
        <Text style={estilos.titulo}>MI BOLSILLO</Text>
        <Text style={estilos.subtitulo}>app para tu bolsillo</Text>
      </Animated.View>

      {/* Versión de la app */}
      <Animated.View
        style={[
          estilos.contenedorVersion,
          { opacity: opacidadTexto },
        ]}
      >
        <Text style={estilos.textoVersion}>v1.0.0</Text>
      </Animated.View>
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: TemaColores.colores.azulPrimario,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contenedorLogo: {
    marginBottom: TemaColores.espaciado.extraGrande,
  },
  circuloLogo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: TemaColores.colores.fondoBlanco,
    justifyContent: 'center',
    alignItems: 'center',
    ...TemaColores.sombras.grande,
  },
  logo: {
    width: 100,
    height: 100,
  },
  contenedorTexto: {
    alignItems: 'center',
  },
  titulo: {
    fontSize: TemaColores.tipografia.tamañoMuyGrande,
    fontWeight: TemaColores.tipografia.pesoNegrita,
    color: TemaColores.colores.textoBlanco,
    letterSpacing: 2,
    marginBottom: TemaColores.espaciado.pequeño,
  },
  subtitulo: {
    fontSize: TemaColores.tipografia.tamañoNormal,
    fontWeight: TemaColores.tipografia.pesoNormal,
    color: TemaColores.colores.textoBlanco,
    opacity: 0.9,
  },
  contenedorVersion: {
    position: 'absolute',
    bottom: TemaColores.espaciado.extraGrande,
  },
  textoVersion: {
    fontSize: TemaColores.tipografia.tamañoPequeño,
    color: TemaColores.colores.textoBlanco,
    opacity: 0.7,
  },
});

export default PantallaSplash;