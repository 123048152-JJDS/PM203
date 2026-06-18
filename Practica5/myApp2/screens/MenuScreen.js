/*Zona 1: Importaciones de componentes y archivos */

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import React, { useState } from 'react';
import TarjetasScreen from './TarjetasScreen';
import SafeAreaScreen from './SafeAreaScreen';
import PressableScreen from './PressableScreen';
import TextInputScreen from './TextInputScreen';
import FlatListScreen from './FlatListScreen';
import ImageBackgroundScreen from './ImageBackgroundScreen';
import ActivityIndicatorScreen from './ActivityIndicatorScreen';
import ModalScreen from './ModalScreen';



/*Zona 2: Main - Hogar de los componentes */
export default function MenuScreen() {
    const [screen, setScreen] = useState('menu');

    switch (screen) {
        case 'tarjetas':
            return <TarjetasScreen />;
        case 'safeArea':
            return <SafeAreaScreen />;
        case 'Pressable':
            return <PressableScreen />;
        case 'TextInput':
            return <TextInputScreen />;
        case 'FlatList':
            return <FlatListScreen />;
        case 'ImageBackground':
            return <ImageBackgroundScreen />;
        case 'ActivityIndicator':
            return <ActivityIndicatorScreen />;
        case 'Modal':
            return <ModalScreen />;

        case 'menu':
            default:
            return (
                <View style={styles.container}>
                    <Text>Menú de Practicas</Text>
                    <Button onPress={()=>setScreen('tarjetas')} title='Practica: Tarjetas' />
                    <Button onPress={()=>setScreen('safeArea')} title='Practica: SafeArea' />
                    <Button onPress={()=>setScreen('Pressable')} title='Practica: Pressable' />
                    <Button onPress={()=>setScreen('TextInput')} title='Practica: TextInput' />
                    <Button onPress={()=>setScreen('FlatList')} title='Practica: FlatList' />
                    <Button onPress={()=>setScreen('ImageBackground')} title='Practica: ImageBackground' />
                    <Button onPress={()=>setScreen('ActivityIndicator')} title='Practica: ActivityIndicator' />
                    <Button onPress={()=>setScreen('Modal')} title='Practica: Modal' />
                    <StatusBar style="auto" />

                </View>
            );
    }
}

/*Zona 3: Estilos y Posicionamiento */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'column',
    },
});
