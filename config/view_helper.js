const env  = require('./environment')
const fs   = require('fs')
const path = require('path')

module.exports = (app)=>{
    app.locals.assetPath = (filePath)=>{
        if(env.name=='development'){
            console.log(env,' in Development Mode, Path is :',filePath)
            return filePath
        }

        return '/' + JSON.parse(fs.readFileSync(path.join(__dirname,'../public/assets/rev-manifest.json')))[filePath]
    }
}