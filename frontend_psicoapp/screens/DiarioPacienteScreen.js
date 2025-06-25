import React, { useEffect, useState } from "react";
import { View, FlatList, ScrollView } from "react-native";
import { Text, ActivityIndicator, Card } from "react-native-paper";
import { API_URL } from "../config";
import { diarioPacienteStyles } from '../styles/diarioPacienteStyles';
import { loadingStyles } from "../styles/loadingStyles";

const emojiMap = {
    'Muito Feliz': '😄', 'Feliz': '😊', 'Neutro': '😐', 'Triste': '😞',
    'Ansioso': '😟', 'Irritado': '😡', 'Cansado': '😴', 'Grato': '🙏'
};

export default function DiarioPacienteScreen({ route }) {
    const { paciente } = route.params;
    const [registros, setRegistros] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        carregarRegistros();
    }, []);

    const carregarRegistros = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/diario/paciente/${paciente._id}`);
            const data = await response.json();
            setRegistros(data);
        } catch (error) {
            console.error('Erro:', error);
            Alert.alert('Erro ao carregar registros:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const parseEntrada = (entrada) => {
        const [humor, ...descricaoParts] = entrada.text.split(':');
        const descricao = descricaoParts.join(':').trim();
        return {
            humor: humor.trim(),
            emoji: emojiMap[humor.trim()], 
            descricao
        };
    };

    if (loading) {
        return (
            <View style={loadingStyles.loadingContainer}>
                <ActivityIndicator size="large" color="#6a0dad" />
                <Text style={loadingStyles.loadingText}>Carregando diário...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={diarioPacienteStyles.container}>
            <Text style={diarioPacienteStyles.titulo}>Histórico do Diário de {paciente.nome}:</Text>
            {registros.length > 0 ? (
                registros.map((registro) => {
                    const { humor, emoji, descricao } = parseEntrada(registro);
                    const dataFormatada = new Date(registro.date).toLocaleDateString();

                    return (
                        <View key={registro._id} style={diarioPacienteStyles.card}>
                            <View style={diarioPacienteStyles.cardHeader}>
                                <Text style={diarioPacienteStyles.cardDate}>{dataFormatada}</Text>
                                <Text style={diarioPacienteStyles.cardEmoji}>{emoji}</Text>
                            </View>
                            <Text style={diarioPacienteStyles.cardDescricao}>{descricao}</Text>
                        </View>
                    );
                })
            ) : (
                <Text style={diarioPacienteStyles.noRecordsText}>Nenhum registro de diario.</Text>
            )}
        </ScrollView>
    );
}
