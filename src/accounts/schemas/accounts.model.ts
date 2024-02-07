import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AccountDocument = Account & Document;

@Schema()
export class Account {
  @Prop({ required: true })
  userName: string;

  @Prop()
  checking: number;

  @Prop()
  savings: number;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
