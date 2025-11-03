// src/pantallas/autenticacion/PantallaLogin.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import TemaColores from '../../estilos/temaColores';

const PantallaLogin = ({ navigation }) => {
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [contraseña, setContraseña] = useState('');

  const manejarLogin = () => {
    // Aquí irá la lógica de autenticación
    console.log('Login con:', correoElectronico, contraseña);
    // navigation.navigate('Dashboard');
  };

  const irARegistro = () => {
    navigation.navigate('PantallaRegistro');
  };

  const olvidoContraseña = () => {
    navigation.navigate('PantallaRecuperarPassword');
  };

  return (
    <KeyboardAvoidingView
      style={estilos.contenedor}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={estilos.scrollContenido}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo y título */}
        <View style={estilos.contenedorLogo}>
          <View style={estilos.circuloLogo}>
            <Image
              source={require('../../recursos/imagenes/logo/logo-mi-bolsillo.png')}
              style={estilos.logo}
              resizeMode="contain"
            />
          </View>
          
          <Text style={estilos.titulo}>Bienvenidos</Text>
          <Text style={estilos.subtitulo}>a la app</Text>
          <Text style={estilos.nombreApp}>mi bolsillo</Text>
        </View>

        {/* Formulario */}
        <View style={estilos.contenedorFormulario}>
          {/* Campo de correo electrónico */}
          <TextInput
            style={estilos.input}
            placeholder="correo electronico"
            placeholderTextColor={TemaColores.colores.textoGris}
            value={correoElectronico}
            onChangeText={setCorreoElectronico}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          {/* Campo de contraseña */}
          <TextInput
            style={estilos.input}
            placeholder="contraseña"
            placeholderTextColor={TemaColores.colores.textoGris}
            value={contraseña}
            onChangeText={setContraseña}
            secureTextEntry
            autoCapitalize="none"
          />

          {/* Botón de entrar */}
          <TouchableOpacity
            style={estilos.botonEntrar}
            onPress={manejarLogin}
            activeOpacity={0.8}
          >
            <Text style={estilos.textoBotonEntrar}>entrar</Text>
          </TouchableOpacity>

          {/* Olvidé mi contraseña */}
          <TouchableOpacity
            onPress={olvidoContraseña}
            activeOpacity={0.7}
          >
            <Text style={estilos.textoOlvido}>olvide mi contraseña</Text>
          </TouchableOpacity>

          {/* Registrarse */}
          <TouchableOpacity
            onPress={irARegistro}
            activeOpacity={0.7}
          >
            <Text style={estilos.textoRegistro}>registrarse</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: TemaColores.colores.fondoBlanco,
  },
  scrollContenido: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: TemaColores.espaciado.grande,
    paddingVertical: TemaColores.espaciado.muyGrande,
  },
  contenedorLogo: {
    alignItems: 'center',
    marginBottom: TemaColores.espaciado.extraGrande,
  },
  circuloLogo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: TemaColores.colores.fondoGrisClaro,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: TemaColores.espaciado.grande,
    ...TemaColores.sombras.media,
  },
  logo: {
    width: 80,
    height: 80,
  },
  titulo: {
    fontSize: TemaColores.tipografia.tamañoGrande,
    fontWeight: TemaColores.tipografia.pesoNormal,
    color: TemaColores.colores.textoOscuro,
    marginTop: TemaColores.espaciado.medio,
  },
  subtitulo: {
    fontSize: TemaColores.tipografia.tamañoMedio,
    fontWeight: TemaColores.tipografia.pesoNormal,
    color: TemaColores.colores.textoOscuro,
  },
  nombreApp: {
    fontSize: TemaColores.tipografia.tamañoMedio,
    fontWeight: TemaColores.tipografia.pesoNormal,
    color: TemaColores.colores.azulPrimario,
    textDecorationLine: 'underline',
  },
  contenedorFormulario: {
    width: '100%',
  },
  input: {
    height: TemaColores.dimensiones.alturaInput,
    backgroundColor: TemaColores.colores.fondoGris,
    borderRadius: TemaColores.bordes.radioMedio,
    paddingHorizontal: TemaColores.espaciado.normal,
    fontSize: TemaColores.tipografia.tamañoNormal,
    color: TemaColores.colores.textoOscuro,
    marginBottom: TemaColores.espaciado.normal,
  },
  botonEntrar: {
    height: TemaColores.dimensiones.alturaBotoNormal,
    backgroundColor: TemaColores.colores.fondoGris,
    borderRadius: TemaColores.bordes.radioMedio,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: TemaColores.espaciado.medio,
    marginBottom: TemaColores.espaciado.grande,
  },
  textoBotonEntrar: {
    fontSize: TemaColores.tipografia.tamañoNormal,
    fontWeight: TemaColores.tipografia.pesoMedio,
    color: TemaColores.colores.textoOscuro,
  },
  textoOlvido: {
    fontSize: TemaColores.tipografia.tamañoPequeño,
    color: TemaColores.colores.textoOscuro,
    textAlign: 'center',
    marginBottom: TemaColores.espaciado.normal,
  },
  textoRegistro: {
    fontSize: TemaColores.tipografia.tamañoPequeño,
    color: TemaColores.colores.textoOscuro,
    textAlign: 'center',
  },
});

export default PantallaLogin;