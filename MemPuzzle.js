var table; 
var rows; 
var columns;
var arrayForBoard;
var wins = 0;
var progress = 0;
var x;

var mems = [
	"Through the eyes of the Patient you see a young child, a girl, swinging on a playset.\nThe Patient pushes her higher and she laughs.",
	"There's a cold weight in your left hand. As the patient lifts the hand it's apparent that it is holding a pistol. Down the sights is a frightened man, hands in the air and a suitcase at his feet. The outstretched hand doesn't waver as the Patient demands the man's wallet.",
	"For medicine, the gun was to get her medicine...",
	"A name surfaces, Diana. You're not sure if it's the Patient's name or someone else's...",
	"Through a barred car window, you see street lights and dark buildings. You can feel something tight around your wrists, they're stuck behind your back. There's a smell of iron and sulphur in the air.",
	"You see hands clutching a handgun, aiming at a man in glasses. The man jerks his hand under his denim jacket and a loud crack and bright flash distorts the Patient. The man in glasses falls back, dark red blooming across his chest. ",
	"Running through moonlit streets, the Patient is breathing heavily. Pausing at an alleyway, the Patient shudders, tucks a gun into their waistband, and runs on.",
	"nAvery. The Patient feels ownership at the memory of this name.",
	"Looking in a bathroom mirror, the Patient sees short dark hair. It needs washing. The face itself isn't bad, the cut on your chin is almost healed, and the black eye is fading.",
	"The first sensation is a smell of antiseptic. The second is the lack of city noise. The Patient's eyes open to see a bright lamp above their head. Squinting and looking to the side reveals a woman in scrubs and a surgical mask. The woman notices the Patients conciousness and pushes a button on a nearby keyboard. 'You dont' want to be awake for this,' she mutters to herself as a dense hze pushes the Patient back to unconciousness.."
];

//array for 'found' state of each memory
var arrayOfFound = new Array();
for (var i = 0; i < mems.length; i++)
  {
    arrayOfFound[i] = false;
  }

function start()
{
  var button = document.getElementById("newGame");
  button.addEventListener( "click", startNewGame, false );
  table = document.getElementById("table");
  rows = 3;
  columns = rows;
  startNewGame();
}

function startNewGame()
{
  var arrayOfNumbers = new Array();
  var arrayHasNumberBeenUsed;
  var randomNumber = 0;
  var count = 0;


  // Create the proper board size.
  arrayForBoard = new Array(rows);
  for (var i = 0; i < rows; i++)
  {
    arrayForBoard[i] = new Array(columns);
  }
  // Set up a temporary array for
  // allocating unique numbers.
  arrayHasNumberBeenUsed = new Array( rows * columns );
  for (var i = 0; i < rows * columns; i++)
  {
    arrayHasNumberBeenUsed[i] = 0;
  }
 
  // Assign random numbers to the board.
  for (var i = 0; i < rows * columns; i++)
  {
    randomNumber = Math.floor(Math.random()*rows * columns);
    // If our random numer is unique, add it to the board.
    if (arrayHasNumberBeenUsed[randomNumber] == 0) 
    {
      arrayHasNumberBeenUsed[randomNumber] = 1;
      arrayOfNumbers.push(randomNumber);
    }
    else // Our number is not unique. Try again.
    {
      i--;
    }
  }
  
  // Assign numbers to the game board.
  count = 0;
  for (var i = 0; i < rows; i++)
  {
    for (var j = 0; j < columns; j++)
    {
      arrayForBoard[i][j] = arrayOfNumbers[count];
      
      count++;
    }
  }
  showTable();
}

function showTable()
{
  var outputString = "";
  for (var i = 0; i < rows; i++)
  {
    outputString += "<tr>";
    for (var j = 0; j < columns; j++)
    {
      if (arrayForBoard[i][j] == 0)
      {
	outputString += "<td class=\"blank\"> </td>";
      }
      else
      {
	outputString += "<td class=\"tile\" onclick=\"moveThisTile(" + i + ", " + j + ")\">" + arrayForBoard[i][j] + "</td>";
      }
    } // end for (var j = 0; j < columns; j++)
    outputString += "</tr>";
  } // end for (var i = 0; i < rows; i++)
  
  table.innerHTML = outputString;
}

function moveThisTile( tableRow, tableColumn)
{
  if (checkIfMoveable(tableRow, tableColumn, "up") ||
      checkIfMoveable(tableRow, tableColumn, "down") ||
      checkIfMoveable(tableRow, tableColumn, "left") ||
      checkIfMoveable(tableRow, tableColumn, "right") )
	  { 
    
	  }
  else
  {
    //alert("ERROR: Cannot move tile!\nTile must be next to a blank space.");
  }

  if (checkIfWinner())//if win, print memory and start new game
  {
    wins++;
	if(wins == 4){
		rows++;
		columns++;
	}
	
	x=Math.floor(Math.random()*mems.length);
	//display random memory
	document.getElementById("tempcmd").innerHTML = mems[x];
	
	//update progress bar
	if(arrayOfFound[x] != true){
		progress+=100/mems.length;
		arrayOfFound[x] = true;
		$( "#progress" ).progressbar( "option", "value", progress );
	}
	
	startNewGame();
  }
	
}

function checkIfMoveable(rowCoordinate, columnCoordinate, direction)
{
  // The following variables an if else statements
  // make the function work for all directions.
  rowOffset = 0;
  columnOffset = 0;
  if (direction == "up")
  {
    rowOffset = -1;
  }
  else if (direction == "down")
  {
    rowOffset = 1;
  }
  else if (direction == "left")
  {
    columnOffset = -1;
  }
  else if (direction == "right")
  {
    columnOffset = 1;
  }  
  
  // Check if the tile can be moved to the spot.
  // If it can, move it and return true.
  if (rowCoordinate + rowOffset >= 0 && columnCoordinate + columnOffset >= 0 &&
    rowCoordinate + rowOffset < rows && columnCoordinate + columnOffset < columns
  )
  {
    if ( arrayForBoard[rowCoordinate + rowOffset][columnCoordinate + columnOffset] == 0)
    {
      arrayForBoard[rowCoordinate + rowOffset][columnCoordinate + columnOffset] = arrayForBoard[rowCoordinate][columnCoordinate];
      arrayForBoard[rowCoordinate][columnCoordinate] = 0;
      showTable();
      return true;
    }
  }
  return false; 
}

function checkIfWinner()
{
  var count = 1;
  for (var i = 0; i < rows; i++)
  {
    for (var j = 0; j < columns; j++)
    {
      if (arrayForBoard[i][j] != count)
      {
	if ( !(count === rows * columns && arrayForBoard[i][j] === 0 ))
	{
	  return false;
	}
      }
      count++;
    }
  }
  
  return true;
}

//progress bar
 $( document ).ready(function() {
	$( function() {
		$( "#progress" ).progressbar({
		value: progress
		});
	} );
	$("#progress").css({ 'background': '#00cc88' });
 });




 // This event listener makes the function start() execute when the window opens. 
window.addEventListener( "load", start, false );