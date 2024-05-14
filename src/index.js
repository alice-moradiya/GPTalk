const express = require("express");

const app = express();

app.get('ping', (req, res)=> {
    res.json({
        message: "pong",
    })
})

app.listen(3000, ()=>{
    console.log('server is listening on 3000')
})
