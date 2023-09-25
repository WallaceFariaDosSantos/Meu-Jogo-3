//constantes
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

//variáveis
var engine, world, canvas;
var player, elementFire, elementWater, elementEarth, elementAir, elementDarkness, playerAtributes;
var playerLevel, backgroundImg, titleGif, controlButton, startButton;
var rat, tree, rock, money;
var cavaleiroPulando, cavaleiroAtacando, cavaleiroCaindo, cavaleiroCorrendo, cavaleiroParado, cloudImg, floorImg;
var level1, level2, level3, level4;
var keyDownTest = false;
var level = 0;
var gameState = 0;
var playerHealth = 100;
var playerStamina = 100;

//função preload
function preload(){
  cavaleiroAtacando = loadImage("./assets/CavaleiroAtacando.gif");
  cavaleiroPulando = loadImage("./assets/CavaleiroPulando.png");
  cavaleiroCaindo = loadImage("./assets/CaindoNoChão.gif");
  cavaleiroParado = loadImage("./assets/CavaleiroParado.gif");
  cavaleiroCorrendo = loadImage("./assets/CavaleiroCorrendo.gif");
  backgroundImg = loadImage("./assets/Background.gif");
  floorImg = loadImage("./assets/groundImg.png");
  cloudImg = loadImage("./assets/cloudImg.png");
  titleGif = loadImage("./assets/title.gif");

  cavaleiroAtacando.playing = true;
  cavaleiroCaindo.playing = true;
  cavaleiroCorrendo.playing = true;
  cavaleiroParado.playing = true;

  cavaleiroAtacando.looping = false;
  cavaleiroCaindo.looping = false;
  cavaleiroCorrendo.looping = true;
  cavaleiroParado.looping = true;
}

//função setup
function setup(){
//tela do jogo
  canvas = createCanvas(2000, 800);

//botões
  var botoes = new Botoes();
  botoes.display();

//engine e world
  engine = Engine.create();
  world = engine.world;

//sprites
//cavaleiro
  player = createSprite(100, 505, 20, 20);
  player.scale = 0.5;
  player.addImage("correndo", cavaleiroCorrendo);
  player.addImage("parado", cavaleiroParado);
  player.addImage("caindo", cavaleiroCaindo);
  player.addImage("pulando", cavaleiroPulando);
  player.addImage("atacando", cavaleiroAtacando);
  player.changeImage("parado");
  player.visible = false;

//grupos
  cloudGroup = new Group();
}


//função draw
function draw(){
  Engine.update(engine);

//condições
  if(gameState === 1){
    background(backgroundImg);
  }

  if(gameState === 0){
    background(titleGif);
  }

  if(gameState === -1){
    background("teal");
  }

  if(level === 1 || level === 2 || level === 3 || level === 4){
    background("skyblue");
    level1 = createSprite(1000, 700, 2000, -300);
    level1.addImage("ground1", floorImg);
    level1.scale = 2.55;
    player.visible = true;

    //texto
    fill("black")
    textSize(24);
    text("Stamina: " + playerStamina, 200, 100, 1000)

    if(playerStamina > 0 && playerHealth > 0){
      if(keyDown("d")){
        player.changeImage("correndo");
        player.scale = 0.54;
        level1.velocityX = -10;
        if(frameCount % 5 === 1){
          playerStamina -= 1;
        }
      }
      else if(keyDown("e")){
        player.changeImage("atacando");
        player.scale = 0.47;
        if(frameCount % 5 === 1){
          playerStamina -= 2;
        };
      }
      else{
        player.changeImage("parado");
        player.scale = 0.5;
        if(playerStamina < 100 && frameCount % 5 === 1){
          playerStamina += 1;
        }
        level1.velocityX = 0;
      }
    }
    else{
      player.changeImage("caindo");
    }
  }

//chamando funções
  if(level === 1 || level === 2 || level === 3 || level === 4){
    createClouds();
  }

//Barra de nível


//drawSprites
  drawSprites();
}

//outras funções que talvez sejam adicionadas
function createEnemy(){
  if(level == 1){
    var monsterLvl1;

  }
  if(level == 2){
    var monsterLvl2;

  }
  if(level == 3){
    var monsterLvl3;

  }
  if(level == 4){
    var monsterLvl4;

  }
}
function createClouds(){
  if(frameCount % 100 === 1){
    var cloud;
    cloud = createSprite(2200, 100, 10, 100);
    cloud.addImage("cloud", cloudImg);
    cloud.scale = 0.5;
    cloud.y = Math.round(random(75, 150));
    cloud.velocityX = -10;
    cloud.lifetime = 260;
    cloudGroup.add(cloud);
  }
}
