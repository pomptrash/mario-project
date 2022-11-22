const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
const scoreBoard = document.querySelector('.scoreboard')
const gameBoard = document.querySelector('.game-board')
const gameStartScreen = document.querySelector('.game-start-screen')
const countdownScreen = document.querySelector('.countdown-screen')
const gameOverScreen = document.querySelector('.game-over-screen')
const finalScore = document.querySelector('.final-score')

const btnStart = document.querySelector('#btn-start')
const btnRestart = document.querySelector('#btn-restart')

function countdown(){
    gameStartScreen.style.display = 'none'
    countdownScreen.style.display = 'block'
    const timeCountdown = document.createElement('div')
    timeCountdown.className = 'countdown'
    countdownScreen.appendChild(timeCountdown)
    let seconds = 3
    
    const innerCountdown = setInterval(function(){
        timeCountdown.innerText = seconds--
        if (seconds < 0){
            clearInterval(innerCountdown)
            timeCountdown.style.display = 'none'
            return gameInit()
        }
    }, 1000)
}

function gameInit(){
    countdownScreen.style.display = 'none'
    gameBoard.style.display = 'block'

    function jump(){
        mario.classList.add('jump')
    
        setTimeout(() => {
            mario.classList.remove('jump')
        }, 500)
    
    }
    let score = 0
    const loop = setInterval(() => {

        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '')
    
        if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 95){
            pipe.style.animation = 'none'
            pipe.style.left = `${pipePosition}px`
    
            mario.style.animation = 'none'
            mario.style.bottom = `${marioPosition}px`
            mario.src = 'imgs/game-over.png'
            mario.style.width = '70px'
            mario.style.marginLeft = '50px'
            mario.id = 'morto'
            clearInterval(loop)
            gameBoard.style.display = 'none'
            gameOverScreen.style.display = 'flex'
            finalScore.innerText = score.toFixed()
            gameOverScreen.appendChild(finalScore)

            
        }
    
        if (mario.id == 'vivo'){
            scoreBoard.innerText = score.toFixed()
            score += 0.5
        }
    
    }, 10)
    
    document.addEventListener('keydown', jump)
    document.addEventListener('mousedown', jump)
    document.addEventListener('touchstart', jump)
}

function pageReload(){
    return document.location.reload()
}


btnStart.addEventListener('click', countdown)

btnRestart.addEventListener('click', pageReload)