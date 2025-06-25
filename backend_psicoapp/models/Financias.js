import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;
const FinanciasSchema = new Schema({
    psicologo: {
        type: _Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    paciente: {
        type: _Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    pagamento: {
        type: Number,
        required: true
    },
    imposto: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default model('Financias', FinanciasSchema);