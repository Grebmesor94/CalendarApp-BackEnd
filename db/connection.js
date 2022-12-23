import mongoose from 'mongoose'

export const connectDB = async() => { 
  try {
    mongoose.connect( process.env.DBCONNECTION )
    console.log('Database online');
  } catch (error) {
    console.log(error);
    
  }
}