import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
import { ITask } from 'src/interface/item.interface';


@Schema({ timestamps: true })
export class Item extends Document implements ITask {

  @Prop()
  title: string;

  @Prop()
  markdown: string;

  @Prop()
  description: string;
  @Prop()
  status: boolean;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
