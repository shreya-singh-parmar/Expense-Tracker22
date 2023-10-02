const nam =document.getElementById('exp');
const dis = document.getElementById('Dis');
const cate = document.getElementById('category');
const btnn = document.getElementById('btn');
const item= document.getElementById('itemList');

btnn.addEventListener('click', onSubmit);
item.addEventListener('click',onRemove);
item.addEventListener('click',onEdit);

function onSubmit(e){
    e.preventDefault();
    if(nam.value===''|| dis.value===''|| cate.value==='' ){
        alert("please fill the form");
    }
    else{
        const itemId = new Date().getTime();
        //li.setAttribute('data-myObj_ser-id', itemId.toString());
      let myObj ={
      name : nam.value,
    disp : dis.value,
      category : cate.value
    }
    axios.post("https://crudcrud.com/api/e955e70c96b34dd99e0cb5bfb20135d2/appoinmentData", myObj)
  .then((response) => {
    // Extract the relevant fields from response.data
    console.log(response);
    const responseData = response.data;
    const { name, disp, category } = responseData;
    //console.log(responseData);
    // Create a text node to display the data
    const textNode = document.createTextNode(`${name}-${disp}-${category}`);
   // console.log(textNode);
    // Create an <li> element and append the text node
    const li = document.createElement('li');
    li.setAttribute('data-myObj_ser-id', itemId.toString());
    li.appendChild(textNode);

    // Add delete and edit buttons as before
    const dlt = document.createElement('button');
    dlt.className = "dltbtn";
    dlt.appendChild(document.createTextNode("Delete"));
    li.appendChild(dlt);

    const edt = document.createElement('button');
    edt.className = "edtbtn";
    edt.appendChild(document.createTextNode("Edit"));
    li.appendChild(edt);

    // Append the <li> element to the list
    item.appendChild(li);
    
    // Clear input values
    nam.value = '';
    dis.value = '';
    cate.value = '';
  })
  .catch((err) => {
    console.log(err);
  });
    }
}
     

function onRemove(e){
    if(e.target.classList.contains('dltbtn')){
        var li = e.target.parentElement;
        item.removeChild(li);
        const itemId = li.getAttribute('data-myObj_ser-id');
        localStorage.removeItem(itemId); 
        
    }
}
function onEdit(e){
    if (e.target.classList.contains('edtbtn')) {
        var li = e.target.parentElement;
        let editobjkey = li.getAttribute('data-myObj_ser-id');
        let obj = JSON.parse(localStorage.getItem(editobjkey));
        document.getElementById('exp').value = obj.name;
        document.getElementById('Dis').value = obj.disp; 
        document.getElementById('category').value = obj.category; 
        item.removeChild(li);
        localStorage.removeItem(editobjkey);
        console.log(obj);
    }
}
// function initializeList() {
//  axios.get("https://crudcrud.com/api/e955e70c96b34dd99e0cb5bfb20135d2/appoinmentData")
//     .then((response)=>{
//         console.log(response);
//     })
//     .catch((err)=>{
// console.log(err);
//     })
    // let listHTML = '';
    // for (let i = 0; i < localStorage.length; i++) {
    //     const key = localStorage.key(i);
    //     const obj = JSON.parse(localStorage.getItem(key));

    //     listHTML += `
    //         <li data-myObj_ser-id="${key}">
    //             ${obj.name} - ${obj.disp} - ${obj.category}
    //             <button class="dltbtn">Delete</button>
    //             <button class="edtbtn">Edit</button>
    //         </li>
    //     `;
    // }
    // item.innerHTML = listHTML;
//}
window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/e955e70c96b34dd99e0cb5bfb20135d2/appoinmentData")
    .then((response)=>{
        console.log(response);
        for(var i=0;i<response.data.length;i++){
            const item = response.data[i];
            const { name, disp, category } = item;

            // Create a list item (<li>) to display the data
            const li = document.createElement('li');
            li.textContent = `${name} - ${disp} - ${category}`;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                const itemId = item._id;
               
                axios.delete(`https://crudcrud.com/api/e955e70c96b34dd99e0cb5bfb20135d2/appoinmentData/${itemId}`)
                    .then((response) => {
                       
                        li.remove();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
               
            });

            // Create an edit button
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => {
               
            });
            li.appendChild(deleteButton);
            li.appendChild(editButton);

            // Append the list item to the container
            itemList.appendChild(li);   
        }
    })
    .catch((err)=>{
console.log(err);
    })
})

// Create a delete button

//initializeList();







