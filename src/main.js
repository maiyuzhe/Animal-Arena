const gameCard = document.getElementById('game-card');
const userForm = document.getElementById('user-form');
const loginCard = document.getElementById('login-card');
const creatureImg = document.querySelector('img');
const gameResults = document.getElementById('results')
const windowResY = window.screen.height;
//yes and no buttons
const yes = document.getElementById('yes')
const no = document.getElementById('no')
let randomArray = []
generateArray()
//can toggle devmode by commenting it out
devMode()

//Survival Score and Username
let survivalScore = 0
let username = ''

//bases card size off of user's screen resolution
function init(){
    gameCard.style.display = "none";
    gameCard.style.height = (windowResY*0.7)+"px";
    gameCard.style['margin-top'] = '1.5%';
    loginCard.style.height = (windowResY*0.4)+"px";
    //puts login fields in middle of div
    for(let i = 0; i < (windowResY/800); i++){
        loginCard.prepend(document.createElement('br'))
    }
    //hides form and makes game card appear
    userForm.addEventListener('submit',(e) => {
        e.preventDefault()
        if (e.target['user-name'].value.length === 0 || e.target.gym.value === '' || e.target.height.value === '') {
            alert('Test')
        } else {
            gameCard.style.display ="block";
            loginCard.style.display = "none";
            gameResults.style.display = "none"
            renderRandomCreature(randomArray[0])
        }
    })

}
//grabs random creature from api
function renderRandomCreature(id) {
    console.log(randomArray)
    fetch(`http://localhost:3000/creatures/${id}`)
    .then(response => response.json())
    .then(data => {
        creatureImg.src = data.image;
        creatureImg.alt = data.name
        document.querySelector('h2').innerText = data.name
        gameResults.style.display = 'none'
    })
    //removes the first index of the array each time this function is called
    randomArray.shift()
}

yes.addEventListener('click', () => {
    yes.style.display = 'none'
    no.style.display = 'none'
    gameResults.style.display = 'inline-block'
    setTimeout(() => { 
        yes.style.display = 'inline-block'
        no.style.display = 'inline-block'
        renderRandomCreature(randomArray[0])}, 500);
        //change delay back to 3000 later
})

no.addEventListener('click', () => {
    yes.style.display = 'none'
    no.style.display = 'none'
    gameResults.style.display = 'inline-block'
    setTimeout(() => { 
        yes.style.display = 'inline-block'
        no.style.display = 'inline-block'
        renderRandomCreature(randomArray[0])}, 500);
        //change delay back to 3000 later
})

init()
//added developer mode so we don't have to fill the fields out each test
function devMode(){
    const devButton = document.createElement('button')
    loginCard.append(devButton)
    devButton.textContent = "Developer Mode"
    devButton.addEventListener(('click'), () => {
        gameCard.style.display ="block";
        loginCard.style.display = "none";
        gameResults.style.display = "none"
        survivalScore = 10;
        username = "dev";
        renderRandomCreature(randomArray[0])
    })
}

//populates random array with non-repeating integers
function generateArray(){
    for (let i = 0; i < 20; i++){
        let id = Math.floor(Math.random() * 20) + 1;
        if(randomArray.includes(id) == true){
            i=i-1;
        }else{
            if(id>20==false){
                randomArray.push(id);
            }
        }
    }
}