const gameCard = document.getElementById('game-card');
const userForm = document.getElementById('user-form');
const loginCard = document.getElementById('login-card');
const creatureImg = document.querySelector('img');
const gameResults = document.getElementById('results')
const windowResY = window.screen.height;
const headerTwo = document.querySelector('h2')
const leaderboardCard = document.createElement('div')
const healthBar = document.getElementById('health-bar')
leaderboardCard.id = 'leaderboard-card'
//yes and no buttons
const yes = document.getElementById('yes')
const no = document.getElementById('no')
let randomArray = []
generateArray()
//can toggle devmode by commenting it out
devMode()

//Survival Score, Username, and Final Score
let survivalScore = 0
let deadlinessScore = 0
let username = ''
let finalScore = 0
let lifebar = ['X', 'X', 'X']

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
            generateSurvivalScore(e)
            username = e.target['user-name'].value
            console.log(username)
            renderRandomCreature(randomArray[0])
            addHealthBar(lifebar)
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
        deadlinessScore = data.deadliness
        headerTwo.innerText = data.name
        gameResults.style.display = 'none'
    })
    //removes the first index of the array each time this function is called
    randomArray.shift()
}

yes.addEventListener('click', () => {
    yes.style.display = 'none'
    no.style.display = 'none'
    gameResults.style.display = 'inline-block'
    if (survivalResults()) {
        gameResults.innerText = `Have more confidence ${username}, you're good`
        if (lifebar.length > 1) {
            lifebar.pop()
            healthBar.removeChild(healthBar.firstChild)
            console.log(lifebar)
        } else if (lifebar.length === 1) {
            lifebar.pop()
            healthBar.innerHTML = ''
            randomArray = []
            headerTwo.textContent = "Leaderboard"
            hideGame()
            gameCard.append(playAgain)
            playAgain.style.display = "inline-block"
        }
    } else {
        gameResults.innerText = `Yah ${username}, you better run`
        finalScore += 1
    }
    setTimeout(nextCard(randomArray[0]), 500);
        //change delay back to 3000 later
})

no.addEventListener('click', () => {
    yes.style.display = 'none'
    no.style.display = 'none'
    gameResults.style.display = 'inline-block'
    if (survivalResults()) {
        gameResults.innerText = `Yah ${username}, you're right you monster`
        finalScore += 1
    } else {
        gameResults.innerText = `No ${username} no, you're dead`
        if (lifebar.length > 1) {
            lifebar.pop()
            healthBar.removeChild(healthBar.firstChild)
        } else if (lifebar.length === 1) {
            lifebar.pop()
            healthBar.innerHTML = ''
            randomArray = []
            headerTwo.textContent = "Leaderboard"
            hideGame()
            gameCard.append(playAgain)
            playAgain.style.display = "inline-block"
        }
    }
    setTimeout(nextCard(randomArray[0]), 500);
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
        addHealthBar(lifebar)
        console.log(lifebar)
    })
}

//populates random array with non-repeating integers
function generateArray(){
    for (let i = 0; i < 5; i++){
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
//arg1 should be array[0]
function nextCard(arg1){
    showGame()
    if(arg1 === undefined){
        headerTwo.textContent = "Leaderboard"
        hideGame()
        renderLeaderboard()
        gameCard.append(document.createElement('br'))
        gameCard.append(playAgain)
        playAgain.style.display = "inline-block"
        healthBar.innerHTML = ''
    }
    else(renderRandomCreature(arg1))
}
//play again button
const playAgain = document.createElement('button')
playAgain.textContent = "Play Again?"
playAgain.addEventListener('click', () => {
    generateArray()
    console.log(randomArray)
    showGame()
    renderRandomCreature(randomArray[0])
    //hidden to start the game, will be shown upon the emptying of array
    playAgain.style.display = "none"
    lifebar = ['X', 'X', 'X']
    addHealthBar(lifebar)
})

function hideGame(){
    yes.style.display = 'none'
    no.style.display = 'none'
    creatureImg.style.display = 'none'
    gameResults.style.display = 'none'
    leaderboardCard.style.display = 'inline-block'
}
function showGame(){
    yes.style.display = 'inline-block'
    no.style.display = 'inline-block'
    creatureImg.style.display = 'block'
    gameResults.style.display = 'inline-block'
    leaderboardCard.style.display = 'none'
}

function renderLeaderboard(){
    gameCard.append(leaderboardCard)
    fetch("http://localhost:3000/leaderboard")
    .then(res => res.json())
    .then((data) => {
        data.forEach((datum) => {
            const leaderboardEntry = document.createElement('p')
            leaderboardEntry.textContent = `User: ${datum.name} --- Score: ${datum.score}`
            leaderboardCard.append(leaderboardEntry)
        })
    })
}

function addHealthBar(lifeArray) {
    addHealthBar.innerHTML = ''
    lifeArray.forEach(heart => {
        let p = document.createElement('p').innerHTML = heart
        healthBar.append(p)
    })
}
