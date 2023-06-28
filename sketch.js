 //Pong, mas recriado por mim
 //Eggsbennedit, Marcos



//ESTADO DO JOGO
var jogoEstado = "menu";
var botSingle;
var botMulti;
var botMenu;


  //BOLINHA
var xBolinha = 300;
var yBolinha = 200;
var velocidadeXBolinha = 5; //para testar gameOver, 285
var velocidadeYBolinha = 5;
var diametro = 30;
var raio = 15;

//MINHA RAQUETE
var xRaquete = 5;
var yRaquete = 150;
var comprimentoRaquete = 7;
var alturaRaquete = 100;

//BOT
var xInimigo = 587;
var yInimigo = 150;
var velInimigoBot;

//PONTO
var Pontuacao1 = 0;
var Pontuacao2 = 0;


function setup(){
  createCanvas(600, 400);
  frameRate(60);
  botSingle = createButton('Single Player');
  botSingle.position(200, 175);
  botSingle.style("font-family", "fantasy")
  botSingle.style("font-size", "25px")
  botSingle.size(200, 60);
  botSingle.mousePressed(mudar1);
  
  botMulti = createButton('Multi Player');
  botMulti.position(200, 275);
  botMulti.style("font-family", "fantasy")
  botMulti.style("font-size", "25px")
  botMulti.size(200, 60);
  botMulti.mousePressed(mudar2);
  
  botMenu = createButton('Voltar para o menu');
  botMenu.position(200, 275);
  botMenu.style("font-family", "fantasy")
  botMenu.style("font-size", "25px")
  botMenu.size(200, 60);
  botMenu.mousePressed(mudar3);
}

function draw(){
  //INÍCIO
  if(jogoEstado == "menu"){
    menu();
  }
  
  //JOGANDO
  if(jogoEstado == "singlePlayer"){
    singlePlayer();
  }
  if(jogoEstado == "multiPlayer"){
    multiPlayer();
  }
  
  //FIM DE JOGO
  if(jogoEstado == "gameOver1"){ //single
    gameOver1();
  }
  if(jogoEstado == "gameOver2"){ //multi
    gameOver2();
  }
}

////////// MUDANÇAS
function mudar1(){
  jogoEstado = "singlePlayer"
}
function mudar2(){
  jogoEstado = "multiPlayer"
}
function mudar3(){
  Pontuacao1 = 0;
  Pontuacao2 = 0;
  jogoEstado = "menu";
xBolinha = 300;
yBolinha = 200;
velocidadeXBolinha = 5; //para testar gameOver, 285 
velocidadeYBolinha = 4;
diametro = 30;
 raio = 15;
xRaquete = 5;
yRaquete = 150;
comprimentoRaquete = 7;
alturaRaquete = 100;
xInimigo = 587;
yInimigo = 150;
}


////////// JOGO
function menu(){
  background(255);
  textSize(50);
  textAlign(CENTER);
  textStyle("bold");
  text('Pong', 300, 100);
  fill(0);
  botSingle.show();
  botMulti.show();
  botMenu.hide();
}

function singlePlayer(){
  background(0);
  botSingle.hide();
  botMulti.hide();
  bolinha();
  raqueteSingle();
  inimigoBot();
  debug();
  pontuacao();
}


function multiPlayer(){
  background(0);
  botSingle.hide();
  botMulti.hide();
  bolinha();
  raqueteMulti();
  inimigo();
  debug();
  pontuacao();
}

function bolinha(){
  //CRIA BOLINHA
  circle(xBolinha, yBolinha, diametro);

  //MOVIMENTA A BOLINHA
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
  
  //COLISAO BORDA
  if(xBolinha + raio == width || xBolinha - raio == 0){
    velocidadeXBolinha *= -1;
  }
  if(yBolinha + raio == height || yBolinha - raio == 0){
  velocidadeYBolinha *= -1;
  }
  
  //COLISAO RAQUETE
  if(xBolinha - raio < xRaquete + comprimentoRaquete && yBolinha -  raio < yRaquete + alturaRaquete && yBolinha + raio > yRaquete){
  velocidadeXBolinha *= -1;
  }
  
  if(xBolinha + raio > xInimigo - comprimentoRaquete && yBolinha -  raio < yInimigo + alturaRaquete && yBolinha + raio > yInimigo){
 velocidadeXBolinha *= -1;
  }
}


function raqueteSingle(){
  rect(xRaquete, yRaquete, comprimentoRaquete, alturaRaquete);
  if(keyIsDown(UP_ARROW)){
    yRaquete -= 7;
  }
  if(keyIsDown(DOWN_ARROW)){
    yRaquete += 7;
  }
}

function raqueteMulti(){
  rect(xRaquete, yRaquete, comprimentoRaquete, alturaRaquete);
  if(keyIsDown(87)){
    yRaquete -= 7;
  }
  if(keyIsDown(83)){
    yRaquete += 7;
  }
}

function inimigoBot(){
  rect(xInimigo, yInimigo, comprimentoRaquete, alturaRaquete);
  velInimigoBot = yBolinha - yInimigo - comprimentoRaquete/2 - 40;
  yInimigo += velInimigoBot/8 + 4;
}

function inimigo(){
  rect(xInimigo, yInimigo, comprimentoRaquete, alturaRaquete);
  if(keyIsDown(UP_ARROW)){
    yInimigo -= 7;
  }
  if(keyIsDown(DOWN_ARROW)){
    yInimigo += 7;
  }
}

function debug(){
  if(xBolinha < 0 || xBolinha > width){
    xBolinha = 300;
  }
}

function pontuacao(){
  textSize(20);
  text(Pontuacao1, 250, 25);
  fill(220, 220, 220);
  if(xBolinha + raio == width){
    Pontuacao1 += 1;}
    
    textSize(20);
  text(Pontuacao2, 350, 25);
  fill(220, 220, 220);
  if(xBolinha - raio == 0){
    Pontuacao2 += 1;}
  
  if(jogoEstado == "multiPlayer" && Pontuacao1 == 10 || jogoEstado == "multiPlayer" && Pontuacao2 == 10){
  jogoEstado = "gameOver1"
  }
  if(jogoEstado == "singlePlayer" && Pontuacao1 == 10 || jogoEstado == "singlePlayer" && Pontuacao2 == 10){
  jogoEstado = "gameOver2"
  }
}

function gameOver1(){ //multiplayer
  clear();
  background(100);
  if(Pontuacao1 == 10){
  textSize(30);
  text('Jogador 1 vence!', 300, 100);
  textAlign(CENTER);
  textStyle("bold");
  }
  if(Pontuacao2 == 10){
  textSize(30);
  text('Jogador 2 vence!', 300, 100);
  textAlign(CENTER);
  textStyle("bold");
  }
  botMenu.show();
}

function gameOver2(){ //singleplayer
  clear();
  background(100);
  if(Pontuacao1 == 10){
  textSize(30);
  text('Você venceu!', 300, 100);
  textAlign(CENTER);
  textStyle("bold");
  }
  if(Pontuacao2 == 10){
  textSize(30);
  text('Você perdeu!', 300, 100);
  textAlign(CENTER);
  textStyle("bold");
  }
  botMenu.show();
}