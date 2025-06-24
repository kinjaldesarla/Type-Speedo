const randomindex=Math.floor(Math.random()*10)   
const p=document.querySelector(".random") 
const input=document.querySelector("input") 
const button=document.querySelector(".tryagain")
const mistakeCount=document.querySelector(".mistake")
let currentIndex = 0;
let mistake= 0;
mistakeCount.innerText+=mistake;
let reamingTime=document.querySelector(".time")
let Time=60;
let timeStarted=false;
let fullTyped="";
let allCorrect = true;
let interval;
let wpm=document.querySelector(".wpm")
let cpm=document.querySelector(".cpm")

document.addEventListener("click", () => input.focus());
window.addEventListener("load", () => input.focus());

// this will load a random paragraph
function loadParagraph(){
 const url= "https://baconipsum.com/api/?type=all-meat&paras=11"
     try{
        fetch(url)
      .then((res)=>(res.json()))
         .then((data)=>{
          let sentences=data[randomindex].split(".")
            randompara= sentences[0] + '.' + sentences[1] + '.';
  Array.from(randompara).forEach((letter)=>{
               const span=document.createElement("span");
               span.innerText=letter;
               span.classList.add("letters")
               p.append(span)
             })
         })
     }
     catch(err){
      console.log(err)
     }
 
}
  
loadParagraph();

// function to detect the Keys
 
    input.addEventListener("keyup", (e) => {
    
  //   for timer of 60second
 if(!timeStarted){
  timeStarted=true;
interval= setInterval(()=>{
  Time--;
 reamingTime.innerText=`${Time} sec`
 if(Time<=0){
  clearInterval(interval);
  alert("time's up!!")
 }
},1000)
 }

 const spans = document.querySelectorAll(".letters");
const typedChar = input.value;   
fullTyped+=typedChar;
 let currentSpan = spans[currentIndex];  

if(e.key ==='Backspace'){
   currentIndex--;
  currentSpan=spans[currentIndex];
currentSpan.classList.remove("incorrect","correct");
fullTyped= fullTyped.slice(0,-1);

 if(mistake>0){
   mistake--; //  mistake counting
  mistakeCount.innerText=`Mistakes:${mistake}`  
 }
 }
  if (!typedChar) return;
  if (typedChar === randompara[currentIndex]) {
    currentSpan.classList.add("correct");   // if correct yellow color
  } else {
    currentSpan.classList.add("incorrect"); // if incorrect red color
      mistake++;
      mistakeCount.innerText=`Mistakes:${mistake}`
  }

  currentIndex++; 
  input.value = ""; 

//  calculations of words and character per minute
const elapsedTime = 60 - Time;
const wpmValue = Math.round((fullTyped.length / 5) / (elapsedTime / 60));
wpm.innerText = `WPM: ${wpmValue}`;
const cpmValue = Math.round(fullTyped.length / (elapsedTime / 60));
cpm.innerText = `CPM: ${cpmValue}`;


  //  if paragraph is completed then timer will stop
spans.forEach(span => {
  if (!span.classList.contains("correct")) {
    allCorrect = false;
  }
});

if (allCorrect && currentIndex === randompara.length) {
  clearInterval(interval);
  alert(`Great! You completed the test with ${mistake} mistakes in ${60 - Time} seconds`);
}

});



//  Reset button logic
button.addEventListener("click", () => {
  input.focus();
  clearInterval(interval);
  currentIndex = 0;
  mistake = 0;
  Time = 60;
  timeStarted = false;
  fullTyped = "";
  input.value = "";
  mistakeCount.innerText = `Mistakes:${mistake}`;
  wpm.innerText = `WPM:0`;
 cpm.innerText = `CPM:0`;
  reamingTime.innerText = `${Time}`;
  p.innerHTML=""
  loadParagraph();
});
