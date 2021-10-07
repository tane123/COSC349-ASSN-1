document.addEventListener("DOMContentLoaded", ()=>{
	displayNotes();
});
document.getElementById('input-font').onloadstart = changeFont;


var addBtn = document.getElementById('addBtn');
var logoutBtn = document.getElementById('logoutBtn');

// changees all of notes fonts.
function changeFont(){
	var inputFONT = document.getElementById('input-font');
	let fontType = $('#input-font').find(':selected').val();
	inputFONT.style.fontFamily = fontType;
	let cards = document.getElementsByName('cardText');
	for (var i = 0; i < cards.length; ++i) {
		cards[i].style.fontFamily = fontType;
	}
}


// changes the font colour of all of the notes.
function changeFontColour(){
	var inputColour = document.getElementById('colourInput').value;
	let cards = document.getElementsByName('cardText');
	for (var i = 0; i < cards.length; ++i) {
		cards[i].style.color = inputColour;
}
}

// waits for logout button to be pressed and logs outs
logoutBtn.addEventListener('click', function(){
	alert("Logging out!");
	$.ajax({
    url: "logout.php",
    method: "POST",
	success: function(data) {
			window.location.href = "index.html";
		localStorage.setItem('username', JSON.stringify(""));
		
	}

  });
});

/**
This function waits for the add button to be pressed.
Once it is pressed it transfer all relevant informatin to 
addNotes php by using an ajax call.
*/
addBtn.addEventListener('click', function() {
  let addNote = document.getElementById('addNote');
  let notesString = addNote.value;
  let username = JSON.parse(localStorage.getItem('username'));
  let subject = document.getElementById('subject').value;
		if(notesString == "" || subject == ""){
			console.log("cant display notes");
			document.getElementById('inputErrorAlert').style.display = 'block';
			return;
		   }
  $.ajax({
    url: "addNotes.php",
    method: "POST",
    data: {
      note: notesString,
      username: username,
      subject: subject,
    },
    success: function(data) {
			displayNotes();
		
	}

  });

});


/**
This function displays all note currently in the database. 
It uses an ajax call to add notes which will append all notes onto the page.
*/
function displayNotes() {
	let fontType = $('#input-font').find(':selected').val();
	var inputColour = document.getElementById('colourInput').value;
  let notesObj = [];
  let html = '';
	let userEqual = false;
	let localUsername = JSON.parse(localStorage.getItem('username'));
  $.ajax({
    type: 'GET',
    url: 'getnotes.php',
    dataType: 'JSON',
    success: function(data) {
      for (var i = 0; i < data.length; i++) {
        html += `
			<div class="Text" id="collapse${data[i].id}Parent" name="collapseParent">
			  <div class="card mx-4 my-2 bg-dark text-white thatsMyNote" style="width: 18rem;" style="overflow: hidden;">
				<button class="btn btn-primary" type="button"  data-toggle="collapse" data-target="#collapse${data[i].id}" aria-expanded="false" aria-controls="collapse${data[i].id}">
				<p style="text-align: left; padding: 0; margin: 0;">Subject: ${data[i].subject}</p>
				<p style="float: left; padding: 0; margin: 0;">Author: ${data[i].username}
				<p style="float: right; padding: 0; margin: 0;">${data[i].date}</p>
				</p>
				</button>
				<div class="collapse" id="collapse${data[i].id}" >
				  <div class="card-body" data-parent="collapse${data[i].id}Parent" ">
					<p class="card-text" name="cardText" style="font-family: ${fontType}; color: ${inputColour}">${data[i].note}</p>
					
			`;
		  if(localUsername == data[i].username){
			 html += `<button id="${data[i].id}" onclick=deleteNote(this.id) class="btn btn-danger" >Delete</button>
				  </div>
				</div>
			  </div>
			</div>
		`;
		 }else{
			 html += `
				  </div>
				</div>
			  </div>
			</div>
		`;
		 }
    }
		let noteEle = document.getElementById('notes');
      noteEle.innerHTML = html;

		return;
      }

  });
	
}




/**
This function delets a note by using an ajax call to the delete notes php
*/
function deleteNote(id) {
	$.ajax({
    url: "deleteNotes.php",
    method: "POST",
    data: {
      id: id
    },
    success: function(data) {
      if(data == 1){
		 displayNotes();
	  }else{
		console.log("cannot display notes");
	}
	}

  });

}

/**
This function displays notes based off their input text 
it works by finding all elements that match the input text 
and sets their displays to block. Otherwise they get hidden.
*/
let search = document.getElementById('search');
search.addEventListener('input', function(e) {

  let inputText = search.value;
  //below statement will be executed when the search bar is emptied using backspace
  if (inputText == '') {
    document.getElementById('noMatches').innerHTML = '';
  }

  var countNone = 0;

  let cards = document.getElementsByName('cardText');


  Array.from(cards).forEach(function(ele) {
    let cardText = ele.innerText;
	let parentEle = ele.parentElement.parentElement.parentElement.parentElement;
	  
    if (cardText.includes(inputText)) {
      parentEle.style.display = 'block';
    } else {
      parentEle.style.display = 'none';

      countNone++;

      if (countNone === cards.length) {
        document.getElementById('noMatches').innerHTML = '<h3 style="text-align: center; color: grey;">No matches found</h3>';
      } else {
        document.getElementById('noMatches').innerHTML = '';
      }
    }
  });

  //Below code will be executed when the input text matches all the elements.
  if (countNone === 0) {
    document.getElementById('noMatches').innerHTML = '';
  }

});
