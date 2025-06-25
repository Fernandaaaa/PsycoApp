import React, { useState, useEffect, useContext } from "react";
import { View, Alert, ScrollView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from "react-native";
import { Text, TextInput, Button, ActivityIndicator, Snackbar, Surface }from "react-native-paper";
import { UserContext } from "../userContext";
import { API_URL } from "../config";
import { diarioStyles } from '../styles/diarioStyles';

export default function DiarioEmocionalScreen({ navigation }) {
    const { user } = useContext(UserContext);
    const [humorGeral, setHumorGeral] = useState('');
    const [descricao, setDescricao] = useState('');
    const [saving, setSaving] = useState(false);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState('');

    const humorEmojis = {
        'Muito Feliz': '😄', 'Feliz': '😊', 'Neutro': '😐', 'Triste': '😞',
        'Ansioso': '😟', 'Irritado': '😡', 'Cansado': '😴', 'Grato': '🙏'
    };

    const salvarRegistro = async () => {
        if (!humorGeral || !descricao.trim()) {
            setSnackbarMsg('Selecione um humor e digite uma descrição.'); 
            setSnackbarVisible(true); 
            return;
        }

        setSaving(true);
        try {
            await fetch(`${API_URL}/diario/add`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ user: user.id, text: `${humorGeral}: ${descricao}` })
            });
            setHumorGeral('');
            setDescricao('');
            setSnackbarMsg('Entrada salva no Diário!'); 
            setSnackbarVisible(true); 
        } catch (error) {
            console.error('Erro:', error);
            setSnackbarMsg(error.message); 
            setSnackbarVisible(true); 
        } finally {
            setSaving(false);
        }
    };

    

    return ( 
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
            <KeyboardAvoidingView behavior="height" style={diarioStyles.container}> 
                <ScrollView contentContainerStyle={diarioStyles.contentContainer}> 
                    <Text variant="headlineMedium" style={{ marginBottom: 12 }}>
                        Diário Emocional
                    </Text> 
                    <Text variant="titleMedium" style={{ marginBottom: 20 }}>
                        Como você se sente?
                    </Text> 
                    <View style={diarioStyles.moodSelector}> 
                        {Object.entries(humorEmojis).map(([humor, emoji]) => ( 
                        <Surface 
                            key={humor} 
                            elevation={humorGeral === humor ? 6 : 2} 
                            style={[ 
                            diarioStyles.moodButton, 
                            humorGeral === humor && diarioStyles.selectedMoodButton 
                            ]} 
                            onTouchEnd={() => setHumorGeral(humor)} 
                        > 
                            <Text style={diarioStyles.moodEmoji}>{emoji}</Text> 
                            <Text style={diarioStyles.moodText}>{humor}</Text> 
                        </Surface> 
                        ))} 
                    </View> 
                    <TextInput 
                        label="Descreva seus sentimentos" 
                        mode="outlined" 
                        multiline 
                        numberOfLines={4} 
                        value={descricao} 
                        onChangeText={setDescricao} 
                        style={{ marginVertical: 20 }} 
                    /> 
                    {saving ? ( 
                        <ActivityIndicator animating size="large" /> 
                    ) : ( 
                        <Button mode="contained" onPress={salvarRegistro} style={{ marginBottom: 10 }}> 
                        Salvar no Diário 
                        </Button> 
                    )} 
                    <Button mode="outlined" onPress={() => navigation.navigate('DiarioUser')}> 
                        Histórico de Registros 
                    </Button> 
                    <Snackbar 
                        visible={snackbarVisible} 
                        onDismiss={() => setSnackbarVisible(false)} 
                        duration={3000} 
                    > 
                        {snackbarMsg} 
                    </Snackbar> 
                </ScrollView> 
            </KeyboardAvoidingView> 
        </TouchableWithoutFeedback> 
  ); 
}
