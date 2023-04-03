const gameCard = document.getElementById('game-card');
const userForm = document.getElementById('user-form');
const loginCard = document.getElementById('login-card');
const creatureImg = document.querySelector('img');
const gameResults = document.getElementById('results')
const windowResY = window.screen.height;
//yes and no buttons
const yes = document.getElementById('yes')
const no = document.getElementById('no')
let usedAnimal = []

//Survival Score and Username
let survivalScore = 0
let deadlinessScore = 0
let username = ''

//bases card size off of user's screen resolution
function init(){
    gameCard.style.display = "none";
    gameCard.style.height = (windowResY*0.7)+"px";
    gameCard.style['margin-top'] = '1.5%';
    loginCard.style.height = (windowResY*0.4)+"px";
    //puts login fields in middle of div
    for(let i = 0; i < (windowResY/200); i++){
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
            renderRandomCreature()
            generateSurvivalScore(e)
            username = e.target['user-name'].value
            console.log(username)
        }
    })

}
//grabs random creature from api
function renderRandomCreature() {
    let id = Math.floor(Math.random() * 20) + 1;
    fetch(`http://localhost:3000/creatures/${id}`)
    .then(response => response.json())
    .then(data => {
        usedAnimal = [id, ...usedAnimal]
        console.log(usedAnimal)
        creatureImg.src = data.image;
        creatureImg.alt = data.name
        deadlinessScore = data.deadliness
        document.querySelector('h2').innerText = data.name
        gameResults.style.display = 'none'
    })
}

yes.addEventListener('click', () => {
    yes.style.display = 'none'
    no.style.display = 'none'
    gameResults.style.display = 'inline-block'
    if (survivalResults()) {
        console.log("Have more confidence, you're good")
    } else {
        console.log("Yah, you better run")
    }
    setTimeout(() => { 
        yes.style.display = 'inline-block'
        no.style.display = 'inline-block'
        renderRandomCreature()}, 500);
        //change delay back to 3000 later
})

no.addEventListener('click', () => {
    yes.style.display = 'none'
    no.style.display = 'none'
    gameResults.style.display = 'inline-block'
    if (survivalResults()) {
        console.log("Yah, you're right you monster")
    } else {
        console.log("No, you're dead")
    }
    setTimeout(() => { 
        yes.style.display = 'inline-block'
        no.style.display = 'inline-block'
        renderRandomCreature()}, 500);
        //change delay back to 3000 later
})

//generate the survival score
function generateSurvivalScore(e) {
    let heightScore = 0;
    let gymScore = 0;
    
    switch (e.target.height.value) {
        case 'short':
            heightScore = 2;
            break;
        case "average":
            heightScore = 4;
            break;
        case 'tall':
            heightScore = 6;
            break;
    }

    switch (e.target.gym.value) {
        case 'years':
            gymScore = -1;
            break;
        case 'months':
            gymScore = 1;
            break;
        case 'days':
            gymScore = 3;
            break;
        case 'hours':
            gymScore = 6;
            break;
    }
    return survivalScore = heightScore + gymScore
}

//calculates survial odds
function survivalResults() {
    if (survivalScore >= deadlinessScore) {
        console.log('Survive')
        return true
    } else {
        console.log('Die')
        return false
    }
}

init()

