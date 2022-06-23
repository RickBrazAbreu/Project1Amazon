


const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d') //type of canvas 3d or 2dwdw
console.log(c)

//size of canvas //window.innerWidth makes the canvas fill the whole size of the screen in horizontal
//canvas.width = window.innerWidth
canvas.width = 1024
canvas.height = 576

// const imgWidth = 30
// const imgHeight = 30

// function resize() {
//     canvas.width = 1024
//     canvas.height = 576

//     c.drawImage(platformImg,0,0, imgWidth , height);
// }

const gravity = 1.5
 
//CREATING THE PLAYER
// it wont show the player yet , you will need to actually implement it 
class Player{
    //here cerating velocity"gravity" / body "PLayer" size,width../ and postion to spawn it
    constructor(){
        //here making the position where the player will be
        this.position = {
            x: 100, //horizontal
            y: 100  // vertical
        }
        //gravity
        //velocity you can choose any name you want
        this.velocity ={
            x: 0,
            // control the gravity velocity
            y: 0 //um num positivo pq no canvas qdo vc desce o num e positvo. cirando gravidade
        }

        //size of the player 
        this.width = 50
        this.height = 100
    }//constructor function
    //here using the canvas context c in this case 2d
    draw() {
        //adding color to the player
        c.fillStyle = 'red'
        // where it will be drawing and how big is it passand altura largura e posicoes
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }//draw

    update(){//here increasing overtime // but you need a aniamtion function
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
        //checking the gravity conditions
        if(this.position.y + this.height + this.velocity.y <= canvas.height){ //aki ta vendo se e menor pq no canas o num aumenta indo pra baixo, 
             this.velocity.y += gravity //acelerando overtime conforme vai rolando o game vai acelerando
        }else{
            this.velocity.y = 0 //condicoes da queda, se o corpo encostar no chao do canvas no height na altura do canvas no fundo

        }
    }

}//playerfunction


//CREATING THE PLATFORM
class Platform {
    constructor( {x , y  }){
        this.position ={
            x, //now you give this value for each platform inside the array it is automatic
            y //now you give this value for each platform inside the array it is automatic
        }

        //fixing the image size to matche with the platforms size
        // this.image = image 
        

        // this.width = image.width
        // this.height = image.height

        this.width = 200
        this.height = 20
        

    } //constructor
    drawPlatform(){
        //switching the old blue box platfofm to an image you created
        //using the same position x/y for this image
        //c.drawImage(this.image, this.position.x , this.position.y)


        // here was the old way to make the platforms now is comented because we will add the new image
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    
}//Platform Function


//creating a html image
//const image = new Image()

//image.src = platformImg
//console.log(image)


//here is actually making the  player show up at the position x / y
const player = new Player()
//here is actually making the  plaTFORM show up at the position x / y
//const platform = new Platform()
//creating multpiles platforms
const platforms = [
    new Platform({
        x: -1,
        y:500,
        //image: image
        }), 
        new Platform({
            x: 2200,
            y:500,
            //image: image
            })
   // new Platform({x: 530, y:500}),
   // new Platform({x: 930, y:500})
]


//here return true and false to the keys pressed
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}//keys function

//this value will be changed every time when you press right checkDistancetoWin +=5 when press left checkDistancetoWin -=5
let checkDistancetoWin = 0 // will be use to check the distnace player alredy hit and see if he won or not the game


//everything in scene need to be called here to be to SHOW UP on screen
//here is drawig the player follwinng the draw functiion
//essa functoin is running everytime lot frames per second
function animate(){
    //vai chamar uma animacao em loop
    requestAnimationFrame(animate) // qual funcao vc quer  um looping? use a animate() 

    // //sem esse comando vai desenhar uma barra tipo arraastando o player pra baixo com rastro.. eese clear vai limpar isso e assim ver o player descendo qdo a gravity pull down
    // // aki vai limpar o x , y , e tb  a canvas inteira no width and height 
    // c.clearRect(0, 0, canvas.width, canvas.height ) // agora sim limpando o rastro que ficava atras  do player 

    //guve some color to the cqanvas
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height ) // agora sim limpando o rastro que ficava atras  do player 


    
    //selecting platforms goin trough all of them 
    platforms.forEach(platform => {
        //here drawing the platform making the platform show up
         platform.drawPlatform()
    })

    //ao inves do console.log('..') , chame o player.update().. agora vai repetir a mesma acao varias vezes
    player.update() // aki chamando o update pq a function draw() foi chamada dentro do update()


    

    //using KEYBOARD to move
    //here call the keys true and false , if press set velocity.x = 5... if not press"false" set velocity.x = 0
    //MOVE BACKGROUND AND PLAYERlimite do movimento do player para movevr background
    if(keys.right .pressed && player.position.x < 600){ //remember you are activatign true and false  inside the eventelistener keyup / keydown you transform true and false there
        // velocity player moving
        player.velocity.x = 5 //if press , turn press right true, and add velocity
        //LIMITE PLYER NAO PASSA DA PAREDE NA ESQ LIMIT AREA TO PLAYER ON THE LEFT SIDE OF THE SCREEN
    } else if(keys.left.pressed && player.position.x > 100 ){
        player.velocity.x = -5 //if press , turn press left true, and add velocity 
    }else{ 
        //ou se bater no limite para o player ..pq abaixo a plataforma que vai mecher
        player.velocity.x = 0 // if not press , turn press false, and set velocity = 0
        //se right estiver pressionado
        if(keys.right.pressed) {
              //it just change when platform moves
            checkDistancetoWin += 5 //heree going up with the distance check if player won the game
            
            platforms.forEach(platform => {//now the player respect all the platforms in the array
                platform.position.x -= 5 //same speed as the player moving
            })
            
        }else if (keys.left.pressed) {
            //it just change when platform moves
            checkDistancetoWin -= 5  //heree going up with the distance check if player lose the game
            
            platforms.forEach(platform => {//now the player respect all the platforms in the array
                platform.position.x += 5 //same speed as the player moving
            })
           
        }
        

    } 

    console.log(checkDistancetoWin)
    

    //now the player respect all the platforms in the array
    platforms.forEach(platform => {
        // here stopping on the top of platform
    //assim que localiza colizao... fundo do player com o topo da platform... also qdo you have the plyer going out of the width of the platform
    //aki cheacndo fundo do player com o topo da platform,, e tambe o tamanha do player se ja passou da posicao a platform...
    // player altura    +  fundo dod player<= platform.altura &&   player.altura    +  fundo do player+ velocidade do player>=platform.altura &&  posicao do player esq/dir + larguradoplayer>= platfor posicao esq/dir && posicaoplayer<= posic/platform + plataform.largura...
    if(player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width){ //here has to be <= because going up on canvas is negative
        player.velocity.y = 0 // here stops the player movement
        }
    }) // loopForeach platforms

    if(checkDistancetoWin >= 1000){
        console.log('YOU WIN')
    }



}//animate function
animate()

//calling the teclas keyboard // esse keycode mostra o keycode de cada tecla 
addEventListener('keydown', ({ keyCode }) => { //ao inves de event pta ver o keyCode.. da tecla se vc colocar {keyCode} ele mostra direto o keyCode da tecla
    console.log(keyCode) // here calling the event inside the console you will be able to find the key code. ex: press 'A' and it shows the keycodecode '65'
    switch(keyCode){
        case 65:  //a
            console.log('left')
            keys.left.pressed = true
            break
        case 83:  //s
            console.log('down')
            break
        case 68:  //d
            console.log('right')
            keys.right.pressed = true
            break
            //JUMP
        case 87:  //w
            console.log('up')
            // this -=20 will be constant it wont increase the value . player will move  in the same velocity
            player.velocity.y -= 30 //using negative numbe because the canvas down is positive and up is negative
            break

    }//switch

    console.log(keys.right.pressed)
})

//here is the same function as above this one... but now with keyup..
addEventListener('keyup', ({ keyCode }) => { //ao inves de event pta ver o keyCode.. da tecla se vc colocar {keyCode} ele mostra direto o keyCode da tecla
    console.log(keyCode) // here calling the event inside the console you will be able to find the key code. ex: press 'A' and it shows the keycodecode '65'
    switch(keyCode){
        case 65:  //a
            console.log('left')
            keys.left.pressed = false
            //player.position.x -= 10
            break
        case 83:  //s
            console.log('down')
            break
        case 68:  //d
            console.log('right')
            keys.right.pressed = false
           // player.velocity.x = 0 // when keyup set this velocity to 0
            break
        case 87:  //w
            console.log('up')
            //player.velocity.y -= 20 //using negative numbe because the canvas down is positive and up is negative
            break

    }//switch

    console.log(keys.right.pressed)
})

