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

   //Event handler and Anonymous Function for Remove Button
   $('body').on('click','.removeBtn', function(){
    console.log('in removeBtn on click');
     const koalaId = $(this).data('id');//Grabbing data from .removeBtn
     console.log('click to delete', koalaId);
  
     $.ajax({
      type:"DELETE",
      url: `/koalas/${koalaId}`,// append koalaID to the URL
  
    }).then(function(response){
      getKoalas();// Call the function getKoalas()
    }).catch(function(error){
    console.log('err on delete', error)
    })
    });//End of Event Handler and Anonymous Function for Remove Button
      
}

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
 
}

function removeKoala(oldKoala){
  console.log(' in removeKoala', oldKoala );
//ajax call to server to get koalas


}//end removeKoala