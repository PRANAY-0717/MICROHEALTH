//first we require axios to use it
const axios = require("axios");

//lets store the API that we will call 
const url = "http://localhost:3000/checkoutBeat";

//lets make the function that will make the API call now 
async function sentBeat() 
{
    try
    {
        await axios.get(url);
        console.log("Checkout Beat was sent,Checkout Service aive.");
    }
    catch(err)
    {
        console.log(err);
    }
}

//now we will make call every 35 second for this 
setInterval(sentBeat,35000);