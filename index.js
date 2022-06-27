
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d') //type of canvas 3d or 2dwdw
//console.log(c)

let life = document.querySelector('#life');
let score = document.querySelector('#score');


let initialScreen = document.querySelector('.ScreenFront');
let loserScreen = document.querySelector('.ScreenLoser');
let winnerScreen = document.querySelector('.ScreenWinner');
let playbtn = document.querySelector('.play');
let  restartbtn = document.querySelector('.restart');
let menubtn = document.querySelector ('.menu');

let imgPLatforms = new Image()
let imgPLayer = new Image()
let imgMonkey = new Image()
let imgHouse = new Image()

let imgforest = new Image()

// const imgPLatforms = new Image()

 //console.log('ola')



canvas.width = 1024
canvas.height = 576

let canJump = true

let lifePoints = 3
let scorePoints = 0

let enemyMoveLeft = true

let gravity = 1.5


let timeForSidesEnemy = 2500
let t = setInterval(function () {
    enemyMoveLeft = ( enemyMoveLeft == true ? '' : enemyMoveLeft == false);
}, timeForSidesEnemy);






////////////////////////
// TESTANDOOO O RESTART.....

class House{
    constructor( {x , y }){ //creating the enemy
        this.position = {
            x,
            y

        }
        

        this.width = 350
        this.height = 350

    }//constructor 

    drawHouse(){ //now drawing the enemy
        //c.fillStyle = 'orange'
        c.drawImage( imgHouse,this.position.x, this.position.y, this.width, this.height) //here chamandp o canvas e pos e width..height

        imgHouse.src = './img/house.PNG'

    }

}//class house



class Goomba{
    constructor( {position, velocity}){ //creating the enemy
        this.position = {
            x: position.x,
            y: position.y,

        }
        this.velocity = {   //give movement to the enemy
            x: velocity.x,
            y: velocity.y,
        }   //give movement to the enemy

        this.width = 60
        this.height = 80

    }//constructor 

    draw(){ //now drawing the enemy
        //c.fillStyle = 'orange'
        c.drawImage( imgMonkey,this.position.x, this.position.y, this.width, this.height) //here chamandp o canvas e pos e width..height

        imgMonkey.src = './img/gorleft.PNG'

    }
    update() {
        this.draw()

          

       // console.log(enemyMoveLeft)

        // here switching the left and right to the enemy
        if(enemyMoveLeft === true){
            this.position.x += this.velocity.x
        }else{
            this.position.x -= this.velocity.x
        }

        // for(let i= 0; i < timeForSidesEnemy; i ++){
        //     setTimeout
        // }


      // this.position.x -= this.velocity.x
        this.position.y += this.velocity.y

        if(this.position.y + this.height + this.velocity.y <= canvas.height){ //aki ta vendo se e menor pq no canas o num aumenta indo pra baixo, 
            this.velocity.y += gravity //acelerando overtime conforme vai rolando o game vai acelerando
       }


    }

}//enemy classs
 
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
       // c.fillStyle = 'red'
        // where it will be drawing and how big is it passand altura largura e posicoes
        //c.fillRect(this.position.x, this.position.y, this.width, this.height)


        //switching the old red box player to an image you created
          //using the same position x/y for this image  
       c.drawImage(imgPLayer,this.position.x, this.position.y, this.width, this.height )

      imgPLayer.src = './img/tiao.PNG'
    }//draw

    update(){//here increasing overtime // but you need a aniamtion function
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
        //checking the gravity conditions
        if(this.position.y + this.height + this.velocity.y <= canvas.height){ //aki ta vendo se e menor pq no canas o num aumenta indo pra baixo, 
             this.velocity.y += gravity //acelerando overtime conforme vai rolando o game vai acelerando
        }else{
            //here make player stop to fall after hit the ground of the canvas // qdo bate no chao docanvas ele para de cair
            this.velocity.y = 0 //condicoes da queda, se o corpo encostar no chao do canvas no height na altura do canvas no fundo

        }
        if(this.velocity.y != 0){
            canJump = false
        }else{
            canJump = true
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

        this.width = 400
        this.height = 120
        

    } //constructor
    drawPlatform(){
        // here was the old way to make the platforms now is comented because we will add the new image
        //c.fillStyle = 'blue'
        //c.fillRect(this.position.x, this.position.y, this.width, this.height)

      //switching the old blue box platfofm to an image you created
        //using the same position x/y for this image  
     c.drawImage(imgPLatforms,this.position.x, this.position.y, this.width, this.height )
    
   

    imgPLatforms.src = './img/platform2.PNG'

    }
    
    
}//Platform Function

class River {
    constructor( {x , y  }){
        this.position ={
            x, //now you give this value for each platform inside the array it is automatic
            y //now you give this value for each platform inside the array it is automatic
        }

        this.width = 400
        this.height = 50
        

    } //constructor
    drawRiver(){
        
        // here was the old way to make the platforms now is comented because we will add the new image
        c.fillStyle = 'green'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    
    
}//Platform Function




   //creating player
        //here is actually making the  player show up at the position x / y
        let player = new Player()

       //let enemys = new []

    //creating platforms
        //here is actually making the  plaTFORM show up at the position x / y
        //const platform = new Platform()
    //creating multpiles platforms
        let platforms = [
            new Platform({
                x: -1,
                y:480,
                //image: image
                }), 
            new Platform({
                x: 580,
                y:480,
                //image: image
                }),
            new Platform({
                x: 980,
                y:380,
                
                //image: image
                }),
            new Platform({
                x:1420,
                y:380,
                    
                //image: image
                }),
            new Platform({
                x:1850,
                y:280,
                        
                //image: image
                }),
            new Platform({
                x:2490,
                y:480,
                            
                //image: image
                }),
            new Platform({
                x:2990,
                y:480,
                                
                //image: image
                }),
            new Platform({
                x:3400,
                y:380,
                                    
                //image: image
                }),
            new Platform({
                x:3840,
                y:480,
                                        
                //image: image
                }),
            new Platform({
                x:4240,
                y:480,
                                            
                //image: image
                }),
            new Platform({
                x:4640,
                y:480,
                                                
                //image: image
                }),
            new Platform({
                x:5040,
                y:480,
                                                    
                //image: image
                }),
            new Platform({
                x:5440,
                y:480,
                                                        
                //image: image
                })
           
                   

            
        // new Platform({x: 530, y:500}),
        // new Platform({x: 930, y:500})
        ]
        //creating the rivers
        let rivers = [
            new River({
                x: 200,
                y:550,
                //image: image
                })  
       
        ]

        //creating HOUSE
        let houses = [
            new House({
                x: 4450,
                y: 180
            })
        ]
    //creating ENEMY
       let goombas = [
           new Goomba({
            position:{
                x:800,
                y:100
            },
            velocity:{
                x: -0.4,
                y: 0
            }
        }),
        new Goomba({
            position:{
                x:1200,
                y:100
            },
            velocity:{
                x: -0.4,
                y: 0
            }
        }),
        new Goomba({
            position:{
                x:1600,
                y:100
            },
            velocity:{
                x: -0.4,
                y: 0
            }
        }),
        new Goomba({
            position:{
                x:2010,
                y:90
            },
            velocity:{
                x: -0.4,
                y: 0
            }
        }),
        new Goomba({
            position:{
                x:2600,
                y:90
            },
            velocity:{
                x: -0.4,
                y: 0
            }
        }),
        new Goomba({
            position:{
                x:2670,
                y:90
            },
            velocity:{
                x: -0.4,
                y: 0
            }
        }),
        new Goomba({
            position:{
                x:3090,
                y:90
            },
            velocity:{
                x: -0.4,
                y: 0
            }
        }),
        new Goomba({
            position:{
                x:3590,
                y:90
            },
            velocity:{
                x: -0.4,
                y: 0
            }
        }),
        new Goomba({
            position:{
                x:4000,
                y:90
            },
            velocity:{
                x: -0.4,
                y: 0
            }
        }),

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



/////////////////
///////////        //////////// ///////
///////// restarting





 //HERE  you are createing everything again but without the const or let... so when you call this function ... it will reset the previous creation you made before
    function init(){

       

    //creating player
        //here is actually making the  player show up at the position x / y
         player = new Player()
        
       // enemys = new []

    //creating platforms
        //here is actually making the  plaTFORM show up at the position x / y
        //const platform = new Platform()
    //creating multpiles platforms
         platforms = [
            new Platform({
                x: -1,
                y:480,
                //image: image
                }), 
            new Platform({
                x: 580,
                y:480,
                //image: image
                }),
            new Platform({
                x: 980,
                y:380,
                
                //image: image
                }),
            new Platform({
                x:1420,
                y:380,
                    
                //image: image
                }),
            new Platform({
                x:1850,
                y:280,
                        
                //image: image
                }),
            new Platform({
                x:2490,
                y:480,
                            
                //image: image
                }),
            new Platform({
                x:2990,
                y:480,
                                
                //image: image
                }),
            new Platform({
                x:3400,
                y:380,
                                    
                //image: image
                }),
            new Platform({
                x:3840,
                y:480,
                                        
                //image: image
                }),
            new Platform({
                x:4240,
                y:480,
                                            
                //image: image
                }),
            new Platform({
                x:4640,
                y:480,
                                                
                //image: image
                }),
            new Platform({
                x:5040,
                y:480,
                                                    
                //image: image
                }),
            new Platform({
                x:5440,
                y:480,
                                                        
                //image: image
                })
            
        // new Platform({x: 530, y:500}),
        // new Platform({x: 930, y:500})
        ]
        //creating the rivers
         rivers = [
            new River({
                x: 200,
                y:550,
                //image: image
                })  
       
        ]
    //creating ENEMY
        goombas = [
            new Goomba({
                position:{
                    x:800,
                    y:100
                },
                velocity:{
                    x: -0.4,
                    y: 0
                }
            }),
            new Goomba({
                position:{
                    x:1200,
                    y:100
                },
                velocity:{
                    x: -0.4,
                    y: 0
                }
            }),
            new Goomba({
                position:{
                    x:1600,
                    y:100
                },
                velocity:{
                    x: -0.4,
                    y: 0
                }
            }),
            new Goomba({
                position:{
                    x:2010,
                    y:90
                },
                velocity:{
                    x: -0.4,
                    y: 0
                }
            }),
            new Goomba({
                position:{
                    x:2600,
                    y:90
                },
                velocity:{
                    x: -0.4,
                    y: 0
                }
            }),
            new Goomba({
                position:{
                    x:2670,
                    y:90
                },
                velocity:{
                    x: -0.4,
                    y: 0
                }
            }),
            new Goomba({
                position:{
                    x:3090,
                    y:90
                },
                velocity:{
                    x: -0.4,
                    y: 0
                }
            }),
            new Goomba({
                position:{
                    x:3590,
                    y:90
                },
                velocity:{
                    x: -0.4,
                    y: 0
                }
            }),
            new Goomba({
                position:{
                    x:4000,
                    y:90
                },
                velocity:{
                    x: -0.4,
                    y: 0
                }
            })

       ] 

    //creating HOUSE
     houses = [
     new House({
            x: 4450,
            y: 180
        })
]


//this value will be changed every time when you press right checkDistancetoWin +=5 when press left checkDistancetoWin -=5
 checkDistancetoWin = 0 // will be use to check the distnace player alredy hit and see if he won or not the game

}//function INIT()







    ///////////TESTAANDO RESTART//

    /////////
    ///////
    ////
    ////



//aki checando todos os objetos no topo da platform ao inves de ser somente o player,, agora pode ser tb os inimigos
function isOnTopOfPlatform({object, platform}){
    return  (object.position.y + object.height <= platform.position.y && object.position.y + object.height + object.velocity.y >= platform.position.y && object.position.x + object.width >= platform.position.x && object.position.x <= platform.position.x + platform.width )

}


function CollisionTop({object1, object2}){
    return  (object1.position.y + object1.height <= object2.position.y && object1.position.y + object1.height + object1.velocity.y >= object2.position.y && object1.position.x + object1.width >= object2.position.x && object1.position.x <= object2.position.x + object2.width )

}



//everything in scene need to be called here to be to SHOW UP on screen
//here is drawig the player follwinng the draw functiion
//essa functoin is running everytime lot frames per second
function animate(){
    //vai chamar uma animacao em loop
    requestAnimationFrame(animate) // qual funcao vc quer  um looping? use a animate() 

    // //sem esse comando vai desenhar uma barra tipo arraastando o player pra baixo com rastro.. eese clear vai limpar isso e assim ver o player descendo qdo a gravity pull down
    // // aki vai limpar o x , y , e tb  a canvas inteira no width and height 
     //c.clearRect(0, 0, canvas.width, canvas.height ) // agora sim limpando o rastro que ficava atras  do player 

    //give some color to the cqanvas
    c.fillStyle = 'white'

    
       //c.drawImage (imgforest)

        //imgforest.src = './img/arvores.png'
    
      
    
        
    
    //c.beginPath()
    c.clearRect(0, 0, canvas.width, canvas.height ) // agora sim limpando o rastro que ficava atras  do player 


    houses.forEach(house => {
        house.drawHouse()
    })


     //selecting platforms goin trough all of them 
     rivers.forEach(river => {
        //here drawing the platform making the platform show up
         river.drawRiver()
    })

    
    
    //selecting platforms goin trough all of them 
    platforms.forEach(platform => {
        //here drawing the platform making the platform show up
         platform.drawPlatform()
    })

    // aki nesse index ta rastreando cada inimigo individual dentro do array dai destroy somente esse q vc pular em cima
   goombas.forEach((goomba, index) =>{
       goomba.update()

       if ( CollisionTop({
           object1: player,
           object2: goomba
       })) {
           //here throw the player up
           monkeyDieSound()
           player.velocity.y -= 35
           score10()
           //aki deleta o inimigo
           //            (inimigo, quantidade a ser destruido  = 1)
           goombas.splice(index , 1)
           console.log('relouda')
       } else if (
           //position.x e o lado direito do player
           //player.width e o tamanho inteiro do player  .... se o canot esq ate o final do corpo do player encostar no canto esq do inimio..=== collision ..aki somente lado esq do goomba
           player.position.x + player.width >= goomba.position.x && 
           //if player altura + player foot  >= goomba altura ( lembre q aki e tudo reverse pra cima e negativo)
           player.position.y + player.height >= goomba.position.y  &&
           player.position.x <= goomba.position.x + goomba.width
           

       )
       {

       changeLifePoints()
       ResetWholeGame()
       init()
        // player.position.x -= 65
        // //player.velocity.y -= 1.9
        // //changeLifePoints()
        //    console.log('relou esq')
       }
       else if(
        player.position.x + player.width <= goomba.position.x && 
        //if player altura + player foot  >= goomba altura ( lembre q aki e tudo reverse pra cima e negativo)
        // player.position.y + player.height <= goomba.position.y  &&
        player.position.x >= goomba.position.x + goomba.width
        
       ){
        changeLifePoints()
        ResetWholeGame()
        init()
        // player.position.x = 2
        // //player.velocity.y -= 1.9
        // //changeLifePoints()
        //    console.log('relou esq')
       }


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
    } else if((keys.left.pressed && player.position.x > 100 ) || (keys.left.pressed && checkDistancetoWin === 0 && player.position.x > 0 )){
        player.velocity.x = -5 //if press , turn press left true, and add velocity 
    }else{ 
        //ou se bater no limite para o player ..pq abaixo a plataforma que vai mecher
        player.velocity.x = 0 // if not press , turn press false, and set velocity = 0
        //se right estiver pressionado
        if(keys.right.pressed) {
              //it just change when platform moves
            checkDistancetoWin += 5 //heree going up with the distance check if player won the game
            

            houses.forEach(house => {
                house.position.x -= 5
                house.drawHouse()
            })

            platforms.forEach(platform => {//now the player respect all the platforms in the array
                platform.position.x -= 5 //same speed as the player moving
            })
            rivers.forEach(river => {//now the player respect all the platforms in the array
                river.position.x -= 5 //same speed as the player moving
            })

            

            goombas.forEach(goomba => {//now the player respect all the platforms in the array
                goomba.position.x -= 5 //same speed as the player moving
            })



            
        }else if (keys.left.pressed && checkDistancetoWin > 0) { // aki se for maior doque  checkdistance > 0 maior q 0 ... dai ele deixa rolar mais pra esq se ano for ... nao vai deixar
            //it just change when platform moves
            checkDistancetoWin -= 5  //heree going up with the distance check if player lose the game
            
            houses.forEach(house => {
                house.position.x += 5
                house.drawHouse()
            })

            //stop platforms to move
            platforms.forEach(platform => {//now the player respect all the platforms in the array
                platform.position.x += 5 //same speed as the player moving
            })

            rivers.forEach(river => {//now the player respect all the platforms in the array
                river.position.x += 5 //same speed as the player moving
            })

            

            // rivers.forEach(river => {//now the player respect all the platforms in the array
            //     river.position.x += 5 //same speed as the player moving
            // })

            goombas.forEach(goomba => {//now the player respect all the platforms in the array
                goomba.position.x += 5 //same speed as the player moving
            })
           
        }
        

    } 

    //console.log(checkDistancetoWin)
    

    //now the player respect all the platforms in the array
    platforms.forEach(platform => {
        // here stopping on the top of platform
    //assim que localiza colizao... fundo do player com o topo da platform... also qdo you have the plyer going out of the width of the platform
    //aki cheacndo fundo do player com o topo da platform,, e tambe o tamanha do player se ja passou da posicao a platform...
    // player altura    +  fundo dod player<= platform.altura &&   player.altura    +  fundo do player+ velocidade do player>=platform.altura &&  posicao do player esq/dir + larguradoplayer>= platfor posicao esq/dir && posicaoplayer<= posic/platform + plataform.largura...
    if( isOnTopOfPlatform ({
        object: player,
        platform: platform
    }) 
    )  { //here has to be <= because going up on canvas is negative
        player.velocity.y = 0 // here stops the player movement
        canJump = true
        }

        goombas.forEach(goomba => {
            if(isOnTopOfPlatform ({
                object: goomba,
                platform: platform
            })) {
                goomba.velocity.y = 0
            }
        })
       


    }) // loopForeach platforms


    
    console.log(checkDistancetoWin)
    if(checkDistancetoWin >= 3970){
        winnerScreen.style.display = 'flex'
        //console.log('YOU WIN')
    }

    if(player.position.y + player.height >= canvas.height){
        changeLifePoints()
        ResetWholeGame()
        //score10()
        init()
        console.log(lifePoints)
        console.log('you lose')

    }

    

}//animate function
animate()



//calling the teclas keyboard // esse keycode mostra o keycode de cada tecla 
addEventListener('keydown', ({ keyCode }) => { //ao inves de event pta ver o keyCode.. da tecla se vc colocar {keyCode} ele mostra direto o keyCode da tecla
    console.log(keyCode) // here calling the event inside the console you will be able to find the key code. ex: press 'A' and it shows the keycodecode '65'
    switch(keyCode){
        case 65:  //a
           // console.log('left')
            keys.left.pressed = true
            break
        case 83:  //s
           // console.log('down')
            break
        case 68:  //d
           // console.log('right')
            keys.right.pressed = true
            break
            //JUMP
        case 87:  //w
           // console.log('up')
            if(canJump === true){
                 // this -=20 will be constant it wont increase the value . player will move  in the same velocity
            player.velocity.y -= 30 //using negative numbe because the canvas down is positive and up is negative
            }
           
            break

    }//switch

   // console.log(keys.right.pressed)
})

//here is the same function as above this one... but now with keyup..
addEventListener('keyup', ({ keyCode }) => { //ao inves de event pta ver o keyCode.. da tecla se vc colocar {keyCode} ele mostra direto o keyCode da tecla
    console.log(keyCode) // here calling the event inside the console you will be able to find the key code. ex: press 'A' and it shows the keycodecode '65'
    switch(keyCode){
        case 65:  //a
           // console.log('left')
            keys.left.pressed = false
            //player.position.x -= 10
            break
        case 83:  //s
           // console.log('down')
            break
        case 68:  //d
            //console.log('right')
            keys.right.pressed = false
           // player.velocity.x = 0 // when keyup set this velocity to 0
            break
        case 87:  //w
            //console.log('up')
            //player.velocity.y -= 20 //using negative numbe because the canvas down is positive and up is negative
            break

    }//switch

    //console.log(keys.right.pressed)
})

//function fixJump
function changeLifePoints(){
    //let life = document.querySelector('#life');
    lifePoints -= 1
    life.innerHTML = lifePoints
}

function score10(){
    scorePoints += 10
    score.innerHTML = scorePoints
    // if(lifePoints <= 0){
    //     console.log(lifePoints)
    //    window.location.reload();
    // }
}



function ResetWholeGame(){
    if(lifePoints <= 0){
        console.log(lifePoints)
        loserScreen.style.display = 'flex'
        init()


        lifePoints += 3
        life.innerHTML = lifePoints

        scorePoints = 0
        score.innerHTML = scorePoints
       //location.reload();
    }else if(lifePoints > 0){
        loserScreen.style.display = 'none'
    }
   
}
ResetWholeGame()


function PLAYGAME (){

    gamestartSound()
    forestSOund()
    initialScreen.style.display = 'none'
}
function RESTATGAME() {
    gamestartSound()
    initialScreen.style.display = 'none'
    loserScreen.style.display = 'none'
    //location.reload()
  
    init()
    
    
}
function MENUBTN() {
    //monkeyDieSound()
    gamestartSound()
    //initialScreen.style.display = 'flex'
    location.reload()
    //init()
    
}




function WinnerButton(){
    gamestartSound()
    location.reload()
   // winnerScreen.style.display = 'none'
}


//SOUNDS//////////



function forestSOund(){
    var audio = new Audio('./audio/forestsound.wav')
    audio.play( )
}

function gamestartSound(){
    var audiogamestart = new Audio('./audio/gamestart.mp3')
    audiogamestart.play( )
   
}

function monkeyDieSound(){
    var monkeydiesound = new Audio('./audio/monkeydie.mp3')
    monkeydiesound.volume = 0.3
    monkeydiesound.play( )
}









// function loser(){
//     if( lifePoints <= 1){
//         console.log('vide 1 ponto')
//     }
// }
// loser()

//score10()
//here is working ...need to call it every time player looses life
//changeLifePoints()





//let imgPLatforms = new Image();

// imgPLatforms.onload = function(){
//     let w = canvas.width
//     let nw = imgPLatforms.naturalWidth;
//     let nh = imgPLatforms.naturalHeight;
//     let aspect = nw/nh;
//     let h = w / aspect;
// }