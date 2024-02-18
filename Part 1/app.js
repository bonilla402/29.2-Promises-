let myNumber = 13
let baseURL = "http://numbersapi.com";
const body = document.body;

function createParagraph(text) {
  // Create a new <p> element
  var paragraph = document.createElement('p');
  // Set the text content of the <p> element to the provided text
  paragraph.textContent = text;
  // Append the <p> element to the body
  body.appendChild(paragraph);
}

//1
axios
  .get(`${baseURL}/${myNumber}?json`)
  .then(response => {
    console.log(`${response.data.text}`);
  })
  .catch(err => {
    console.log(`Oops, there was a problem :( ${err}`);
  });


  //2
  axios
  .get(`${baseURL}/13,5,0?json`)
  .then(response => {
    let facts = response.data

    createParagraph("PART 2");
    
    // Iterate over the keys of the responseData object
    Object.keys(facts).forEach(function(key) {
      var value = facts[key];
      createParagraph(value);
    });
    createParagraph("END OF PART 2");
  })
  .catch(err => {
    console.log(`Oops, there was a problem :( ${err}`);
  });



  //3
  let fourFactPromises = [];


  for (let i = 1; i < 5; i++) {
    fourFactPromises.push(
      axios.get(`${baseURL}/${myNumber}?json`)
    );
  }

  Promise.all(fourFactPromises)
    .then(factsArr => (
      factsArr.forEach(p => createParagraph(p.data.text))
    ))
    .catch(err => console.log(err));
