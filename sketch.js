var dog, happyDog, database, foodS, foodStock;

function preload() {
	dogImage = loadImage("images/Dog.png");
  happyDog = loadImage("images/happydog.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  
  dog = createSprite(250,300,150,150);
  dog.addImage(dogImage);
  dog.scale = 0.2;
  


  foodStock = database.ref('food');
  foodStock.on("value", readstock);
}


function draw() {  
  background(46,139,87);
  
  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  drawSprites();

  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
}

function readstock(data) {
  foodS = data.val();
}

function writeStock(x) {

  if(x <= 0) {
    x = 0;
  } else {
    x = x -1;
  }

  database.ref('/').update({
    'food':x
  })
}