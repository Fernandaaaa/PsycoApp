import React, { useContext } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Alert } from "react-native";
import { Appbar, Text } from "react-native-paper";
import { UserContext } from "../userContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ConsultasScreen from "./ConsultasScreen";
import DiarioEmocionalScreen from "./DiarioEmocionalScreen";
import FeedbackScreen from "./FeedbackScreen";
import FinanciasScreen from "./FinanciasScreen";

const Tab = createMaterialTopTabNavigator();

export default function HomePaciente() {
    const { setUser } = useContext(UserContext);

    const handleLogout = async () => {
        Alert.alert(
            'Sair', 'Tem certeza que deseja sair?',
            [
                {text: 'Cancelar', style: 'cancel'},
                {text: 'Sair', onPress: async () => {
                    try {
                        await AsyncStorage.removeItem('users');
                        setUser(null);
                    } catch (error) {
                        console.error('Erro: ', error);
                        Alert.alert('Erro', 'Não foi possível sair. Tente novamente');
                    }
                }}
            ],
            {cancelable: true}
        );
    };

    return (
        <>
            <Appbar.Header>
                <Appbar.Content title="Minha Jornada" />
                <Appbar.Action icon="logout" onPress={handleLogout} />
            </Appbar.Header>

            <Tab.Navigator 
                screenOptions={{
                    tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
                    tabBarIndicatorStyle: { backgroundColor: '#2a63ff' },
                    tabBarActiveTintColor: '#2a63ff',
                    tabBarInactiveTintColor: '#6c757d',
                }}
            >
                <Tab.Screen name="Consultas" component={ConsultasScreen} />
                <Tab.Screen name="Diário" component={DiarioEmocionalScreen} />
                <Tab.Screen name="Feedback" component={FeedbackScreen} />
                <Tab.Screen name="Financeiro" component={FinanciasScreen} />
            </Tab.Navigator>
        </>
    );
}
