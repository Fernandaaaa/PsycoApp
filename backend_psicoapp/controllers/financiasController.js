import mongoose from "mongoose";
import Financias from "../models/Financias.js";

export const getByPsicologo = async (req, res) => {
    try {
        const psicologoId = new mongoose.Types.ObjectId(req.params.id);
        const relatorios = await Financias.find({ psicologo: psicologoId }).populate('paciente', 'nome').populate('psicologo', 'nome').sort({ date: -1 });
        res.status(200).json(relatorios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno no servidor' });
    }
};

export const getByPaciente = async (req, res) => {
    try {
        const pacienteId = new mongoose.Types.ObjectId(req.params.id);
        const relatorios = await Financias.find({ paciente: pacienteId }).populate('paciente', 'nome').populate('psicologo', 'nome').sort({ date: -1 });
        res.status(200).json(relatorios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno no servidor' });
    }
};