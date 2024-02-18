let baseURL = "https://deckofcardsapi.com/api/deck";

//PART 1
axios
  .get(`${baseURL}/new/shuffle/?deck_count=1`)
  .then(response => {
    console.log(`PART 1`);
    return response.data.deck_id;
  })
  .then(deckId => {
    return axios.get(`${baseURL}/${deckId}/draw/?count=1`)
  })
  .then(response => {
    return new Promise(function(resolve, reject) {
      console.log(`${response.data.cards[0].value.toLowerCase()} of ${response.data.cards[0].suit.toLowerCase()}`)
      resolve(); 
    });
  })
  
  //PART 2
  .then(() => {
    console.log(`PART 2`);
    return axios.get(`${baseURL}/new/shuffle/?deck_count=1`)
  })
  .then((deck) => {
    let deckId = deck.data.deck_id;

    let promises = [];    
    promises.push(axios.get(`${baseURL}/${deckId}/draw/?count=1`));
    promises.push(axios.get(`${baseURL}/${deckId}/draw/?count=1`));

    return Promise.all(promises)
  })
  .then(cardsArr => {
    return new Promise(function(resolve, reject) {
      cardsArr.forEach(card => console.log(`${card.data.cards[0].value.toLowerCase()} of ${card.data.cards[0].suit.toLowerCase()}`) )
      resolve(); 
    });
  })

  //PART 3
  .then(() => {
    console.log(`PART 3`);

    axios
      .get(`${baseURL}/new/shuffle/?deck_count=1`)
      .then(response => {    
        deckId = response.data.deck_id;
        document.getElementById('drawCardBtn').style.display = 'block';
      })  

  })
  .catch(err => {
    console.log(`Oops, there was a problem :( ${err}`);
  });




let deckId = null;
let drawnCards = []; // Array to store drawn cards

// Function to draw a new card
function drawNewCard() {
  axios
    .get(`${baseURL}/${deckId}/draw/?count=1`)    
    .then(response => {
      const card = response.data.cards[0];
      const cardInfo = `${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`;
      const cardImage = card.image;

      document.getElementById('remainingCardsCounter').textContent = response.data.remaining;
      
      // Push the drawn card to the array
      drawnCards.push({ info: cardInfo, image: cardImage });

      // Update card display
      updateCardDisplay();

    })
    .catch(err => {
      console.log(`Oops, there was a problem drawing a new card :( ${err}`);
    });
}

// Function to update the card display
function updateCardDisplay() {
  const cardDisplayElement = document.getElementById('cardDisplay');
  
  // Clear previous content
  cardDisplayElement.innerHTML = '';

  // Calculate the number of rows needed
  const numRows = Math.ceil(drawnCards.length / 4);

  // Loop through each row
  for (let row = 0; row < numRows; row++) {
    // Create a row element
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');

    // Loop through each column (up to 4 columns per row)
    for (let col = 0; col < 4; col++) {
      // Calculate the index of the card in the drawnCards array
      const index = row * 4 + col;

      // Check if the card exists at this index
      if (index < drawnCards.length) {
        const card = drawnCards[index];

        // Create card container
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('col-sm-3');

        // Create card info element
        const cardInfoElement = document.createElement('div');
        cardInfoElement.innerText = card.info;

        // Append card info element to card container
        cardContainer.appendChild(cardInfoElement);

        // If card image is available, create image element and append it
        if (card.image) {
          const imgElement = document.createElement('img');
          imgElement.src = card.image;
          imgElement.alt = card.info;
          cardContainer.appendChild(imgElement);
        }

        // Append card container to row element
        rowElement.appendChild(cardContainer);
      }
    }

    // Append row element to card display
    cardDisplayElement.appendChild(rowElement);
  }
}

// Add event listener to the button
document.getElementById('drawCardBtn').addEventListener('click', drawNewCard);