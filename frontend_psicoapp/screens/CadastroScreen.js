import React, { useState } from "react";
import { View, Alert, ScrollView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from "react-native";
import { Text, TextInput, Button, ActivityIndicator, Snackbar }from "react-native-paper";
import { cadastroStyles } from '../styles/cadastroStyles';
import { API_URL } from "../config";

export default function CadastroScreen({ navigation }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('paciente');
    const [accessKey, setAccessKey] = useState('');
    const [loading, setLoading] = useState(false);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState('');

    const cadastrar = async () => {
        if (!nome || !email || !senha || !confirmarSenha) {
            setSnackbarMsg('Por favor, preencha todos os campos');
            setSnackbarVisible(true);
            return;
        }

        if (senha !== confirmarSenha) {
            setSnackbarMsg('As senhas não coincidem');
            setSnackbarVisible(true);
            return;
        }

        if (senha.length < 6) {
            setSnackbarMsg('A senha deve ter pelo menos 6 caracteres');
            setSnackbarVisible(true);
            return;
        }

        if (tipoUsuario === "psicologo" && !accessKey) { 
            setSnackbarMsg("Por favor, informe a chave de acesso."); 
            setSnackbarVisible(true); 
            return; 
        } 

        const body = { nome, email, senha, tipoUsuario };
        if (tipoUsuario === 'psicologo') body.accessKey = accessKey;

        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            });
            const data = await response.json();

            if (response.ok) {
                Alert.alert(
                    'Sucesso',
                    'Cadastro realizado com sucesso! Agora você pode fazer o login.',
                    [{ text: 'Fazer login', onPress: () => navigation.goBack() }] 
                );
            } else {
                setSnackbarMsg(data.message);
                setSnackbarVisible(true);
            }
        } catch (error) {
            console.error('Erro ao cadastrar: ', error);
        } finally {
            setLoading(false);
        }
    };

    return ( 
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
            <KeyboardAvoidingView behavior="height" style={cadastroStyles.container}> 
                <ScrollView contentContainerStyle={cadastroStyles.contentContainer}> 
                    <Text variant="headlineMedium" style={cadastroStyles.title}> 
                        Cadastro 
                    </Text> 
            
                    <TextInput 
                        label="Nome" 
                        value={nome} 
                        onChangeText={setNome} 
                        style={cadastroStyles.input} 
                        mode="outlined" 
                    /> 
            
                    <TextInput 
                        label="E-mail" 
                        value={email} 
                        onChangeText={setEmail} 
                        keyboardType="email-address" 
                        autoCapitalize="none" 
                        style={cadastroStyles.input} 
                        mode="outlined" 
                    /> 
            
                    <TextInput 
                        label="Senha" 
                        value={senha} 
                        onChangeText={setSenha} 
                        secureTextEntry 
                        style={cadastroStyles.input} 
                        mode="outlined" 
                    /> 
            
                    <TextInput 
                        label="Confirmar Senha" 
                        value={confirmarSenha} 
                        onChangeText={setConfirmarSenha} 
                        secureTextEntry 
                        style={cadastroStyles.input} 
                        mode="outlined" 
                    /> 
            
                    {tipoUsuario === "psicologo" && ( 
                        <TextInput 
                        label="Chave de Acesso" 
                        value={accessKey} 
                        onChangeText={setAccessKey} 
                        style={cadastroStyles.input} 
                        mode="outlined" 
                        /> 
                    )} 
            
                    <Button 
                        mode="outlined" 
                        onPress={() => 
                        setTipoUsuario(tipoUsuario === "paciente" ? "psicologo" : "paciente") 
                        } 
                        style={cadastroStyles.toggleButton} 
                    > 
                        Usuário: {tipoUsuario === "paciente" ? "Paciente" : "Psicólogo"} 
                    </Button> 
            
                    {loading ? ( 
                        <ActivityIndicator 
                        animating={true} 
                        size="large" 
                        color="#6a0dad" 
                        style={{ marginVertical: 20 }} 
                        /> 
                    ) : ( 
                        <Button 
                        mode="contained" 
                        onPress={cadastrar} 
                        style={cadastroStyles.submitButton} 
                        contentStyle={{ paddingVertical: 8 }} 
                        > 
                        Cadastrar 
                        </Button> 
                    )} 
            
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
                </ScrollView> 
            </KeyboardAvoidingView> 
        </TouchableWithoutFeedback> 
  ); 
}
