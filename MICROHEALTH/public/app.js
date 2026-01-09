// let service = document.querySelector(".services");

// //let us make a function that will add a new service fully 
// function addService()
// {
//     let serviceName = document.createElement("input");
//     let ok = document.createElement("button");
//     ok.innerText="ok";
//     service.appendChild(serviceName);
//     service.appendChild(ok);
//     let text;
//     ok.addEventListener("click",()=>
//     {
//         text = serviceName.value;
//         serviceName.remove();
//         ok.remove();
//         let serv = document.createElement("div");
//         let newText = document.createElement("h3");
//         service.appendChild(serv);
//         newText.innerText="Send request on http://localhost:3000/"+text+"Beat";
//         serv.append(newText);
//     });
// }
// document.querySelector(".btn").addEventListener("click",addService);


async function checkPayment()
{
    try
    {
        let response = await axios.get("http://localhost:3000/get/paymentBeat");
        let beat = response.data;
        if(Math.abs(Date.now()-Number(beat))<60000)
            document.querySelector(".service1").style.color="green";
        else
            document.querySelector(".service1").style.color="red";
        console.log("Payment Status Updated");
    }
    catch(err)
    {
        console.log(err);
    }
}

async function checkCheckout()
{
    try
    {
        let response = await axios.get("http://localhost:3000/get/checkoutBeat");
        let beat = response.data;
        if(Math.abs(Date.now()-Number(beat))<60000)
            document.querySelector(".service2").style.color="green";
        else
            document.querySelector(".service2").style.color="red";
        console.log("Checkout Status Updated");
    }
    catch(err)
    {
        console.log(err);
    }
}

async function run()
{
    checkCheckout();
    checkPayment();
}

setInterval(run,10000);