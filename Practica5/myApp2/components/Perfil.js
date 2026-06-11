/*Perfil usando Desestructuracion */
import { View, Text, Button } from 'react-native';
import React,{useState} from 'react';

export const Perfil = ({ nombre, carrera, materia, cuatrimestre }) => {
    const [mostrar, setMostrar]=useState(false);
    return (
        <View>
            <Text>Nombre: {nombre}</Text>

            {/* Rendelizado Condicional */}
            {mostrar && 
            <>
                <Text>Carrera: {carrera}</Text>
                <Text>Materia: {materia}</Text>
                <Text>Cuatrimestre: {cuatrimestre}</Text>
            </>
            }
            <Button title="Mostrar Perfil" onPress={ ()=>{setMostrar(!mostrar)}}/>
            
        </View>
    );
};

/* Perfil usando Props*/
/*
import { View, Text } from 'react-native';

export const Perfil = (props) => {
    return (
        <View>
            <Text>Nombre: {props.nombre}</Text>
            <Text>Carrera: {props.carrera}</Text>
            <Text>Materia: {props.materia}</Text>
            <Text>Cuatrimestre: {props.cuatrimestre}</Text>
        </View>
    );
};
*/