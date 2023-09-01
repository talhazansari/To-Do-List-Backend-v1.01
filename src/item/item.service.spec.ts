import { Test, TestingModule } from '@nestjs/testing';
import { ItemService } from './item.service';
import { ItemRepository } from '../repository/itemrepository';
import { CreateItemDto } from '../dto/create-item.dto';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item } from '../schema/item.schema';
import { ITask } from 'src/interface/item.interface';
import { UpdateItemDto } from '../dto/update-item.dto';
describe('ItemService', () => {
  let itemService: ItemService;
  let itemRepository: ItemRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemService,
        ItemRepository,
        {
          provide: getModelToken(Item.name),
          useValue: Model,
        },
      ],
    }).compile();
    itemService = module.get<ItemService>(ItemService);
    itemRepository = module.get<ItemRepository>(ItemRepository);
  });
  describe('createItem', () => {
    it('should create an item', async () => {
      const createItemDto: CreateItemDto = {
        description: 'helllo',
        title: 'dasdaads',
        markdown: 'dsadadsa',
        status: true,
      };
      const newItem = {
        description: 'helllo',
        title: 'dasdaads',
        markdown: 'dsadadsa',
        status: true,
      };
      jest
        .spyOn(itemRepository, 'createItem')
        .mockImplementation(() => Promise.resolve(newItem));
      const createdItem = await itemService.createItem(createItemDto);
      expect(createdItem).toEqual(newItem);
    });

    it('should throw an error if item creation fails', async () => {
      const createItemDto: CreateItemDto = {
        description: 'helllo',
        title: 'dasdaads',
        markdown: 'dsadadsa',
        status: true,
      };
      const errorMessage = 'Item creation failed';
      jest
        .spyOn(itemRepository, 'createItem')
        .mockRejectedValue(new Error(errorMessage));
      await expect(itemService.createItem(createItemDto)).rejects.toThrowError(
        errorMessage,
      );
    });
  });
  describe('deleteItem', () => {
    it('should delete an item', async () => {
      const deletedItem = {
        _id: '45678987654567dsss',
        description: 'helllo',
        title: 'dasdaads',
        markdown: 'dsadadsa',
        status: true,
      };
      jest
        .spyOn(itemRepository, 'deleteItem')
        .mockImplementation(async (): Promise<ITask> => {
          return deletedItem;
        });
      expect(await itemService.deleteItem(deletedItem._id)).toEqual(
        deletedItem,
      );
    });
    it('should throw an error if item deletion fails', async () => {
      const itemIdToDelete = 'item-id-to-delete';
      const errorMessage = 'Item deletion failed';
      jest
        .spyOn(itemRepository, 'deleteItem')
        .mockRejectedValue(new Error(errorMessage));
      await expect(itemService.deleteItem(itemIdToDelete)).rejects.toThrowError(
        errorMessage,
      );
    });
  });
  describe('getAllItems', () => {
    it('should get all items', async () => {
      const allItems = [
        {
          _id: '45678987654567dsss',
          description: 'helllo',
          title: 'dasdaads',
          markdown: 'dsadadsa',
          status: true,
        },
        {
          _id: '45678987654567dsss',
          description: 'helllo',
          title: 'dasdaads',
          markdown: 'dsadadsa',
          status: true,
        },
      ];
      jest.spyOn(itemRepository, 'findAllItems').mockResolvedValue(allItems);
      const result = await itemService.getAllItems();
      expect(result).toEqual(allItems);
    });
    it('should throw an error if fetching items fails', async () => {
      const errorMessage = 'Failed to fetch items';
      jest
        .spyOn(itemRepository, 'findAllItems')
        .mockRejectedValue(new Error(errorMessage));
      await expect(itemService.getAllItems()).rejects.toThrowError(
        errorMessage,
      );
    });
  });
  describe('updateItem', () => {
    it('should update an item', async () => {
      const itemIdToUpdate = 'item-id-to-update';
      const updateItemDto: UpdateItemDto = {
        description: 'helllo',
        title: 'dasdaads',
        markdown: 'dsadadsa',
        status: true,
      };
      const updatedItem = {
        _id: itemIdToUpdate,
        description: 'helllo',
        title: 'dasdaads',
        markdown: 'dsadadsa',
        status: true,
      };
      jest.spyOn(itemRepository, 'updateItem').mockResolvedValue(updatedItem);
      const result = await itemService.updateItem(
        itemIdToUpdate,
        updateItemDto,
      );
      expect(result).toEqual(updatedItem);
      expect(itemRepository.updateItem).toHaveBeenCalledWith(
        itemIdToUpdate,
        updateItemDto,
      );
    });
    it('should throw an error if item update fails', async () => {
      const itemIdToUpdate = 'item-id-to-update';
      const updateItemDto: UpdateItemDto = {
        description: 'helllo',
        title: 'dasdaads',
        markdown: 'dsadadsa',
        status: true,
      };
      const errorMessage = 'Item update failed';
      jest
        .spyOn(itemRepository, 'updateItem')
        .mockRejectedValue(new Error(errorMessage));
      await expect(
        itemService.updateItem(itemIdToUpdate, updateItemDto),
      ).rejects.toThrowError(errorMessage);
    });
  });
});
