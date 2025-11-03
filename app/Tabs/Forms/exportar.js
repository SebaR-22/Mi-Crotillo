import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { registrarUsuario, crearCategoria } from "../SQL/SQL";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

export default function Exportar({ navigation }) {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [categoria, setCategoria] = useState("");

  // ---------- REGISTRO DE USUARIO ----------
  const handleRegister = async () => {
    await registrarUsuario(usuario, password);
    Alert.alert("Éxito", "Usuario registrado");
    setUsuario("");
    setPassword("");
    navigation.navigate("Form"); // vuelve al login
  };

  // ---------- CREAR CATEGORIA ----------
  const handleCategoria = async () => {
    await crearCategoria(categoria);
    Alert.alert("Éxito", "Categoría creada");
    setCategoria("");
  };

  // ---------- EXPORTAR GASTOS A PDF ----------
  const exportarPDF = async (gastos) => {
    let tabla = gastos
      .map(
        (g) => `
        <tr>
          <td>${g.categoria}</td>
          <td>${g.monto}</td>
          <td>${g.fecha}</td>
        </tr>`
      )
      .join("");

    const html = `
      <html>
        <body>
          <h1>Reporte de Gastos</h1>
          <table border="1" style="width:100%; border-collapse: collapse;">
            <tr>
              <th>Categoría</th>
              <th>Monto</th>
              <th>Fecha</th>
            </tr>
            ${tabla}
          </table>
        </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({ html });

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri);
    } else {
      Alert.alert("PDF generado", uri);
    }
  };

  // Para probar: simulamos lista de gastos
  const gastosEjemplo = [
    { categoria: "Comida", monto: 1500, fecha: "01/10/2025" },
    { categoria: "Transporte", monto: 800, fecha: "02/10/2025" },
    { categoria: "Otros", monto: 500, fecha: "03/10/2025" },
  ];

  return (
    <View style={{ padding: 20 }}>
      {/* --- Registro --- */}
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Registrarse</Text>
      <TextInput
        placeholder="Nuevo usuario"
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
      <Button title="Crear cuenta" onPress={handleRegister} />

      {/* --- Categorías --- */}
      <View style={{ marginTop: 30 }}>
        <Text style={{ fontSize: 20, marginBottom: 10 }}>Crear Categoría</Text>
        <TextInput
          placeholder="Nombre de categoría"
          value={categoria}
          onChangeText={setCategoria}
          style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
        />
        <Button title="Guardar categoría" onPress={handleCategoria} />
      </View>

      {/* --- Exportar PDF --- */}
      <View style={{ marginTop: 30 }}>
        <Text style={{ fontSize: 20, marginBottom: 10 }}>Exportar gastos</Text>
        <Button title="Generar PDF" onPress={() => exportarPDF(gastosEjemplo)} />
      </View>
    </View>
  );
}
