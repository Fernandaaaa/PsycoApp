import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { Appbar, Card, ActivityIndicator, Text } from 'react-native-paper';
import { API_URL } from "../config";
import { loadingStyles } from "../styles/loadingStyles";
import { feedbackPacienteStyles } from '../styles/feedbackPacienteStyles';

export default function FeedbackUserScreen({ navigation, route }) {
    const { paciente } = route.params;
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        carregarFeedbacks();
    }, []);

    const carregarFeedbacks = async () => {
        try {
            const response = await fetch(`${API_URL}/feedback/paciente/${paciente._id}`);
            const data = await response.json();
            setFeedbacks(data);
        } catch (error) {
            console.error('Erro', error);
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => (
        <Card style={feedbackPacienteStyles.card} mode="outlined">
            <Card.Title
                title={`Data: ${new Date(item.date).toLocaleDateString('pt-BR')} às ${new
                Date(item.date).toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'})}`}
            />
            <Card.Content>
                <Text variant="bodyMedium">Estresse: {item.estresse}</Text>
                <Text variant="bodyMedium">Ansiedade: {item.ansiedade}</Text>
                <Text variant="bodyMedium">Tristeza: {item.tristeza}</Text>
                <Text variant="bodyMedium">Desânimo: {item.desanimo}</Text>
                <Text variant="bodyMedium">Comentário: {item.feedback}</Text>
            </Card.Content>
        </Card>

    );

    if (loading) {
        return (
            <View style={loadingStyles.loadingContainer}>
                <ActivityIndicator size="large" color="#6a0dad" />
                <Text style={loadingStyles.loadingText}>Carregando Feedbacks...</Text>
            </View>
        );
    }

    return (
        <View style={feedbackPacienteStyles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title='Feedbacks do Paciente' />
            </Appbar.Header>
            {feedbacks.length > 0 ? (
            <FlatList
                data={feedbacks}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 10 }}
            />
            ) : (
                <Text style={feedbackPacienteStyles.noRecordsText}>Nenhum Feedback encontrado.</Text>
            )}
        </View>
    );
}
