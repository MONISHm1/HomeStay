const buttons = document.querySelectorAll(".filter-btn");

const cards = document.querySelectorAll(".booking-card");

buttons.forEach(button=>{

button.addEventListener("click",()=>{

buttons.forEach(btn=>btn.classList.remove("active"));

button.classList.add("active");

const filter = button.dataset.filter;

cards.forEach(card=>{

if(filter==="All"){

card.style.display="flex";

return;

}

if(card.dataset.status===filter){

card.style.display="flex";

}else{
card.style.display="none";
}
});
});
});