/*Zona 1: Importaciones de componentes y archivos */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Perfil } from '../components/Perfil';

/*Zona 2: Main - Hogar de los componentes */
export default function TarjetasScreen() {
  return (
    <View style={styles.container}>
      
      <Perfil estiloExt={styles.tarjetaRoja} nombre="Jesus Jimenez De Santiago" carrera="Ingeniería en Sistemas Computacionales" materia="Programación Móvil" cuatrimestre="9° Cuatrimestre" />

      <Perfil estiloExt={styles.tarjetaVerde} nombre="Jesus" carrera="ISC" materia="Programación Móvil" cuatrimestre="9°" />

      <Perfil estiloExt={styles.tarjetaRoja} nombre="Santiago" carrera="Ingeniería en Sistemas Computacionales" materia="Programación Móvil" cuatrimestre="9° Cuatrimestre" />
      
      <StatusBar style="auto" />
    </View>
  );
}

/*Zona 3: Estilos y Posicionamiento */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  tarjetaRoja:{
    backgroundColor: '#FF6B6B',},
    
  tarjetaVerde:{
    backgroundColor: '#6BFF6B',},
});
