const gameCard = document.getElementById('game-card')
const windowResY = window.screen.height
//bases card size off of user's screen resolution
function init(){
    gameCard.style.height = (windowResY*0.8)+"px"
    gameCard.style['margin-top'] = '1.5%'
}

init()