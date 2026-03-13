import { Request, Response } from 'express';
import ShoppingItem from '../models/ShoppingItem';

export const createItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const novoItem = new ShoppingItem(req.body);
    const itemSalvo = await novoItem.save();
    res.status(201).json(itemSalvo);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar item', error });
  }
};

export const getItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const itens = await ShoppingItem.find();
    res.status(200).json(itens);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar itens', error });
  }
};

export const getItemById = async (req: Request, res: Response): Promise<void> => {
  try {
    const item = await ShoppingItem.findById(req.params.id);
    if (!item) {
      res.status(404).json({ message: 'Item não encontrado' });
      return;
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar o item', error });
  }
};

export const updateItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const itemAtualizado = await ShoppingItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!itemAtualizado) {
      res.status(404).json({ message: 'Item não encontrado' });
      return;
    }
    res.status(200).json(itemAtualizado);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar item', error });
  }
};

export const deleteItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const itemDeletado = await ShoppingItem.findByIdAndDelete(req.params.id);
    if (!itemDeletado) {
      res.status(404).json({ message: 'Item não encontrado' });
      return;
    }
    res.status(200).json({ message: 'Item excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir item', error });
  }
};