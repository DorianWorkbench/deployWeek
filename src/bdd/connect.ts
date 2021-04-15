import mongoose from "mongoose";
import {MongoMemoryReplSet} from "mongodb-memory-server";

export async function connect(){
    if(process.env.NODE_ENV === "test"){
        const replSet = new MongoMemoryReplSet({
            replSet: { storageEngine: 'wiredTiger' },
          });
        await replSet.waitUntilRunning();
        const uri = await replSet.getUri();
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);
        return await mongoose.connect(uri, {useUnifiedTopology:true, useNewUrlParser:true});
    }else{
        return await mongoose.connect(process.env.DB_TEST!, {useUnifiedTopology:true, useNewUrlParser:true});
    }
}