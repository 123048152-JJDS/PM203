/*Zona 1: Importaciones de componentes y archivos */
import { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Animated,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

/*Zona 2: Main - Hogar de los componentes */
export default function ModalScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [selectedMode, setSelectedMode] = useState('Presencial');
  const [reservationConfirmed, setReservationConfirmed] = useState(false);

  function selectMode(mode) {
    setSelectedMode(mode);
    setSheetVisible(false);
    setReservationConfirmed(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reserva de laboratorios</Text>
      <Text style={styles.subtitle}>Clase práctica de React Native</Text>
      <Text style={styles.subtitle}>React Native: Modal y Bottom Sheet</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Laboratorio de computación</Text>
        <Text style={styles.cardText}>Duración: 2 horas</Text>
        <Text style={styles.cardText}>Modalidad: {selectedMode}</Text>
        <Text style={styles.cardText}>Estado: {reservationConfirmed ? 'Confirmada' : 'Pendiente'}</Text>
      </View>

      {/* Botón que abre el Modal de confirmación */}
      <Pressable style={styles.primaryButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.primaryButtonText}>Confirmar reservacion</Text>
      </Pressable>

      {/* Botón que abre el Bottom Sheet para elegir modalidad */}
      <Pressable style={styles.secondaryButton} onPress={() => setSheetVisible(true)}>
        <Text style={styles.secondaryButtonText}>Elegir modalidad</Text>
      </Pressable>

      {/* Modal de confirmación */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent
        statusBarTranslucent
        onShow={() => console.log('Modal de confirmación abierto')}
        onRequestClose={() => setModalVisible(false)}
      >
        {/* Contenido del Modal */}
        <View style={styles.overlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Confirmar reserva</Text>
            <Text style={styles.modalText}>¿Deseas reservar el laboratorio en modalidad {selectedMode}?</Text>

            <View style={styles.actionsRow}>
              <Pressable style={[styles.actionButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </Pressable>

              {/* Botón de confirmación que cierra el Modal y marca la reserva como confirmada */}
              <Pressable
                style={[styles.actionButton, styles.confirmButton]}
                onPress={() => {
                  setReservationConfirmed(true);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.confirmButtonText}>Confirmar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Bottom Sheet personalizado */}
      <BottomSheet
        visible={sheetVisible}
        onClose={() => setSheetVisible(false)}
        title="Elige modalidad"
        height={330}
      >
        {/* Opciones de modalidad */}
        <Pressable style={styles.optionButton} onPress={() => selectMode('Presencial')}>
          <Text style={styles.optionTitle}>Presencial</Text>
          <Text style={styles.optionText}>Asiste al laboratorio.</Text>
        </Pressable>

        <Pressable style={styles.optionButton} onPress={() => selectMode('En línea')}>
          <Text style={styles.optionTitle}>En línea</Text>
          <Text style={styles.optionText}>Recibe el enlace de videollamada.</Text>
        </Pressable>

        <Pressable style={styles.optionButton} onPress={() => selectMode('Grabación')}>
          <Text style={styles.optionTitle}>Grabación</Text>
          <Text style={styles.optionText}>Consulta la clase después.</Text>
        </Pressable>
      </BottomSheet>

      <StatusBar style="auto" />
    </View>
  );
}

/* Componente BottomSheet */
function BottomSheet({
  visible,
  onClose,
  title,
  height = 320,
  closeOnBackdropPress = true,
  children,
}) {
  {/* Animación de aparición y desaparición del Bottom Sheet */ }
  const translateY = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: visible ? 0 : height,
      duration: visible ? 250 : 200,
      useNativeDriver: true,
    }).start();
  }, [height, translateY, visible]);

  /* Renderizado del Bottom Sheet */
  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.sheetOverlay}>
        <Pressable
          style={styles.sheetBackdrop}
          onPress={closeOnBackdropPress ? onClose : undefined}
        />
        <Animated.View
          style={[
            styles.sheetContainer,
            { height, transform: [{ translateY }] },
          ]}
        >
          <View style={styles.sheetHandle} />
          <Text style={styles.sheetTitle}>{title}</Text>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
}

/*Zona 3: Estilos y Posicionamiento */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fb',
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 24,
  },
  title: { fontSize: 28, fontWeight: '700', color: '#18202f', marginBottom: 6 },
  subtitle: { fontSize: 15, color: '#5f6b7a', marginBottom: 20 },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#dfe4ea',
  },
  cardTitle: { fontSize: 20, fontWeight: '700', color: '#18202f', marginBottom: 10 },
  cardText: { fontSize: 16, color: '#3f4a5a', marginBottom: 6 },
  primaryButton: {
    backgroundColor: '#1f6feb',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  primaryButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
  secondaryButton: {
    backgroundColor: '#ffffff',
    borderColor: '#1f6feb',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  secondaryButtonText: { color: '#1f6feb', fontSize: 16, fontWeight: '700' },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: { width: '100%', backgroundColor: '#ffffff', borderRadius: 8, padding: 22 },
  modalTitle: { fontSize: 22, fontWeight: '700', color: '#18202f', marginBottom: 10 },
  modalText: { fontSize: 16, color: '#3f4a5a', marginBottom: 20 },
  actionsRow: { flexDirection: 'row', gap: 10 },
  actionButton: { flex: 1, borderRadius: 8, paddingVertical: 12, alignItems: 'center' },
  cancelButton: { backgroundColor: '#edf1f7' },
  confirmButton: { backgroundColor: '#1f6feb' },
  cancelButtonText: { color: '#3f4a5a', fontWeight: '700' },
  confirmButtonText: { color: '#ffffff', fontWeight: '700' },
  sheetOverlay: { flex: 1, justifyContent: 'flex-end' },
  sheetBackdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.35)' },
  sheetContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 24,
  },
  sheetHandle: {
    width: 44,
    height: 5,
    borderRadius: 999,
    backgroundColor: '#c7ced8',
    alignSelf: 'center',
    marginBottom: 16,
  },
  sheetTitle: { fontSize: 20, fontWeight: '700', color: '#18202f', marginBottom: 14 },
  optionButton: {
    borderWidth: 1,
    borderColor: '#dfe4ea',
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
    backgroundColor: '#f9fafc',
  },
  optionTitle: { fontSize: 16, fontWeight: '700', color: '#18202f', marginBottom: 4 },
  optionText: { fontSize: 14, color: '#5f6b7a' },
});