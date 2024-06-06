//get totAL
//create product
//save in localstorage
//clear input
//read
//count
//delete
//update
//serach
//clean data
// title. price. taxes. ads.discount. total
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = 'create';
let tmp;
// console.log(title,taxes,total,price,ads,discount,category,count,submit);
// get total
function getTotal() {
 if(price.value != '') {
let result = (+price.value + +taxes.value + +ads.value) - discount.value;
total.innerHTML = result;
total.style.background = '#040'
 } else {
total.innerHTML = '';
total.style.background = ' rgb(211, 41, 41)'
 }
}
//End Total
//creat product 
// احسن مكان تحفظ فيهو الداتا هو المصفوفه
// let dataPro = [];
// if localstorg have data let the old data
let dataPro;
if(localStorage.product != null) {
dataPro =JSON.parse(localStorage.product)

}else {
    dataPro = [];
}
submit.onclick = function(){
    // نجمع البيانات في كائن
let newPro = {
    title:title.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase(),
}
// console.log(newPro);
//ليه نحنا بنضيف في مصفوفه م بنكتفي فقط بالكائن لانو كل م تضغط علي ذر الانشاء يعمل ليك جديد ويمسح القديم
// insert new object and save old object = creat arraay of object
//************************** */
// if(newPro.count > 1) {
// for (let i = 0; i < newPro.count; i++) {
//   // function count
//   dataPro.push(newPro)
// }
// }else {
//   dataPro.push(newPro)
// }
//***************************** */
// console.log(dataPro); // call Array of object
if(mood === 'create') {
  if(newPro.count > 1) {
    for (let i = 0; i < newPro.count; i++) {
      // function count
      dataPro.push(newPro)
    }
    }else {
      dataPro.push(newPro)
    }
}else {
  dataPro[ tmp   ] = newPro;
  mood = 'create'
  submit.innerHTML = 'create'
  count.style.display = 'block'
}
localStorage.setItem("product", JSON.stringify(dataPro))
cleardata();
showdata();
}               
// clear input 
function cleardata() {
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  total.innerHTML = '';
  count.value = '';
  category.value = '';  
}
// function read data or show data in display scran
function showdata() {
  let table = '';  
for (let i = 0; i < dataPro.length; i++) {
    // table = dataPro[i];
    table += `
     <tr>
<td>${i}</td>
<td>${dataPro[i].title}</td>
<td>${dataPro[i].price}</td>
<td>${dataPro[i].taxes}</td>
<td>${dataPro[i].ads}</td>
<td>${dataPro[i].discount}</td>
<td>${dataPro[i].total}</td>
<td>${dataPro[i].category}</td>
<td><button onclick ="updatedata(${i})" id="update">update</button></td>
<td><button onclick="deletedata( ${i} )" id="delete">delete</button></td>
</tr> 
    
    `
}
// show total red color
getTotal()
  document.getElementById('tbody').innerHTML = table;
  let btn = document.getElementById("deleteAll");
  if(dataPro.length > 0) {
  btn.innerHTML = `
  <button onclick ="deleteAll()">deleteAll (${dataPro.length})</button>
  `
  //show this is button if found data in the table
  }else {
    btn.innerHTML = '';  
  }
}
showdata()
// delete function
function deletedata(i) {
dataPro.splice(i,1)
localStorage.product = JSON.stringify(dataPro)
showdata()
}
 //delet All
 function deleteAll() {
  localStorage.clear() //delete in local storage
  dataPro.splice(0)
  showdata() // update the data
 }
 // function count 
 // updata data 
 function updatedata(i) {
// console.log(i);
title.value = dataPro[i].title;
price.value = dataPro[i].price;
taxes.value = dataPro[i].taxes;
ads.value = dataPro[i].ads;
discount.value = dataPro[i].discount;
category.value = dataPro[i].category;
getTotal()
count.style.display ='none'
submit.innerHTML = 'Update'
mood = 'Update'
tmp = i;
scroll({
  top :0,
  behavior:"smooth"
})
 }
 //serch function
 let searchmood = 'title'
 function getsearchmood(id) {
// console.log(id);
let search = document.getElementById("search");
if(id == 'searhtitle') {
  searchmood = 'title' 
  search.placeholder = 'Serach By Title'
}else {
  searchmood = 'category'
  search.placeholder = 'Serach By Category'
}
search.focus()
search.value = ''
showdata()
// console.log(searchmood);
 }
//////////////////////////////////////
function searchdata(value) {
// console.log(value);
let  table = '';
if(searchmood == 'title' ) {
 for (let i = 0; i < dataPro.length; i++) {
 if(dataPro[i].title.includes(value.toLowerCase())) {
  // console.log(i)
  table += `
  <tr>
<td>${i}</td>
<td>${dataPro[i].title}</td>
<td>${dataPro[i].price}</td>
<td>${dataPro[i].taxes}</td>
<td>${dataPro[i].ads}</td>
<td>${dataPro[i].discount}</td>
<td>${dataPro[i].total}</td>
<td>${dataPro[i].category}</td>
<td><button onclick ="updatedata(${i})" id="update">update</button></td>
<td><button onclick="deletedata( ${i} )" id="delete">delete</button></td>
</tr> 
 `;
 }
 } 
}else {
  for (let i = 0; i < dataPro.length; i++) {
    if(dataPro[i].category.includes(value.toLowerCase())) {
     // console.log(i)
     table += `
     <tr>
   <td>${i}</td>
   <td>${dataPro[i].title}</td>
   <td>${dataPro[i].price}</td>
   <td>${dataPro[i].taxes}</td>
   <td>${dataPro[i].ads}</td>
   <td>${dataPro[i].discount}</td>
   <td>${dataPro[i].total}</td>
   <td>${dataPro[i].category}</td>
   <td><button onclick ="updatedata(${i})" id="update">update</button></td>
   <td><button onclick="deletedata( ${i} )" id="delete">delete</button></td>
   </tr> 
    `;
    }
    }
}
document.getElementById('tbody').innerHTML = table;
}