
import { Request, Response } from 'express';
import Pessoa from './pessoaModels';

// Função para criar uma nova pessoa
export const criarPessoa = async (req: Request, res: Response) => {
  try {
    const novaPessoa = await Pessoa.create(req.body);
    res.status(201).json(novaPessoa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar pessoa' });
  }
};
// Função para buscar todas as pessoas
export const buscarPessoas = async (req: Request, res: Response) => {
  try {
    const pessoas = await Pessoa.findAll();
    res.status(200).json(pessoas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar pessoas' });
  }
};

// Função para buscar uma pessoa pelo ID
export const buscarPessoaPorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pessoa = await Pessoa.findByPk(id);
    if (!pessoa) {
      return res.status(404).json({ message: 'Pessoa não encontrada' });
    }
    res.status(200).json(pessoa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar pessoa' });
  }
};

// Função para atualizar uma pessoa pelo ID
export const atualizarPessoa = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pessoa = await Pessoa.findByPk(id);
    if (!pessoa) {
      return res.status(404).json({ message: 'Pessoa não encontrada' });
    }
    await pessoa.update(req.body);
    res.status(200).json(pessoa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar pessoa' });
  }
};

// Função para deletar uma pessoa pelo ID
export const deletarPessoa = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pessoa = await Pessoa.findByPk(id);
    if (!pessoa) {
      return res.status(404).json({ message: 'Pessoa não encontrada' });
    }
    await pessoa.destroy();
    res.status(200).json({ message: 'Pessoa deletada com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar pessoa' });
  }
};
const pessoa = {
  criarPessoa,
  buscarPessoas,
  buscarPessoaPorId,
  atualizarPessoa,
  deletarPessoa,
};

export default pessoa;