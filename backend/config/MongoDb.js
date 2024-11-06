import mongoose from "mongoose";
import {ServerApiVersion} from 'mongodb';
export function HandlerForMongoDbConnection(url){
  return mongoose.connect(url,{
    serverApi:{
      version:ServerApiVersion.v1,
      strict:true,
      deprecationErrors:true
    }
  })
}