'use strict';

console.log('hello world!');

// ******* GLOBALS *********
let itemArray = [];
let votingRounds = 25;

// ******* DOM WINDOWS ********
let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
let resultsButton = document.getElementById('show-results-button');
let resultsList = document.getElementById('results-container');

// ******* CONSTRUCTOR FUNCTION ********
function Item(name, fileExtension = 'jpg'){
  this.name = name;
  this.image = `img/${name}.${fileExtension}`;
  this.votes = 0;
  this.views = 0;
  // itemArray.push(this);
}

// ****** HELPER FUNCTIONS / UTILITIES ******

function randomIndex(){
  return Math.floor(Math.random() * itemArray.length);
}

function renderImg(){
  // TODO: 3 images on the page
  let imgOneIndex = randomIndex();
  let imgTwoIndex = randomIndex();
  let imgThreeIndex = randomIndex();
  console.log(imgOneIndex, imgTwoIndex, imgThreeIndex);
  // TODO: Make sure the images are unique
  // ** COMPARE IMG 1 & IMG 2 while they are the same get a new randomIndex
  // ** could you use another form of storage for indexes to do your validation against that? **
  while(imgOneIndex === imgTwoIndex || imgOneIndex === imgThreeIndex || imgTwoIndex === imgThreeIndex){
    imgTwoIndex = randomIndex();
    imgThreeIndex = randomIndex();
  }
  imgOne.src = itemArray[imgOneIndex].image;
  imgOne.alt = itemArray[imgOneIndex].name;
  // imgOne.alt = `this is an image of ${itemArray[imgOneIndex].name}`;

  imgTwo.src = itemArray[imgTwoIndex].image;
  imgTwo.alt = itemArray[imgTwoIndex].name;
  // imgTwo.alt = `this is an image of ${itemArray[imgTwoIndex].name}`;

  imgThree.src = itemArray[imgThreeIndex].image;
  imgThree.alt = itemArray[imgThreeIndex].name;
  // imgThree.alt = `this is an image of ${itemArray[imgThreeIndex].name}`;

  // TODO: increase the views on the images
  itemArray[imgOneIndex].views++;
  itemArray[imgTwoIndex].views++;
  itemArray[imgThreeIndex].views++;
}

// function randomIndex(){
//   return Math.floor(Math.random() * itemArray.length);
// }

function handleImgClick(event){
  // TODO: Identify the image that was clicked
  let imgClicked = event.target.alt;
  console.dir(imgClicked);

  // TODO: Increase the number of clicks on that image
  for(let i = 0; i < itemArray.length; i++){
    if(imgClicked === itemArray[i].name){
      itemArray[i].votes++;
    }
  }

  // TODO: decrement the voting rounds
  votingRounds--;

  // TODO: Rerender of Imgs
  renderImg();

  // TODO: once votings are done - stop the click
  if(votingRounds === 0){
    imgContainer.removeEventListener('click', handleImgClick);
    document.getElementById('show-results-button').style = 'visiblity: visible';
  }
}

function handleShowResults(){
  if(votingRounds === 0){
    for(let i = 0; i < itemArray.length; i++){
      let itemListItem = document.createElement('li');
      itemListItem.textContent = `${itemArray[i].name}: Views: ${itemArray[i].views} & Votes: ${itemArray[i].votes}`;
      resultsList.appendChild(itemListItem);
    }
    resultsButton.removeEventListener('click', handleShowResults);
  }
}

// ***** EXECTUABLE CODE ******
let bagItem = new Item('bag');
let bananaItem = new Item('banana');
let bathroomItem = new Item('bathroom');
let bootsItem = new Item('boots');
let breakfastItem = new Item('breakfast');
let bubblegumItem = new Item('bubblegum');
let chairItem = new Item('chair');
let cthulhuItem = new Item('cthulhu');
let dogduckItem = new Item('dog-duck');
let dragonItem = new Item('dragon');
let penItem = new Item('pen');
let petsweepItem = new Item('pet-sweep');
let scissorsItem = new Item('scissors');
let sharkItem = new Item('shark');
let sweepItem = new Item('sweep', 'png');
let tauntaunItem = new Item('tauntaun');
let unicornItem = new Item('unicorn');
let watercanItem = new Item('water-can');
let wineglassItem = new Item('wine-glass');

itemArray.push(bagItem,bananaItem,bathroomItem,bootsItem,breakfastItem,bubblegumItem,chairItem,cthulhuItem,dogduckItem,dragonItem,penItem,petsweepItem,scissorsItem,sharkItem,sweepItem,tauntaunItem,unicornItem,watercanItem,wineglassItem);
console.log(itemArray);
renderImg();

imgContainer.addEventListener('click', handleImgClick);
resultsButton.addEventListener('click', handleShowResults);