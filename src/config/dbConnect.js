import mongoose from "mongoose";

mongoose.connect("mongodb+srv://alura-library:123@alura.jh6chpn.mongodb.net/alura-library");

let db = mongoose.connection;

export default db;