import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;
const SessaoSchema = new Schema({
    paciente: {
        type: _Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    psicologo: {
        type: _Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    notas: String,
    pagamento: {
        type: Number,
        default: 0
    },
    imposto: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['marcada', 'finalizada', 'cancelada'],
        default: 'marcada'
    }
});

export default model('Sessao', SessaoSchema);