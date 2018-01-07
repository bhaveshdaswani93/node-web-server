const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

hbs.registerPartials(path.join(__dirname,'/views/partials'))
hbs.registerHelper('getcurrentYear',()=>{
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase()
})

app.set('view engine','hbs');



app.use((req,res,next)=>{
    const date = new Date().toString();
    const log = `${date}: ${req.url} ${req.method}`

    console.log(log);
    fs.appendFile('server.log',log+'\n',(err)=>{
        if (err) {
            console.log('unable to append to the file reason: ',err);
        }
    })
    next()
})
app.use(express.static(path.join(__dirname, '/public')));
// app.use((req,res,next)=>{
//     res.render('maintaince.hbs');
// })

app.get('/',(req,res)=>{
    // res.send('Hello world');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        
        welcomeMessage: 'Hello have great year ahead'
    })

})

app.get('/about',(req,res)=>{
    // res.send({
    //     name:'bhavesh',
    //     likes:['cricket']
    // })
    res.render('about.hbs',{
        pageTitle:'about Us'
    });
})

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:'There is some issue processing your request'
    })
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port} `)
});