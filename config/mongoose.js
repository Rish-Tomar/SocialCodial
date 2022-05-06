const mongoose= require('mongoose')
const env = require('./environment')
mongoose.connect(`mongodb://localhost/${env.db}`)


const db=mongoose.connection

db.on('error',console.error.bind(console,'error connecting '))

db.once('open',function(){
    console.log('Conneted to DB')
})



module.exports = db