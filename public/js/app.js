
const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')
const messageThree=document.querySelector('#message-3')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    console.log(location)
    
    messageOne.textContent='Loading...'
    messageTwo.textContent=''
    messageThree.textContent=''
    
    fetch('http://localhost:3000/weather?address='+encodeURIComponent(location)).then((response)=>{
    response.json().then((data)=>{
        
        if (data.Error){
            console.log(data.Error)
            messageOne.textContent=data.Error
            messageTwo.textContent=''
            messageThree.textContent=''
        }
        else{
            console.log(data.location)
            console.log(data.forecastData.weather)
            console.log(data.forecastData.temperature)
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecastData.weather
            messageThree.textContent=data.forecastData.temperature
        }
    })
})

})


