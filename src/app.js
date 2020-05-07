const geoCode=require('./utils/geoCode')
const forecast=require('./utils/forecast')
const path=require('path')
const express=require ('express')
const hbs=require('hbs')

//setup static and view directories
const statDirName=path.join(__dirname,'../public')
const viewDir=path.join(__dirname,'../templates/views')
const partPath=path.join(__dirname,'../templates/partials')

const app=express()

//setup static directory to serve
app.use(express.static(statDirName))

//setup handlebars and views location
app.set('view engine','hbs')
app.set('views',viewDir)
hbs.registerPartials(partPath)

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Naman Mishra'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About page of Weather App',
        name:'Naman Mishra'
    })
})


app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        name:'Naman',
        age:21
    })
})

app.get('/weather',(req,res)=>{
    if (!req.query.address){
        return res.send({
            error : 'Enter an address'
        })
    }      
    const location =req.query.address 
    geoCode(location,(error,{latitude,longitude,location}={})=>{
        if (error){
            return res.send({Error:error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                        return res.send({Error:error})
            }
            return (res.send({
                location,
                forecastData
            }))
        })  
    })        
})

app.get('/help/*',(req,res)=>{
    res.send({
        forecast:'Hazy',
        Location:'Phladelphia'
    })
})

app.get('/products',(req,res)=>{
    if (!req.query.search){
        return res.send({
            error:'Enter a search item'
        })
    }
    console.log(req.query)
     res.send({
        products:[]
        })
    }
)

app.get('*',(req,res)=>{
    res.render('404',{
        title:'Error',
        error:'Error 404....Page Not Found'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})