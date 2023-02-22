'use strict';

console.log('hello world!');

// ******* GLOBALS *********
let itemArray = [];
let votingRounds = 25;
let photoArray = [];

// ******* DOM WINDOWS ********
let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
let resultsButton = document.getElementById('show-results-button');

// ***** CANVAS ELEMENT FOR CHART *****
let ctx = document.getElementById('my-chart');

// ******* CONSTRUCTOR FUNCTION ********
function Item(name, fileExtension = 'jpg') {
  this.name = name;
  this.image = `img/${name}.${fileExtension}`;
  this.votes = 0;
  this.views = 0;
}

// ****** HELPER FUNCTIONS / UTILITIES ******

function randomIndex() {
  return Math.floor(Math.random() * itemArray.length);

function renderImg() {

  while(photoArray.length < 6){
    let randNum = randomIndex();
    if(!photoArray.includes(randNum)){
      photoArray.push(randNum);
  }
}
  console.log(photoArray);

  let imgOneIndex = photoArray.shift();
  let imgTwoIndex = photoArray.shift();
  let imgThreeIndex = photoArray.shift();

  imgOne.src = itemArray[imgOneIndex].image;
  imgOne.alt = itemArray[imgOneIndex].name;

  imgTwo.src = itemArray[imgTwoIndex].image;
  imgTwo.alt = itemArray[imgTwoIndex].name;

  imgThree.src = itemArray[imgThreeIndex].image;
  imgThree.alt = itemArray[imgThreeIndex].name;

  // TODO: increase the views on the images
  itemArray[imgOneIndex].views++;
  itemArray[imgTwoIndex].views++;
  itemArray[imgThreeIndex].views++;
}

// *** Helper Function TO RENDER CHART ***

function renderChart() {

  let itemNames = [];
  let itemVotes = [];
  let itemViews = [];

for (let i = 0; i < itemArray.length; i++) {
  itemNames.push(itemArray[i].name);
  itemVotes.push(itemArray[i].votes);
  itemViews.push(itemArray[i].views);
}

let chartObj = {
  type: 'bar',
  data: {
    labels: itemNames,
    datasets: [{
    label: '# of Votes',
    data: itemVotes,
    borderWidth: 2,
    backgroundColor: ['#4f1cea'],
    borderColor: ['white'],
  },
  {
    label: '# of Views',
    data: itemViews,
    borderWidth: 2,
    backgroundColor: ['#fcba03'],
    borderColor: ['white'],
  }]
},
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
};

  new Chart(ctx, chartObj); //eslint-disable-line
}

// *** EVENT HANDLERS ***

function handleImgClick(event) {
  // TODO: Identify the image that was clicked
  let imgClicked = event.target.alt;
  console.dir(imgClicked);

  // TODO: Increase the number of clicks on that image
  for (let i = 0; i < itemArray.length; i++) {
    if (imgClicked === itemArray[i].name) {
      itemArray[i].votes++;
    }
  }

  // TODO: decrement the voting rounds
  votingRounds--;

  // TODO: Rerender of Imgs
  renderImg();

  // TODO: once votings are done - stop the click
  if (votingRounds === 0) {
    imgContainer.removeEventListener('click', handleImgClick);
  }
}

function handleShowResults() {
  if (votingRounds === 0) {

    renderChart();

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

itemArray.push(bagItem, bananaItem, bathroomItem, bootsItem, breakfastItem, bubblegumItem, chairItem, cthulhuItem, dogduckItem, dragonItem, penItem, petsweepItem, scissorsItem, sharkItem, sweepItem, tauntaunItem, unicornItem, watercanItem, wineglassItem);
console.log(itemArray);

renderImg();

imgContainer.addEventListener('click', handleImgClick);
resultsButton.addEventListener('click', handleShowResults);