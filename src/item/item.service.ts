import { Injectable} from '@nestjs/common';
import { CreateItemDto } from 'src/dto/create-item.dto';
import { UpdateItemDto } from 'src/dto/update-item.dto';
import { ITask } from 'src/interface/item.interface';
import { ItemRepository } from '../repository/itemrepository';
@Injectable()
export class ItemService {
  constructor(
    private readonly itemRepository: ItemRepository,
  ) {}
  async createItem(dtoCI: CreateItemDto): Promise<ITask> {
    const newItem: ITask = { ...dtoCI };
    return await this.itemRepository.createItem(newItem);
  }
  async getAllItems(): Promise<ITask[]> {
    return this.itemRepository.findAllItems();
  }
  async getItem(itemID: string): Promise<ITask> {
    return this.itemRepository.getItem(itemID);
  }
  async deleteItem(itemID: string): Promise<ITask> {
    return this.itemRepository.deleteItem(itemID);
  }
  async updateItem(itemID: string, updateItemDto: UpdateItemDto): Promise<ITask> {
    const newItem: ITask = { ...updateItemDto };
    return await this.itemRepository.updateItem(itemID, newItem);
  }
}
