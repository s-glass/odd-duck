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
document.querySelector('h3').style.visibility = 'hidden';

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
}
function renderImg() {
  // let imgOneIndex = randomIndex();
  // let imgTwoIndex = randomIndex();
  // let imgThreeIndex = randomIndex();

  // while (imgOneIndex = imgTwoIndex){
  //   imgTwoIndex = randomIndex();
  // } if (imgOneIndex = imgThreeIndex){
  //   imgThreeIndex = randomIndex();
  // } else if (imgTwoIndex = imgThreeIndex){
  //   imgThreeIndex = randomIndex();
  // }

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

Chart.defaults.font.size = 20; //eslint-disable-line
Chart.defaults.font.weight = 'bold'; //eslint-disable-line

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
        beginAtZero: true,
      }
    },
  }
};

  new Chart(ctx, chartObj); //eslint-disable-line
}

// *** EVENT HANDLERS ***

function handleImgClick(event) {
  let imgClicked = event.target.alt;
  console.dir(imgClicked);

  for (let i = 0; i < itemArray.length; i++) {
    if (imgClicked === itemArray[i].name) {
      itemArray[i].votes++;
      votingRounds--;
      renderImg();
    }
  }

  if (votingRounds === 0) {
    imgContainer.removeEventListener('click', handleImgClick);
    // document.querySelector('h3').style.visibility = 'visible';

// **** LOCAL STORAGE STARTS HERE *******
// STEP 1 - CONVERT DATA TO STRING FOR LOCAL STORAG
let stringifiedItems = JSON.stringify(itemArray);

console.log('Stringified Items >>> ', stringifiedItems);

// STEP 2 - Set stringified items into local storage
localStorage.setItem('myItems', stringifiedItems);
}
}

function handleShowResults() {
  if (votingRounds === 0) {

    renderChart();

    resultsButton.removeEventListener('click', handleShowResults);
  }
}
// ***** EXECTUABLE CODE ******

// *** LOCALS STORAGE CONTINUES ****
// Step 3 - Get info from local storage

let retrievedItems = localStorage.getItem('myItems');

console.log('Items from local storage >>', retrievedItems);

// STEP 4 - CONVERT BACK TO USABLE CODE
let parsedItems = JSON.parse(retrievedItems);

console.log('Parsed Items >>>>', parsedItems);


// *** REBUILD Goats USING THE Constructor - the hard way *****

if(retrievedItems){
  for(let i = 0; i < parsedItems.length; i++){
    if(parsedItems[i].name === 'sweep'){
      let reconstructedSweep = new Item(parsedItems[i].name, 'png');
      reconstructedSweep.views = parsedItems[i].views;
      reconstructedSweep.votes = parsedItems[i].votes;
      itemArray.push(reconstructedSweep);
    } else {
      let reconstructedItem = new Item(parsedItems[i].name);
      reconstructedItem.views = parsedItems[i].views;
      reconstructedItem.votes = parsedItems[i].votes;
      itemArray.push(reconstructedItem);
    }
  }

} else {
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
}
// //*** Happy Path ***

// if (retrievedItems){
//   itemArray = parsedItems;
//  } else {
//     let bagItem = new Item('bag');
//   let bananaItem = new Item('banana');
//   let bathroomItem = new Item('bathroom');
//   let bootsItem = new Item('boots');
//   let breakfastItem = new Item('breakfast');
//   let bubblegumItem = new Item('bubblegum');
//   let chairItem = new Item('chair');
//   let cthulhuItem = new Item('cthulhu');
//   let dogduckItem = new Item('dog-duck');
//   let dragonItem = new Item('dragon');
//   let penItem = new Item('pen');
//   let petsweepItem = new Item('pet-sweep');
//   let scissorsItem = new Item('scissors');
//   let sharkItem = new Item('shark');
//   let sweepItem = new Item('sweep', 'png');
//   let tauntaunItem = new Item('tauntaun');
//   let unicornItem = new Item('unicorn');
//   let watercanItem = new Item('water-can');
//   let wineglassItem = new Item('wine-glass');

// itemArray.push(bagItem, bananaItem, bathroomItem, bootsItem, breakfastItem, bubblegumItem, chairItem, cthulhuItem, dogduckItem, dragonItem, penItem, petsweepItem, scissorsItem, sharkItem, sweepItem, tauntaunItem, unicornItem, watercanItem, wineglassItem);
// console.log(itemArray);
// }

renderImg();

imgContainer.addEventListener('click', handleImgClick);
resultsButton.addEventListener('click', handleShowResults);
