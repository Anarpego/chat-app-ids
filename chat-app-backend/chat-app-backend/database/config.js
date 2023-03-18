
const mongoose = require('mongoose');

const dbConnection = async () => {
    try {


        await mongoose.connect(process.env.DB_CNN_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true
        })

        console.log('Db conectada :l')

    } catch (error) {
        console.error(error);
        throw new Error('Error en la base de datos - ver log :( ')
    }
}

module.exports = {
    dbConnection
}