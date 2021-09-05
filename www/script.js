// JavaScript DocumentdisplayNotes();

document.addEventListener("DOMContentLoaded", displayNotes);

var addBtn = document.getElementById('addBtn');


//function changeFontColour() {
//  document.getElementById()
//}
// below event listener will add user input into the local storage
addBtn.addEventListener('click', function() {
  let addNote = document.getElementById('addNote');
  let notesString = addNote.value;
  let username = JSON.parse(localStorage.getItem('username'));
  let subject = document.getElementById('subject').value;
	console.log(notesString + " " + username + " " + subject);
		if(notesString == "" || subject == ""){
			console.log("cant display notes");
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

// JSON.parse(localStorage.getItem('username'))
// funtion to display data stored in the local storage
function displayNotes() {
  let notesObj = [];
  let html = '';
  $.ajax({
    type: 'GET',
    url: 'getnotes.php',
    dataType: 'JSON',
    success: function(data) {
      console.log('success', data);
      for (var i = 0; i < data.length; i++) {
        console.log(data[i].note);
        html += `
				<div class="card mx-4 my-2 bg-dark text-white thatsMyNote" style="width: 18rem;">
				<a class="btn btn-outline-light" href="#note${i}" role="button" aria-expanded="false" aria-controls="collapseExample">
					${data[i].subject}
				  </a>
					
					<div class="card-body">
						<p class="card-text">${data[i].note}</p>
						<button id="${i}" onclick=deleteNote(this.id) class="btn btn-danger">Delete</button>
					</div>
					
				</div>
			`;
        console.log(data[i].note);
      }

      let noteEle = document.getElementById('notes');


      noteEle.innerHTML = html;

    }

  });
	
}




//function to delete a note
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
	  }
	}

  });
	

}


let search = document.getElementById('search');
search.addEventListener('input', function(e) {

  let inputText = search.value;

  //below statement will be executed when the search bar is emptied using backspace
  if (inputText == '') {
    document.getElementById('noMatches').innerHTML = '';
  }

  var countNone = 0;

  let cards = document.getElementsByClassName('thatsMyNote');


  Array.from(cards).forEach(function(ele) {
    let cardText = ele.getElementsByTagName('p')[0].innerText;
    if (cardText.includes(inputText)) {
      ele.style.display = 'block';
    } else {
      ele.style.display = 'none';

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