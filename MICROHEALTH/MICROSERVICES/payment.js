//first we will require axois to use it 
const axios = require("axios");

//Now we will store the API to which call has to be send 
const url = "http://localhost:3000/paymentBeat";

//now leyt us make the function that calls the API 
async function sentBeat()
{
    try
        {
            await axios.get(url);
            console.log("Payment Beat was sent,Payment Service aive.");
        }
        catch(err)
        {
            console.log(err);
        }
}

//Now we will make call to this api every 30 second by usingg setTimeInterval 
setInterval(sentBeat,30000);
