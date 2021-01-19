//Create variables here
var dog;
var happyDog;
var database;
var foodS;
var foodStock;
var foodObj;
var feedDog, feed;
var lastFed;
var addFood, addFoods;
var fedTime;
var x;

function preload()
{
  //load images here
  dogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  
  dog = createSprite(400,300,50,50);
  dog.scale = 0.15;
  dog.addImage(dogImg);

  foodObj = new Food();

  feed = createButton("Feed the dog")
  feed.position(650,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(750, 95);
  addFood.mousePressed(addFoods);



    foodStock = database.ref('food');
    foodStock.on("value",readStock);

    lastFed = database.ref('lastFed');
    lastFed.on("value",readLastFed);
}

function draw() {  
  background(46,139,87);
  

  foodObj.display();

  //if(foodS === 0)

  drawSprites();
  //add styles here
  textSize(25);
  fill("black")
  text("Food Remaining : "+foodObj.getFoodStock(),10,65)

  textSize(10);
  text("Last Fed : "+foodObj.getLastFed(), 550,95)
  }


function readStock(data){
  var food = data.val();
  foodObj.setFoodStock(food);
}


function feedDog(){
  dog.addImage(happyDogImg);

  foodObj.deductFood();
  database.ref('/').update({
    food : foodObj.getFoodStock(),
    lastFed : hour()

  })

}

function addFoods(){
  dog.addImage(dogImg);
  foodObj.addFoodStock()
  database.ref('/').update({
    food: foodObj.getFoodStock()
  })

}

function readLastFed(data){
  foodObj.setLastFed(data.val());

}