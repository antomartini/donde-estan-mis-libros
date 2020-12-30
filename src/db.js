const mongoose = require('mongoose');

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PW}@where-is-my-books.utvpb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

async function conectar() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log("Conectado a BD metodo: Mongoodb Atlas - async-await");
    } catch (e) {
        console.log(e);
    }
};

conectar();