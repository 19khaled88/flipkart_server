const mongoose = require('mongoose')

const Con = async(user,pass,dbname) =>{
    const URL=`mongodb+srv://${user}:${pass}@cluster0.ka5da.mongodb.net/${dbname}?retryWrites=true&w=majority`;
    try {
        await mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true})
        console.log('Connected')
    } catch (error) {
        console.log('Error while connecting with the database', error.message)
    }
}

module.exports = Con





