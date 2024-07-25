const mongooose = require('mongoose')

mongooose.connect("mongodb+srv://praneethdevarasetty31:8qgJLzdzAjMvKssx@cluster0.myjyejx.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log("Connection Successfull...")
})
.catch((err)=>{
    console.log("We Got An error i.e :")
    console.log(err)
})

const db = mongooose.connection;
module.exports = db