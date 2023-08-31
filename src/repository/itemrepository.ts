import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITask } from 'src/interface/item.interface';
@Injectable()
export class ItemRepository {
  constructor(@InjectModel('Item') private itemModel: Model<ITask>) {}
  async createItem(task: ITask): Promise<ITask> {
    const newItem = await this.itemModel.create(task);
    return newItem;
  }
  async findAllItems(): Promise<ITask[]> {
    const itemData = await this.itemModel.find().exec();
    if (!itemData || itemData.length === 0) {
      throw new NotFoundException('Item Data Not Found');
    }
    return itemData;
  }
  async getItem(itemID: string): Promise<ITask> {
    const existingItem = await this.itemModel.findById(itemID);
    if (!existingItem) {
      throw new NotFoundException(`Item ${itemID} not found`);
    }
    return existingItem;
  }
  async deleteItem(itemID: string): Promise<ITask> {
    const deletedItem = await this.itemModel.findByIdAndDelete(itemID);
    if (!deletedItem) {
      throw new NotFoundException(`Item #${itemID} not found`);
    }
    return deletedItem;
  }
  async updateItem(itemID: string, task: ITask): Promise<ITask> {
    const updatedItem = await this.itemModel.findByIdAndUpdate(
      itemID,
      task,
      { new: true }
    );
    if (!updatedItem) {
      throw new NotFoundException(`Item #${itemID} not found`);
    }
    return updatedItem;
  }
}