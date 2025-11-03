/* Pagina con los formularios, inicio y registrarse. Creacion de categoria y conectarlos con archivo sql.js */

import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { verificarUsuario } from "../SQL/SQL"; // usamos funciones del archivo SQL.js

export default function Form({ navigation }) {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const valido = await verificarUsuario(usuario, password);
    if (valido) {
      Alert.alert("Bienvenido", usuario);
      navigation.navigate("Inicio"); // lo manda a Inicio.js
    } else {
      Alert.alert("Error", "Usuario o contraseña incorrectos");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Iniciar Sesión</Text>
      <TextInput
        placeholder="Usuario"
        value={usuario}
        onChangeText={setUsuario}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <Button title="Ingresar" onPress={handleLogin} />
    </View>
  );
}

