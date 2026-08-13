import { View, Text, StyleSheet, Pressable, Modal, ActivityIndicator, Alert, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { API_URL } from "../../../utils/config";

export default function DetalleVehiculoScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { id, marca, modelo, año, anio, color } = params;  
  const añoMostrar = año || anio || 'N/A';

  const [modalVisible, setModalVisible] = useState(false);
  const [cargando, setCargando] = useState(false);

  const mostrarMensaje = (titulo, mensaje) => {
    if (Platform.OS === "web") {
      window.alert(`${titulo}\n${mensaje}`);
    } else {
      Alert.alert(titulo, mensaje);
    }
  };

  const eliminarVehiculo = async () => {
  try {
    setCargando(true);
    const respuesta = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (respuesta.ok) {
      mostrarMensaje("Éxito", "Vehículo eliminado correctamente");
      setModalVisible(false);
      router.replace("/consulta");
    } else {
      const datos = await respuesta.json();
      mostrarMensaje("Error", datos.detail || "No se pudo eliminar");
      setModalVisible(false);
    }
  } catch (error) {
    console.error(error);
    mostrarMensaje("Error", "No se pudo conectar con el servidor");
    setModalVisible(false);
  } finally {
    setCargando(false);
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Detalle del Vehículo</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>ID:</Text>
          <Text style={styles.value}>{id}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Marca:</Text>
          <Text style={styles.value}>{marca}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Modelo:</Text>
          <Text style={styles.value}>{modelo}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Año:</Text>
          <Text style={styles.value}>{añoMostrar}</Text> 
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Color:</Text>
          <Text style={styles.value}>{color}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.boton, styles.botonEditar]}
            onPress={() => {
              router.push({
                pathname: "/consulta/actualizar",
                params: {
                  id,
                  marca,
                  modelo,
                  año: añoMostrar, 
                  color,
                },
              });
            }}
          >
            <Text style={styles.textoBoton}>Editar</Text>
          </Pressable>

          <Pressable
            style={[styles.boton, styles.botonEliminar]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.textoBoton}>Eliminar</Text>
          </Pressable>
        </View>

        <Pressable
          style={styles.botonVolver}
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace("/consulta");
            }
          }}
        >
          <Text style={styles.textoVolver}>← Volver a la lista</Text>
        </Pressable>
      </View>

      {/* Modal de confirmación */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitulo}>Confirmar eliminación</Text>
            <Text style={styles.modalMensaje}>
              ¿Estás seguro de eliminar a{" "}
              <Text style={{ fontWeight: "bold" }}>{marca} {modelo}</Text>?
            </Text>
            <Text style={styles.modalAdvertencia}>
              Esta acción no se puede deshacer.
            </Text>

            <View style={styles.modalBotones}>
              <Pressable
                style={[styles.modalBoton, styles.modalBotonCancelar]}
                onPress={() => setModalVisible(false)}
                disabled={cargando}
              >
                <Text style={styles.modalTextoCancelar}>Cancelar</Text>
              </Pressable>

              <Pressable
                style={[
                  styles.modalBoton,
                  styles.modalBotonEliminar,
                  cargando && styles.botonDeshabilitado,
                ]}
                onPress={eliminarVehiculo}
                disabled={cargando}
              >
                {cargando ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Text style={styles.modalTextoEliminar}>Eliminar</Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 25,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 25,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4B5563",
  },
  value: {
    fontSize: 16,
    color: "#1F2937",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
    gap: 12,
  },
  boton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  botonEditar: {
    backgroundColor: "#2563EB",
  },
  botonEliminar: {
    backgroundColor: "#DC2626",
  },
  textoBoton: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  botonVolver: {
    marginTop: 20,
    alignItems: "center",
  },
  textoVolver: {
    color: "#1f6feb",
    fontSize: 16,
    fontWeight: "600",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  modalTitulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 12,
  },
  modalMensaje: {
    fontSize: 16,
    color: "#4B5563",
    textAlign: "center",
    marginBottom: 8,
  },
  modalAdvertencia: {
    fontSize: 14,
    color: "#DC2626",
    textAlign: "center",
    marginBottom: 24,
    fontStyle: "italic",
  },
  modalBotones: {
    flexDirection: "row",
    gap: 12,
  },
  modalBoton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  modalBotonCancelar: {
    backgroundColor: "#E5E7EB",
  },
  modalBotonEliminar: {
    backgroundColor: "#DC2626",
  },
  modalTextoCancelar: {
    color: "#4B5563",
    fontWeight: "700",
    fontSize: 16,
  },
  modalTextoEliminar: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
  botonDeshabilitado: {
    opacity: 0.6,
  },
});