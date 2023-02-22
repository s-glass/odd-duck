'use strict';

let retrievedItems = localStorage.getItem('myItems');

let parsedItems = JSON.parse(retrievedItems);

let canvasElem = document.getElementById('my-chart');

function renderChart() {

  let itemNames = [];
  let itemVotes = [];
  let itemViews = [];

for (let i = 0; i < parsedItems.length; i++) {
  itemNames.push(parsedItems[i].name);
  itemVotes.push(parsedItems[i].votes);
  itemViews.push(parsedItems[i].views);
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
        beginAtZero: true
      }
    }
  }
};

  new Chart(canvasElem, chartObj); //eslint-disable-line
}

if(retreivedItems){
  renderChart();
}