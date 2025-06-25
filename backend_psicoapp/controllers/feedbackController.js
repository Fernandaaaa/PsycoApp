import FeedbackEntry from "../models/FeedbackEntry.js";

export const addFeedback = async (req, res) => {
    const { user, estresse, ansiedade, tristeza, desanimo } = req.body;
    const total = estresse + ansiedade + tristeza + desanimo;

    let feedback = 'Bem-estar adequado';
    if (total >= 8) feedback = 'Procure apoio profissional';
    else if (total >= 4) feedback = 'Atenção ao seu bem-estar';

    const novoFeedback = new FeedbackEntry({ user, estresse, ansiedade, tristeza, desanimo, feedback });
    await novoFeedback.save();
    res.status(201).json(novoFeedback);
};

export const getByUser = async (req, res) => {
    const entradas = await FeedbackEntry.find({ user: req.params.id }).sort({ date: -1 });
    res.status(200).json(entradas);
};
