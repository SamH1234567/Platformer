canvas = document.getElementById("canvas")
context = canvas.getContext('2d')
var startButton = document.getElementById("startButton")
let movement;
window.onload = init
pixelBelow = []
u = 0
a = 0.008
playerWidth = 40
playerHeight = 100
velocity = 28
floorColour = 'green'
floorHeight = 20
onGround = null
input = false
playerJump = false
const friction = 1

controllerIndex = null;
let leftPressed = false
let rightPressed = false
let aPressed = false
function init(){
    
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    rightBoundary = canvas.width - playerWidth
    playerX = 500
    playerY = 250
draw()
}

    window.addEventListener("resize",init)
    window.addEventListener("gamepadconnected", (event)=> {
    controllerIndex = event.gamepad.index
    console.log('connected')
})

window.addEventListener("gamepaddisconnected", (event)=> {
    controllerIndex = null
})
function draw(){
    //console.log(pixelBelow)
    gameloop()
}

function gameloop(){
    clearScreen()
    drawPlayer()
    controllerInput()
    if(pixelBelow[0]!==0){
        fall()
    }
    updatePlayer()
    requestAnimationFrame(draw)
    }
    
function controllerInput(){
    if(controllerIndex !== null){
        gamepad = navigator.getGamepads()[controllerIndex]
        buttons = gamepad.buttons
        aPressed = buttons[0].pressed //a
        axes = gamepad.axes

        rightStick = gamepad.axes[2,3] // 2: horizontal, 3: vertical
        leftRightValue = gamepad.axes[0] //left stick || 0: horizontal, 1: vertical
        const stickDeadZone = 0.4

        if (leftRightValue >= stickDeadZone){
            rightPressed = true
        } else if (leftRightValue <= -stickDeadZone){
            leftPressed = true
        }
        
    }
}

function updatePlayer(){
    
    if(aPressed){
        jump()
        //playerY = playerY - velocity //insert suvat/gravity/jump function
    }
    if(playerX > 0){
    if(leftPressed){
        input = true
        playerX = playerX - velocity
        leftPressed = false
    } 
    }
    if(playerX < rightBoundary){
    if(rightPressed){
        input = true
        playerX = playerX + velocity
        rightPressed = false
    } 
    }
}

function clearScreen(){
    context.fillStyle = '#4CC1FF' //background
    context.fillRect(0,0, canvas.width, canvas.height)

    // platforms 
    context.fillStyle = floorColour //Bottom
    context.fillRect(canvas.width/2 -200,canvas.height - 160,500,floorHeight)

    context.fillStyle = floorColour //Top Left
    context.fillRect(100,200,250,floorHeight)

    context.fillStyle = floorColour //Top Right
    context.fillRect(canvas.width/2 +300,160,200,floorHeight)

    context.fillStyle = floorColour //Top
    context.fillRect(canvas.width/2 -200,350,400,floorHeight)

    context.fillStyle = floorColour //Mid-Right
    context.fillRect(canvas.width/2 +300,500,300,floorHeight)

    context.fillStyle = floorColour //Mid-Left
    context.fillRect(100,550,200,floorHeight)
}

function drawPlayer(){
    context.fillStyle = 'white'   //creating player
    context.fillRect(playerX,playerY,playerWidth,playerHeight)
    
}



document.addEventListener('keydown', (event) =>{
    switch(event.keyCode){
        case 65: //a
            movement = "left"
            playerX = playerX - velocity
        break;
        case 68: //d
            movement = "right"
            playerX = playerX + velocity
        break;
        case 32: //spacebar
            jump()
        break;

    }
}
)   

function jump(){
    pixelBelow_left = context.getImageData(playerX,playerY + playerHeight,1,1)
    pixelBelow_right = context.getImageData(playerX + playerWidth, playerY + playerHeight,1,1)
    console.log(pixelBelow)
    if(pixelBelow_left.data[0] == 0 || pixelBelow_right.data[0] == 0){
        onGround = true
        playerJump = false
        
        
    }
        else if(pixelBelow_left.data[0] !== 0 && pixelBelow_right.data[0] == 0){
        onGround = false
        playerJump = true
    } 

    if(onGround == true && playerJump == false){
        playerJump = true
        
        u = -2
        fall()
        
    }
    else{
        //alert(pixelBelow.data)
    }
}

function fall(){
    pixelBelow = context.getImageData(playerX,playerY + 101,1,1)
    pixelAhead = context.getImageData(playerX + velocity, playerY + 101 + u,1,1)
    
    if(u>0){
        for(i = playerY + 101; i< playerY +101 + u; i++){
            pixelBelow = context.getImageData(playerX,i,1,1)
            if(pixelBelow.data[0] == 0){
                onGround = true
            } else{
                onGround = false
                
        }
    }
    }else{
        for(i = playerY +101; i> playerY +101 + u; i--){ 
        pixelBelow = context.getImageData(playerX,i,1,1)
        if(pixelBelow.data[0] == 0){
            onGround = true
        } else{
            onGround = false
        
        }
    } 
    }
    /*if(pixelBelow.data[0] !== 0 && pixelAhead.data[0] !== 0){
        
        onGround = false
        
    } else if(pixelBelow.data[0] == 0 && pixelAhead.data[0]== 0){
        onGround = true
        
    }*/
    if(onGround == false || playerJump == true){
        console.log(u)
        playerY = playerY + u
        u = u + a
        playerJump = false
        requestAnimationFrame(fall)
    } 
    else if(onGround == true){
        //alert(onGround)
        canJump = true
        playerJump = false
        
    }
}

/* Useful Code

startButton.style.display ="none" // hides button, to show use 'block' instead of none

*/