////Javascript for register button////////

const buttonSubmit = document.getElementById('btnSubmit');
buttonSubmit.addEventListener('click', registerUser)
const buttonLogin =document.getElementById('btnLogin')
const buttonLogout =document.getElementById('btnLogout')
buttonLogout.style.display ="none"
buttonLogout.addEventListener('click', logOut);
const buttonRegister = document.getElementById('btnRegister')

function registerUser (event) {
     
    const parErrorEmail = document.getElementById('errorFormEmail')
    const parErrorPass =document.getElementById('errorFormPass')
    const regEmail = document.getElementById('defaultForm-email').value;
    const regPassword =document.getElementById('defaultForm-pass').value;

    const closeBtnModal =document.getElementById('closeBtn')
    parErrorEmail.style.color ="red"
    parErrorPass.style.color ="red"
    let usersReg = JSON.parse(localStorage.getItem("users")) || [];
   
   
   if(!regEmail && !regPassword){
    parErrorEmail.innerHTML=`Ова поле е задолжително!`;
    parErrorPass.innerHTML=`Ова поле е задолжително!`

   } else if (!regEmail.endsWith(".com")){
    parErrorEmail.innerHTML=`Мора да внесете валиден емаил!`
  } else if (regPassword.length < 10){
    parErrorPass.innerHTML=`Пасвордот да не е помал од 10 карактери!`
  } else if (!containsUpperCase(regPassword)){
    parErrorPass.innerHTML=`Пасвордот мора да содржи една голема буква!`
  } else if (!containsSpecialChar(regPassword)){
    parErrorPass.innerHTML=`Пасвордот мора да содржи еден специјален знак(!, @, #, $, %)!`
  } else if (usersReg.email === regEmail && usersReg.password === regPassword){
    parErrorPass.innerHTML='Веќе сте регистрирани со овој емаил и пасворд!'
  }
   
   else {
    parErrorEmail.innerHTML=""
    
    fetch(`https://63407044d1fcddf69cb8c368.mockapi.io/users`,{
        method: 'POST',
        body: JSON.stringify(users),
     }) 
    .then(res => res.json())
    .then(users => console.log(users))
   localStorage.setItem('users', JSON.stringify({email:regEmail,password:regPassword})),
     buttonLogin.click()
     closeBtnModal.click() 
     buttonRegister.style.display ='none'   
} 
}

function containsUpperCase(text) {
    for (let i = 0; i < text.length; i++) {
        if (text[i] === text[i].toUpperCase()) {
            return true;
        }
    }

    return false;
}

function containsSpecialChar(text) {
    const specialChars = ["!", "@", "#", "$", "%"];

    for (let i = 0; i < text.length; i++) {
        if (specialChars.includes(text[i])) {
            return true;
        }
    }

    return false;
}

////Javascript for login and logout//////

const btnSubmitLogin =document.getElementById('btnSubmit2')
btnSubmitLogin.addEventListener('click', loginUser)
const closeBtnLogin =document.getElementById('closeBtnLogin')
const logEmail = document.getElementById('defaultForm1-email').value;
const logPassword =document.getElementById('defaultForm1-pass').value;

function loginUser (usersId) {
    
 let users = JSON.parse(localStorage.getItem("users")) || []; 
const logEmail = document.getElementById('defaultForm1-email').value;
const logPassword =document.getElementById('defaultForm1-pass').value;
const paraLoginPass =document.getElementById('paraPassLogin')
let cart = JSON.parse(localStorage.getItem("academies")) || [];

 if (logEmail === users.email && logPassword === users.password) {

    fetch(`https://63407044d1fcddf69cb8c368.mockapi.io/users`) 
    .then((response) => response.json())
    .then(users1 => randomNumFromUsers(users1))

    localStorage.setItem('users3', JSON.stringify({email:logEmail,password:logPassword})),
    closeBtnLogin.click()
    buttonLogin.style.display ="none"
    buttonRegister.style.display ='none'
    buttonLogout.style.display = "block"
} 
 else if(logEmail != users.email || logPassword != users.password){
    paraLoginPass.innerHTML="Emailot i passwordot ne se validni"
 }
   for(let i=0; i<cart.length; i++){
      if(logEmail === cart[i].email && logPassword === cart[i].password){
        fetch(`https://63407044d1fcddf69cb8c368.mockapi.io/users`) 
        .then((response) => response.json())
        .then(users1 => randomNumFromUsers(users1))
        localStorage.setItem('users3', JSON.stringify({email:logEmail,password:logPassword})),
     
        closeBtnLogin.click()
        
        buttonLogin.style.display ="none"
        buttonRegister.style.display ='none'
        buttonLogout.style.display = "block"
       
      }
   }
}

let userLocal = JSON.parse(localStorage.getItem("users2"));
function  loginOnload() {
    if (userLocal){
   buttonLogin.style.display ='none'
   buttonRegister.style.display ='none'
   buttonLogout.style.display ='block' 
  
}else {
   buttonLogin.style.display ='block'
}
}
 loginOnload()


 function randomNumFromUsers(object) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
     const values = Object.values(object) 
     const allUsers = values
     const allUsersRand = allUsers [Math.floor(Math.random() * (allUsers.length))]
     const randNum = Math.floor ((Math.random() * allUsersRand) + 1)
     console.log(randNum)

     fetch(`https://63407044d1fcddf69cb8c368.mockapi.io/users/${randNum}`) 
    .then((response) => response.json())
     .then(users2 => {

     localStorage.setItem('users2', JSON.stringify({users2})),
   
     console.log(users2) 
 })
 }

  function logOut () {
    
    if (userLocal === true) {
    buttonLogin.style.display ="block"
    buttonLogout.style.display = "none"
    buttonRegister.style.display ='block'
    }
    localStorage.removeItem("users2");
    localStorage.removeItem('users3')   
  }
  
////Javascript for academies page////

const divAcademies =document.getElementById('divAcademies')

class AcademyCard {
    constructor(params) {
        this.createdAt = params.createdAt;
        this.name = params.name; 
        this.image = params.image;
        this.place = params.place;
        this.price = params.price;
        this.speakers= params.speakers
    }
   }
  
    fetch('https://63407044d1fcddf69cb8c368.mockapi.io/academies')
    .then((data) => data.json())
    .then(data => {
     const allAcademies = data.map((academies)=> new AcademyCard(academies))
      generateAcademies(allAcademies)

    })
      
function generateAcademies (data) {
   
   const initAcademy = document.querySelector('.academy');
    for (let i=0; i< data.length; i++) {
        let academies= data[i]
        const academyDiv = document.createElement('div');
        academyDiv.classList.add ('academy')
        academyDiv.innerHTML = initAcademy.innerHTML;

        academyDiv.children[0].innerHTML = academies.name;
        academyDiv.children[1].src =academies.image;
        academyDiv.children[2].innerHTML =`Place:${academies.place}`;
        academyDiv.children[3].innerHTML=`Price:${academies.price} EUR`;
        academyDiv.children[4].innerHTML=`Speakers:${academies.speakers}`;
        academyDiv.children[5] .onclick =(event) => {  
           event.preventDefault()
           
        if (localStorage.getItem("users3")){
            setInLocalStorage()
            saveItems()
            makeModal()
            totalPrice()
            generateBtn()
        } else {
          alert("Морате првин да се регистрирате и логирате")
        }
        }
       
    divAcademies.append(academyDiv);
       
      function setInLocalStorage() {    
         let cart = JSON.parse(localStorage.getItem("academies")) || [];
         let users = JSON.parse(localStorage.getItem("users3")) || [];          
         
          let newItem = {
            email:users.email,
            password:users.password,
            name:academies.name,
            price:academies.price,
            image:academies.image,
            no:1,
            id: Date.now()  
          };

          if (JSON.parse(localStorage.getItem('academies')) === null){
             cart.push(newItem)
             localStorage.setItem("academies", JSON.stringify(cart))
                      
        } else {
            const localItems =JSON.parse(localStorage.getItem('academies'))
            localItems.map(data => {
                if(newItem.no == data.no){
                    newItem.no = data.no 
                }else {
                    cart.push(data)
                }
            })
            cart.push(newItem)
            localStorage.setItem("academies", JSON.stringify(cart))    
        }   
          console.log(cart)               
  }   
  
  function generateBtn() {
   
    let cart = JSON.parse(localStorage.getItem("academies")) || []
    let users = JSON.parse(localStorage.getItem("users3")) || [];
    cart.map(data => {
      if(academies.name === data.name && users.email === data.email ){
       
        academyDiv.children[5].style.display='none'
    }
    })
   }
   generateBtn()

   }
   function checkBasket() {
    let cart = JSON.parse(localStorage.getItem("academies")) || [];
    let users = JSON.parse(localStorage.getItem("users3")) || [];  
     cart.map(data  => {
        if(users.email === data.email && users.password === data.password){
            saveItems()
            makeModal()
            totalPrice()
            generateBtn()
        }
      })
   }
     checkBasket()
  };

  const divModalContent = document.getElementById('divModalContent')     
  let totalPricePara =document.getElementById('totalPrice')
  
  function saveItems() {
    let numberOfItems =0 
    let numberItems = document.getElementById('numOfItems')
    
    let cart = JSON.parse(localStorage.getItem("academies")) || []
    let users = JSON.parse(localStorage.getItem("users3")) || [];  
  
    cart.map(data => {
      if(users.email === data.email && users.password === data.password){
        numberOfItems += data.no
      }  
    })
    numberItems.innerText = numberOfItems 
  }

  function makeModal(id) {

    let cart = JSON.parse(localStorage.getItem("academies")) || []
    let users = JSON.parse(localStorage.getItem("users3")) || [];  
    let modalContent = []
    
     cart.forEach(data => {  
      if (JSON.parse(localStorage.getItem('academies'))=== null){  
        modalContent.innerHTML ="Kosnickata e prazna"
      } else if (users.email === data.email && users.password === data.password) {
          let id = data.id
          modalContent +=`<div class="modal-header"><h4>${data.name}</h4></div> <br/><div class="modal-body"><img src='
            ${data.image}'><p>Price: ${data.price}EUR</p><div class="modal-footer">
            <button class="btn-primary" id="removeCardItem" onclick="removeCard(${id})">Remove</button></div></hr>`
      }
    })
   divModalContent.innerHTML =modalContent
  }  
  
  function removeCard(id) {
    let card=[]
   
    JSON.parse(localStorage.getItem('academies')).map(data => {
    if (data.id != id){
        card.push(data);
      
    }
  });
 
     localStorage.setItem("academies", JSON.stringify(card));
     makeModal()
     saveItems()
     totalPrice() 
  } 
      
  function totalPrice() {
   
   let totalPriceA =0
   let cart = JSON.parse(localStorage.getItem("academies")) || []
   let users = JSON.parse(localStorage.getItem("users3")) || [];  
    
   cart.map(data => {
     if(users.email === data.email && users.password === data.password){
    totalPriceA += data.price
   }
  })

   totalPricePara.innerText =`Вкупна цена: ${totalPriceA} EUR`
  
   divModalContent.appendChild(totalPricePara)
   if (totalPriceA === 0) {
    totalPricePara.innerText = 'Кошничката е празна'
   
   }     
}
 


  

 
  
  
  
  
