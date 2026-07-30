import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getAuthFetchOptions } from "../utils/auth"; // Ajusta la ruta según tu estructura

export default function EditarUsuariosScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { id, nombre: nombreActual, edad: edadActual } = params;

  const [nombre, setNombre] = useState(nombreActual || "");
  const [edad, setEdad] = useState(edadActual || "");
  const [cargando, setCargando] = useState(false);

  const mostrarMensaje = (titulo, mensaje) => {
    if (Platform.OS === "web") {
      window.alert(`${titulo}\n${mensaje}`);
    } else {
      Alert.alert(titulo, mensaje);
    }
  };

  const actualizarUsuario = async () => {
    if (nombre.trim() === "" || edad.trim() === "") {
      mostrarMensaje("Campos vacíos", "Todos los campos son obligatorios");
      return;
    }

    try {
      setCargando(true);

      const respuesta = await fetch(
        `http://127.0.0.1:5000/v1/usuarios/${id}`,
        getAuthFetchOptions("PUT", {
          nombre: nombre.trim(),
          edad: parseInt(edad),
        })
      );

      if (respuesta.ok) {
        mostrarMensaje("Éxito", "Usuario actualizado correctamente");
        router.back();
      } else {
        const datos = await respuesta.json();
        mostrarMensaje("Error", datos.detail || "No se pudo actualizar");
      }
    } catch (error) {
      console.error("Error al actualizar:", error);
      mostrarMensaje("Error", "No se pudo conectar con el servidor");
    } finally {
      setCargando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Editar Usuario</Text>
        <Text style={styles.subtitulo}>ID: {id}</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre del usuario"
          value={nombre}
          onChangeText={setNombre}
        />

        <TextInput
          style={styles.input}
          placeholder="Edad del usuario"
          keyboardType="numeric"
          value={edad}
          onChangeText={setEdad}
        />

        <Pressable
          style={[styles.boton, cargando && styles.botonDeshabilitado]}
          onPress={actualizarUsuario}
          disabled={cargando}
        >
          {cargando ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.textoBoton}>Guardar cambios</Text>
          )}
        </Pressable>

        <Pressable style={styles.botonCancelar} onPress={() => router.back()}>
          <Text style={styles.textoCancelar}>Cancelar</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 14,
    textAlign: 'center',
    color: '#6B7280',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 18,
    backgroundColor: '#F9FAFB',
    fontSize: 16,
  },
  boton: {
    backgroundColor: '#2563EB',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
  },
  botonDeshabilitado: {
    opacity: 0.6,
  },
  textoBoton: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  botonCancelar: {
    marginTop: 12,
    alignItems: 'center',
  },
  textoCancelar: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '600',
  },
});