import { ObjectId } from "mongodb";

interface User {
  _id?: ObjectId;
  created_at?: number;
  updated_at?: number | null;
  [key: string]: any;
}

export { User }