/*Zona 1: Importaciones de componentes y archivos */
import {useState} from 'react';
import { StyleSheet, Text, View, Pressable, Switch, Alert, StatusBar } from 'react-native';


/*Zona 2: Main - Hogar de los componentes */
export default function PressableScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSwitch = () => setIsDarkMode(previousState => !previousState);
  return (
    <View style={[ styles.container, isDarkMode ? styles.bgDark : styles.bgLight]}>
        <Text style={[styles.title, isDarkMode ? styles.textDark : styles.textLight ]}> Ajuste del Sistema </Text>
        
        <View style={styles.row}>
          <Text style={[styles.text, isDarkMode ? styles.textDark : styles.textLight ]}> 
            Modo Oscuro {isDarkMode ? "Activado" : "Desactivado"} 
            </Text>
        </View>
        <Switch 
          trackColor={{ false: 'black', true: 'white' }}
          thumbColor={isDarkMode ? 'yellow' : 'gray'}
          onValueChange={toggleSwitch}
          value={isDarkMode}
          disabled={false}
        />

        <Pressable
          onPress={() => Alert.alert('Exito', 'Has presionado el botón')}
          onLongPress={() => Alert.alert('Exito', 'Has presionado el botón por mucho tiempo')}
          delayLongPress={2000}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? 'blue' : 'green' },
          ]}
        >
          <Text style={styles.buttonText}>Presioname</Text>
        </Pressable>

        <StatusBar style="auto" /> 
    </View>
  );
}

/*Zona 3: Estilos y Posicionamiento */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  bgLight: { backgroundColor: '#f5f5f5' },
  
  bgDark: { backgroundColor: '#121212' },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },

  textLight: { color: '#000' },

  textDark: { color: '#fff' },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 40,
    paddingHorizontal: 20,
  },

  label: { fontSize: 18 },

  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 8,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});