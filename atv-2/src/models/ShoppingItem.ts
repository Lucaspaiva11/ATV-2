import mongoose, { Schema, Document } from 'mongoose';

export interface IShoppingItem extends Document {
  nome: string;
  valor: number;
}

const ShoppingItemSchema: Schema = new Schema({
  nome: { type: String, required: true },
  valor: { type: Number, required: true }
});

// Forçando o nome da coleção sugerido na atividade
export default mongoose.model<IShoppingItem>('ShoppingItem', ShoppingItemSchema, 'shoppingitems');