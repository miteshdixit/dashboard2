const mongoose = require("mongoose");


const DataBase = async () => { 
await mongoose.connect('mongodb+srv://miteshdixit741:LHQrU5hKZJp7pLAZ@cluster0.8zzmz8z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('DB Connected!'));
}

  module.exports = DataBase;