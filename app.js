const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdown = document.querySelectorAll(".drop-down select");
let fromCurr=document.querySelector(".from select");
let toCurr=document.querySelector(".to select");
for (let select of dropdown) {
    for (code in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        select.append(newOption);
        
    }
    select.addEventListener("change",(evt)=>{
        UpdateFlag(evt.target);
    });
}
const UpdateFlag=(element)=>{
let currCode=element.value;
let countryCode=countryList[currCode];
let imgSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
let img=element.parentElement.querySelector("img");
img.src=imgSrc;


}
const btn=document.querySelector("form button");
btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();// Default kaam jo bhi ho rha tha jese click krne pr page refresh usko prevent kiya
    let amt=document.querySelector(".amount input");// kyuki yeh toh element select kr rha
    let amtVal=amt.value;
    if(amtVal==="" || amtVal<1){
        amtVal=1;
        amt.value="1";
    }
    console.log()
    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    let rate=data[toCurr.value.toLowerCase()];
    let finalAmt=amtVal*rate;
    let msg=document.querySelector(".msg");
    msg.innerText=`${amtVal}${fromCurr.value} = ${finalAmt}${toCurr.value}`;
});