//Create variables here
var dog, dogImg1, dogImg2;

var foodS, foodStock;

var database;

function preload()
{
  //load images here
  dogImg1 = loadImage("images/dogImg.png");
  dogImg2 = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  
  //create bodies here
  dog = createSprite(250,300,30,10);
  dog.addImage("dogImage",dogImg1);
  dog.scale = 0.2;
 

  foodStock = database.ref('Food');
  foodStock.on("value",readStock,showError);

  // console.log(foodS);
}

function draw() {  
  background(rgb(46, 138, 87));

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage("happyDog",dogImg2);
  }

  drawSprites();
  
  //add styles here
  textSize(17);
  fill("white");
  strokeWeight(1);
  text("Note: Press UP ARROW key to feed the Drago Milk!",70,50);
  text("Food Remaining: " + foodS,170,180);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  } else{
    x = x-1;
  }

  database.ref('/').update({
    Food:x
  })
}

function showError(){
  console.log("error");
}



  





