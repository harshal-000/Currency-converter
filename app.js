const Baseapi ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn=document.querySelector("#exchange");
let fromflag = document.querySelector(".from .select-contanier img");
let toflag = document.querySelector(".to .select-contanier img");
const fromcrr = document.querySelector(".from select");
const tocrr = document.querySelector(".to select")
let msg=document.querySelectorAll("p")[3];


window.addEventListener("onload",()=>{
    
})

for (let select of dropdowns) {
  for (let currcode in countryList) {
    let newoption = document.createElement("option");
    newoption.innerText = currcode;
    newoption.value = currcode;
    if (select.name === "from" && currcode === "USD") {
      newoption.selected = "selected";
    } else if (select.name === "to" && currcode === "INR") {
      newoption.selected = "selected";
    }
    select.append(newoption);
  }
  select.addEventListener("change", (evt) => {
    updateflag(evt.target);
  });
}

const updateflag = (whatever) => {
  let currCode = whatever.value;
  let countryCode = countryList[currCode];
  let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = whatever.parentElement.querySelector("img");
  img.src = newsrc;
};


btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let amt=document.querySelector("input").value;

    if(amt==="" || amt<1){
        amt=1
    }

    let tocurrvar=tocrr.value.toLowerCase();
    let fetchurl=`${Baseapi}${fromcrr.value.toLowerCase()}.json`;
    let fdata = await fetch(fetchurl);
    let data = await fdata.json();
    let rate= data[fromcrr.value.toLowerCase()][tocurrvar]
    
    let exchangeamt=amt*rate;
    msg.innerText=`${amt} ${fromcrr.value} is equal to ${exchangeamt} ${tocrr.value}`;
})
