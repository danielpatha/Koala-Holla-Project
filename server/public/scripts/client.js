console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: 'testName',
      age: 'testName',
      gender: 'testName',
      readyForTransfer: 'testName',
      notes: 'testName',
    };
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
  }); 

  //click listener & function to mark koala READY TO TRANSFER
  $('body').on('click', '.readyBtn', function(){
    console.log('in readyBtn click');
    // koalaID is the id of the koala which was clicked
    const koalaID = $(this).data('id');
    console.log('click to transfer id:', koalaID);

    $.ajax({
      method:'PUT',
      url:`/koalas/${koalaID}`
    })  
      //then insert the response as an argument to call getKoalas() and update DOM
      .then(function(res) {
        getKoalas();
      })
      .catch((err) => {
        console.log('PUT /koalas error', err)
      })


  })

}

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    url: '/koalas',
    method: 'GET'
  })
    .then((res) => {
      $('#viewKoalas').empty();
      for(const koala of res) {
        if(koala.ready) {
          $('#viewKoalas').append(`
            <tr>
              <td>${koala.name}</td>
              <td>${koala.age}</td>
              <td>${koala.gender}</td>
              <td>${koala.ready}</td>
              <td>${koala.notes}</td>
              <td><button class="removeBtn" data-id="${koala.id}">REMOVE</button></td>
            </tr>
          `);
        }
        else {
          $('#viewKoalas').append(`
          <tr>
            <td>${koala.name}</td>
            <td>${koala.age}</td>
            <td>${koala.gender}</td>
            <td>${koala.ready}</td>
            <td>${koala.notes}</td>
            <td><button class="removeBtn" data-id="${koala.id}">REMOVE</button></td>
            <td><button class="readyBtn" data-id="${koala.id}">READY FOR TRANSFER</button></td>
          </tr>
        `);
        }
      }
    })
    .catch((err) => {
      console.log('Something went wrong! in getKoalas() GET ajax call', err);
    })
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
 
}
