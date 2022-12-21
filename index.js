let forminputs=document.getElementById("form");

forminputs.addEventListener("submit",additems);

function additems(e){

let amountinput=document.getElementById("amountinput").value;
let Descriptioninput=document.getElementById("Descriptioninput").value;

let category=document.getElementById("selected").value;

if(localStorage.getItem(Descriptioninput)!=null){
  alert("the description value already exits please change");
}

let obj={
  amount:amountinput,
  Description:Descriptioninput,
  selected:category
}
var objtostring=JSON.stringify(obj);
localStorage.setItem(obj.Description,objtostring);

}

for(let i=0;i<localStorage.length;i++){
   var key=localStorage.key(i); 
   var data=localStorage.getItem(key);
   
   var money=JSON.parse(data).amount;
   var descript=JSON.parse(data).Description;
   var purpose=JSON.parse(data).selected;
   
   var li=`<li class="list-group-item" id="${descript}"> ${money} ${descript} ${purpose}    <button class="btn btn-danger" onClick="deleting('${descript}')">delete</button>     <button class="btn btn-warning" onClick="editing('${descript}')">edit</button></li>`;

   let target=document.getElementById("itemlist");
   target.innerHTML+=li;
}


function deleting(em){
 localStorage.removeItem(em);
 deletefromscreen(em);
}

function deletefromscreen(em){
  let parent=document.getElementById("itemlist"); 
  let child=document.getElementById(em);
  parent.removeChild(child);
}

function editing(em){
let amountval=JSON.parse(localStorage.getItem(em)).amount;
let Descriptionval=JSON.parse(localStorage.getItem(em)).Description;
let selectedval=JSON.parse(localStorage.getItem(em)).selected;

document.getElementById("amountinput").value=amountval
document.getElementById("Descriptioninput").value=Descriptionval;
document.getElementById("selected").value=selectedval;
}