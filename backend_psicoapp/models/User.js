import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;
const userSchema = new Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    senha: { 
        type: String,
        required: true
    },
    tipoUsuario: {
        type: String,
        enum: ['paciente', 'psicologo'],
        default: 'paciente',
        required: true
    }
});

export default model('User', userSchema);
