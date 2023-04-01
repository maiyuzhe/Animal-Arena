const gameCard = document.getElementById('game-card');
const userForm = document.getElementById('user-form');
const loginCard = document.getElementById('login-card')
const windowResY = window.screen.height;
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

    })

}

init()