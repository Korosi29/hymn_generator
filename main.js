
//array to contain all sundays of the yr

const sundaysOfTheYr = [];

const currentDate = new Date();

//create dynamic year so that I don't worry about it year when it's new year
createDynamicYear();

function createDynamicYear(){
  const yrContainer = document.getElementById("year-container");
  const currentYr = document.createElement("div");
  currentYr.setAttribute("class", "year-con");
  // Display current date on header
 currentYr.textContent = currentDate.getFullYear();
 yrContainer.appendChild(currentYr);
 //pass current year as an argument to my another the function that will get me all the Sundays of the year
 getAllSundaysOfTheYr(currentDate.getFullYear());
 
}

function getAllSundaysOfTheYr(year){

  // might be one hour late due to utc conversion 
  
  const hour = 23;
  const minutes = 59;
  for(let month = 0; month < 12; month++){
    for(let date = 1; date <= 31; date++){
      //literate on months and date to fetch all Sundays
      const dateToIterate = new Date(year, month, date, hour,minutes);
      if(dateToIterate.getMonth() !== month)break;//break if we exceed months days
      // if it's a Sunday add to array
      if(dateToIterate.getDay() === 0){
      // push all ⬆️to the first array above
        sundaysOfTheYr.push(dateToIterate);
      }
    }
  }
  //call this function to get the coming Sunday
  getComingSunday();  
}


function getComingSunday(){
  
  for(let i = 0; i < sundaysOfTheYr.length; i++){
  // check approaching Sunday
    if(sundaysOfTheYr[i] >= currentDate){
     //display date on date heading
     document.getElementById("date-heading").textContent = sundaysOfTheYr[i].toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
      break;
    }
  }
}

function getHymnHeadings(){
  // display title and no. of hymn on headings
  //get coming Sunday
    for(let i = 0; i < sundaysOfTheYr.length; i++){
    if(sundaysOfTheYr[i] >= currentDate){
     // update hymn no. heading 
     document.getElementById("hymn-no").textContent += hymnsData[i][0];
      //update hymn title heading
       document.getElementById("hymn-title").textContent += hymnsData[i][1]; 
      break;
      }
  } 
}

getHymnHeadings();


function getHymnContent(){
  let hymnContentContainer = document.getElementById("hymn-content");
  //get coming Sunday
  for(let i = 0; i < sundaysOfTheYr.length; i++){
    if(sundaysOfTheYr[i] >= currentDate){
    /*get only from the third index because it's the first verse 0 abd 1 are no. and title*/
    for(let j = 2; j < hymnsData[i].length; j++){
      //chorusOrVerse assign chorus or verse word respectively 
      let chorusOrVerse;
      //checks if there is a chorus or not so to not display the index
      if(hymnsData[i][j]){
      //create a div for every chorus or verse
        const hymnVerseDivCon = document.createElement("div");
        // checks if there is a chorus 
        if(j === 3){
          chorusOrVerse = "Chorus";
        }else{
          chorusOrVerse = "Verse";
        }
        //add verse or chorus to the created div
        hymnVerseDivCon.innerHTML = `<span>${chorusOrVerse}</span> <br/> <br/> ${hymnsData[i][j]}`;
       //update on dom
       hymnContentContainer.appendChild(hymnVerseDivCon); 
      } 
    }
    //if Sunday next Sunday is found break
      break;
      }
  } 
}

getHymnContent();

function copyToClipboard(){
  let hymnContent = document.getElementById("hymn-body");
 //copy hymn body text content to the clipboard 
 navigator.clipboard.writeText(hymnContent.textContent);
 document.getElementById("copy-btn").textContent = "Copied";
 setTimeout(() => {
  document.getElementById("copy-btn").textContent = "Copy";
 }, 3000);
}

function switchTheme(){
  if(document.documentElement.getAttribute("data-theme") === "dark"){
    document.documentElement.setAttribute("data-theme" ,"light");
  }else{
    document.documentElement.setAttribute("data-theme","dark");
  }
}


