//#region CONFIGURATION CONSTANTS
const TICK = 20

const JUMP_TICK = 10
const MAX_JUMP = 160

const CACTUS_INITIAL_POSITION = 1000
const CACTUS_SPEED = 9

const DINO_SIZE = 60
const CACTUS_SIZE = 60

const JUMP_KEY = 32 // Spacebar

//#endregion

const dino = document.querySelector('.dino')
const background = document.querySelector('.background')
let dinoPosition = 0

let isJumping = false

function handleKeyUp(event) {
    if (event.keyCode === JUMP_KEY) {
        if (! isJumping) {
            jump()
        }
    }
}

function jump() {
    isJumping = true

    let upInterval = setInterval(() => {
        if (dinoPosition >= MAX_JUMP) {
            clearInterval(upInterval)
            
            let downInterval = setInterval(() => {
                if (dinoPosition <= 0) {
                    clearInterval(downInterval)
                    isJumping = false
                } else {
                    dinoPosition -= JUMP_TICK
                    dino.style.bottom = `${dinoPosition}px`
                }
            }, TICK)
        } else {
            dinoPosition += JUMP_TICK
            dino.style.bottom = `${dinoPosition}px`
        }
    }, TICK)
}

function createCactus() {
    const cactus = document.createElement('div')
    let cactusPosition = CACTUS_INITIAL_POSITION
    let randomTime = Math.random() * 6000

    cactus.classList.add('cactus')
    cactus.style.left = `${cactusPosition}px`

    background.appendChild(cactus)

    let leftInterval = setInterval(() => {
        if (cactusPosition < -CACTUS_SIZE) {
            clearInterval(leftInterval)
            background.removeChild(cactus)
        } else if (cactusPosition > 0 && cactusPosition < CACTUS_SIZE && dinoPosition < 60) {
            clearInterval(leftInterval)
            document.body.innerHTML = '<h1>Game Over</h1>'
        } else {
            cactusPosition -= CACTUS_SPEED
            cactus.style.left = `${cactusPosition}px`
        }
    }, TICK);

    setTimeout(createCactus, randomTime)
}

createCactus()
document.addEventListener('keyup', handleKeyUp)