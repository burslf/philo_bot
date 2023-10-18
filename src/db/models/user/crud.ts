import { ObjectId } from "mongodb";
import { getDb } from "../../_connection";
import { User } from "./model";

export const UserCRUD = {
    save: async (user: User) => {
        const db = getDb();
        const collection = db.collection('user');
    
        user.created_at = Math.floor(Date.now() / 1000);
        user.updated_at = null;
        
        const { insertedId } = await collection.insertOne(user);
        user._id = insertedId;
    
        return user
    },
    
    findOneById: async (id: ObjectId): Promise<User | null> => {
        const db = getDb();
        const collection = db.collection('user')
    
        const user: any = await collection.findOne({ _id: id })
        
        return user
    },
    
    findAll: async (): Promise<User[]> => {
        const db = getDb();
        const collection = db.collection('user')
    
        const users: any = await collection.find({}).toArray()
    
        return users
    },
    
    findOneByTgUserId: async(tg_user_id: number): Promise<User | null> => {
        const db = getDb();
        const collection = db.collection('user')
    
        const user: any = await collection.findOne({ tg_user_id: tg_user_id })
        
        return user
    },
    
    update: async(user_id: string, payload: any): Promise<User> => {
        const db = getDb();
        const collection = db.collection('user')
    
        payload.updated_at = Math.floor(Date.now() / 1000);
        
        const {value}: any = await collection.findOneAndUpdate(
            { _id: new ObjectId(user_id) },
             { $set: payload },
              {returnDocument: 'after'}
        )

        return value
    },
    
    delete: async (user_id: string) => {
        const db = getDb();
        const collection = db.collection('user')
    
        await collection.deleteOne({ _id: new ObjectId(user_id) })
    },

    
}