const gameCard = document.getElementById('game-card')
const windowResY = window.screen.height

function resolutionCheck(){
    console.log(window.devicePixelRatio)
    console.log(window.screen.width)
    console.log(window.screen.height)
    
    return gameCard.style.height = (windowResY*0.8)+"px"
}