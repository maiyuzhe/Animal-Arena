const gameCard = document.getElementById('game-card');
const userForm = document.getElementById('user-form');
const loginCard = document.getElementById('login-card');
const creatureImg = document.querySelector('img');
const gameResults = document.getElementById('results')
const windowResY = window.screen.height;
//yes and no buttons
const yes = document.getElementById('yes')
const no = document.getElementById('no')

//bases card size off of user's screen resolution
function init(){
    gameCard.style.display = "none";
    gameCard.style.height = (windowResY*0.8)+"px";
    gameCard.style['margin-top'] = '1.5%';
    loginCard.style.height = (windowResY*0.3)+"px";
    //puts login fields in middle of div
    for(let i = 0; i < (windowResY/200); i++){
        loginCard.prepend(document.createElement('br'))
    }
    //hides form and makes game card appear
    userForm.addEventListener('submit',(e) => {
        e.preventDefault()
        gameCard.style.display ="block";
        loginCard.style.display = "none";
        gameResults.style.display = "none"
        renderRandomCreature()
    })

}
//grabs random creature from api
function renderRandomCreature() {
    let id = Math.floor(Math.random() * 3) + 1;
    fetch(`http://localhost:3000/creatures/${id}`)
    .then(response => response.json())
    .then(data => {
        creatureImg.src = data.image;
        creatureImg.alt = data.name
        document.querySelector('h2').innerText = data.name
    })
}

yes.addEventListener('click', () => {
    yes.style.display = 'none'
    no.style.display = 'none'
    gameResults.style.display = 'block'
})

init()