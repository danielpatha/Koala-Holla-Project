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
  $('.body').on('click', '.readyBtn', function(){
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


  })

}

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
 
}
