import { Chat } from '@/models'
import { DocumentType } from '@typegoose/typegoose'

declare module 'telegraf' {
  export class Context {
    dbchat: DocumentType<Chat>
  }
}
