import React, { useState, useContext } from "react";
import { View, Alert, ScrollView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from "react-native";
import { Text, TextInput, Button, ActivityIndicator, Snackbar, Card }from "react-native-paper";
import { UserContext } from "../userContext";
import { API_URL } from "../config";
import { feedbackStyles } from '../styles/feedbackStyles';

export default function FeedbackScreen({ navigation }) {
    const { user } = useContext(UserContext);
    const [respostas, setRespostas] = useState(['', '', '', '']);
    const [resultado, setResultado] = useState('');
    const [saving, setSaving] = useState(false);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState('');

    const enviarFeedback = async () => {
        if (respostas.some(r => r === '' || isNaN(r) || +r < 0 || +r > 3)) {
            setSnackbarMsg('Todos os campos devem ser preenchidos com números entre 0 e 3.');
            setSnackbarVisible(true);
            return;
        }

        setSaving(true);
        const body = {
            user: user.id,
            estresse: +respostas[0],
            ansiedade: +respostas[1],
            tristeza: +respostas[2],
            desanimo: +respostas[3]
        };
        try {
            const response = await fetch(`${API_URL}/feedback/add`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            });
            const data = await response.json();
            setResultado(data.feedback);
            setSnackbarMsg('Feedback enviado com sucesso!');
            setSnackbarVisible(true);
        } catch (error) {
            console.error('Erro', error);
            Alert.alert('Erro', `Não foi possível enviar: ${error}`);
        } finally {
            setSaving(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView 
                behavior="height"
                style={feedbackStyles.container}
            >
                <ScrollView contentContainerStyle={feedbackStyles.contentContainer}>
                    <Card>
                        <Card.Title title="Feedback de Bem-Estar" />
                        <Card.Content>
                            {['Estresse', 'Ansiedade', 'Tristeza', 'Desanimo'].map((q, i) => (
                                <TextInput key={i} 
                                    style={feedbackStyles.input} 
                                    label={`${q} (0-3)`} 
                                    keyboardType="numeric" 
                                    mode="outlined"
                                    onChangeText={t => {const r = [...respostas]; r[i] = t; setRespostas(r)}}
                                />
                            ))}
                            {saving ? (
                                <ActivityIndicator animating={true} size='large' color='#007BFF' />
                            ) : (
                                <Button mode="contained" style={feedbackStyles.button} onPress={enviarFeedback}>
                                    Enviar Feedback
                                </Button>
                            )}
                            <Button mode="outlined" style={feedbackStyles.historicoButton} onPress={() => navigation.navigate('FeedbackUser')}>Histórico de Feedbacks</Button>
                            {resultado ? <Text style={feedbackStyles.resultado}>{resultado}</Text> : null}
                            <Snackbar 
                                visible={snackbarVisible} 
                                onDismiss={() => setSnackbarVisible(false)} 
                                duration={3000} 
                                action={{ 
                                label: "Fechar", 
                                onPress: () => setSnackbarVisible(false), 
                                }} 
                            > 
                                {snackbarMsg} 
                            </Snackbar>
                        </Card.Content>
                    </Card>
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}