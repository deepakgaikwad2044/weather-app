




let API_key = "7b94f8e61f37855d1cb29a1164dd09c5";
  
  
var api='';

    let searchAPI  = `https://api.openweathermap.org/data/2.5/weather?&units=metric&appid=${API_key}&q=`;
   
let backbtn = document.querySelector(".fa-arrow-left");

let resdata = document.querySelector(".res_data");

let locationbtn = document.querySelector(".locationbtn");

let error = document.querySelector(".error");
let errortxt = document.querySelector(".error span");

let otherinfo = document.querySelector(".otherweatherinfo");

backbtn.onclick = ()=>{
    resdata.style.display="block"
    otherinfo.classList.remove("display")
    error.style.display="none"
}


const onsuc = (postion)=>{
    let lat = postion.coords.latitude;
    let long = postion.coords.longitude;
    error.classList.add("success")
    errortxt.classList.add("successspan")
   
    error.classList.remove("errormsg")
    errortxt.classList.remove("errorspan")
  
   
    errortxt.innerHTML = "okk";

    
 //api = `https://api.openweathermap.org/data/2.5/weather?lon=${long}&lat=${lat}&units=metric&appid=${API_key}`;
     
 api = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${API_key}&q=wakad`;
   
    
     
    
    requestapi(api);
} 

const onerr = (errors)=>{
    error.style.display="block"
    error.classList.add("errormsg")
    errortxt.classList.add("errorspan")
  
    error.classList.remove("success")
    errortxt.classList.remove("successspan")
   
    
    errortxt.innerHTML = errors.message;
    
}


locationbtn.onclick = ()=>{
    
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(onsuc , onerr);  
    }else{
        alert("your browers not support geolocation api");
    }
  // otherinfo.classList.toggle("display") 
}
 
 

const requestapi = async(api)=>{
    
    
    error.classList.add("success")
    errortxt.classList.add("successspan")
    errortxt.innerHTML="getting data.."; 
   
   /* const res =  await fetch(api);
    const resp = await res.json();
   */ 
  const arrr =  await fetch(api).then(resp=>resp.json()).then(res=>weathershow(res)).catch(er=>nofetchfun(er));
  
   
   
    
    weathershow(resp);
}




function nofetchfun (not){
  error.style.display="block";
    error.classList.add("errormsg");
    errortxt.classList.add("errorspan");
  
    error.classList.remove("success");
    errortxt.classList.remove("successspan");
   errortxt.innerHTML = `${not}`;       
}
  
  
  

let locationrow = document.querySelector(".locationrow");

let weathericons = document.querySelector("img");

let temps = document.querySelector(".temp");

let wdesc = document.querySelector(".wdesc")

let basicinfo = 
document.querySelector(".basicinfo");


let weatherinfo = document.querySelector(".weatherinfo");




const weathershow =  async(res)=>{
  
var demo =   document.querySelector(".demo");
  
  
    resdata.style.display="none";
    
 const {description, icon} = res.weather[0];
    
    const {temp , feels_like , humidity , sea_level} = res.main;
    
    
    
   otherinfo.classList.add("display");
   
 
  
  weathericons.src= `http://openweathermap.org/img/w/${icon}.png`;
   
  let tempc = Math.floor((temp));
    
  temps.innerHTML = `
           <h4 class="num">${tempc}</h4>
           <h6 class="deg">°</h6>
        `;
        
        wdesc.innerHTML =description;
  
  basicinfo.innerHTML = `
     <div class="res">  <h3> <span>Location:</span><i class="fas fa-location-dot"></i>  ${res.name}</h3></div>   
 <div class="res"> <h3> <span>humidity:</span> <i class="fas fa-snowflake"></i>${humidity}%</h3> </div> `;
 
 weatherinfo.innerHTML = `
           <div class="feels">
             <p>feels like</p>
               <h3><i class="fas fa-smile"></i>${Math.floor(feels_like)}%</h3>
           </div>
           
       <div class="  feels sealevel">
              <p>sea level</p>
               <h3><i class="fas fa-water"></i>${Math.round((sea_level))}</h3>
           </div>  
 `
    
}



let subtn = document.querySelector(".submit")
let search = document.querySelector("#search");


let reg =  /^[a-z A-Z]$/;



const getsearchrequest = async(API)=>{

  await fetch(API).then(res=>res.json()).then(res=> respsearch(res)).catch(er=>respsearch(er));
   
}


let form = document.querySelector("form")
    
    form.onsubmit = e=>{
        e.preventDefault();
    }
subtn.onclick = function seach(){
    
    if(search.value.trim() == ''){
       
    error.style.display="block";
    error.classList.add("errormsg");
    errortxt.classList.add("errorspan");
  
    error.classList.remove("success");
    errortxt.classList.remove("successspan");
   
    
        errortxt.innerHTML ="Please fill required input**";
    }
   else{
       
    error.style.display="none"
    error.classList.remove("errormsg")
    errortxt.classList.remove("errorspan")
  
    error.classList.remove("success")
    errortxt.classList.remove("successspan")
  
getsearchrequest(searchAPI + search.value.trim());
  
    }
    
   
   


}


 function respsearch(info){
  
  
  
     if(info.cod == 400){
      
    error.style.display="block";
    error.classList.add("errormsg");
    errortxt.classList.add("errorspan");
  
    error.classList.remove("success");
    errortxt.classList.remove("successspan");
   errortxt.innerHTML = `${info.message}`;      
     }else if(info.cod == 200){
        
    weathershow(info);
    form.reset();
         }else{
   error.style.display="block";
    error.classList.add("errormsg");
    errortxt.classList.add("errorspan");
  
    error.classList.remove("success");
    errortxt.classList.remove("successspan");
   errortxt.innerHTML = `${info.message}`;       
     }
 }