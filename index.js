let forminputs=document.getElementById("form");

forminputs.addEventListener("submit",additems);

function additems(e){

  e.preventDefault();

let amount=e.target.amountinput.value;
let description=e.target.Descriptioninput.value;
let category=e.target.selected.value;


let obj={
  amount,
  description,
  category
}

axios.post("https://crudcrud.com/api/d03d7abac027498eba8c7b2c664979e6/expensetracker",obj)
.then((res)=>{
  showonscreen(res.data);
})
.catch((err)=>{
  console.log(err);
})

}

window.addEventListener("DOMContentLoaded",()=>{

  axios.get("https://crudcrud.com/api/d03d7abac027498eba8c7b2c664979e6/expensetracker")
  .then((res)=>{
    for(var i=0;i<res.data.length;i++){
      showonscreen(res.data[i]);
    }
  })
  .catch((err)=>{
    console.log(err);
  })
   

})


function showonscreen(obj){

  var li=`<li class="list-group-item" id="${obj._id}"> ${obj.amount} ${obj.description} ${obj.category}    <button class="btn btn-danger" onClick="deleting('${obj._id}')">delete</button>     <button class="btn btn-warning" onClick="editing('${obj.amount}','${obj.description}','${obj.category}','${obj._id}')">edit</button></li>`;

   let target=document.getElementById("itemlist");
   target.innerHTML+=li;
}


function deleting(userid){
 
  axios.delete(`https://crudcrud.com/api/d03d7abac027498eba8c7b2c664979e6/expensetracker/${userid}`)
  .then((res)=>{
    deletefromscreen(userid);
  })
  .catch((err)=>{
    console.log(err);
  })
   

}

function deletefromscreen(userid){
  let parent=document.getElementById("itemlist"); 
  let child=document.getElementById(userid);
  parent.removeChild(child);
}

function editing(amount,description,selcted,userid){

document.getElementById("amountinput").value=amount
document.getElementById("Descriptioninput").value=description;
document.getElementById("selected").value=selcted;

deleting(userid);
}