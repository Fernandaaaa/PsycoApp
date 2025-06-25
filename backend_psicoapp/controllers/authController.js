import User from "../models/User.js";
const PSICOLOGO_KEY = '171';

export const register = async (req, res) => {
    const { nome, email, senha, tipoUsuario, accessKey } = req.body;
    if (tipoUsuario === 'psicologo' && accessKey !== PSICOLOGO_KEY) {
        return res.status(403).json({ message: 'Chave inválida' });
    }

    const existe = await User.findOne({ email });
    if (existe) return res.status(400).json({ message: 'Usuário já existe' });

    const novoUsuario = new User({ nome, email, senha, tipoUsuario });
    await novoUsuario.save();
    res.status(201).json({ message: 'Cadastrado com sucesso' });
};

export const login = async (req, res) => {
    const { email, senha } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.senha !== senha) {
        return res.status(401).json({ message: 'Email ou senha incorretos' });
    }
    res.status(200).json({ user: { id: user._id, nome: user.nome, email: user.email, tipoUsuario: user.tipoUsuario } });
};
