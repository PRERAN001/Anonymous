import mongoose from "mongoose";

type Connectionobject={
isconnected?:number
}

const connnection:Connectionobject={}

export async function dbconnect():Promise<void>{
    if(connnection.isconnected){
        console.log("already connected")
        return
    }
    try {
        const db=await mongoose.connect(process.env.MONGO_URI!)
        connnection.isconnected=db.connections[0].readyState    
        console.log("connected to db")
    } catch (error) {
        console.log("error connecting to db",error)
        process.exit(1)
        
    }


}