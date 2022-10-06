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
    })
    .catch((err) => {
      console.log('Something went wrong! in getKoalas() GET ajax call', err);
    })
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
 
}
