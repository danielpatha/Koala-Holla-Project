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
      name: $('#nameIn').val(),
      age:$('#ageIn').val(),
      gender:$('#genderIn').val(),
      ready:$('#readyForTransferIn').val(),
      notes:$('#notesIn').val(),
    };
    
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
  }); 


   //Event handler and Anonymous Function for Remove Button
   $('body').on('click','.removeBtn', function(){
    console.log('in removeBtn on click');
    const koalaId = $(this).data('id');//Grabbing data from .removeBtn
    console.log('click to delete', koalaId);
    swal.fire({
      icon: 'warning',
      title: 'Remove Koala Confirmation',
      text: 'Are you sure you want to remove?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      reverseButtons: true,
      focusDeny: true
    })  // swal returns an object 'value' with these properties:
    /* 
    const value = {
      isConfirmed: BOOLEAN;
      isDenied: BOOLEAN;
      isDismissed: BOOLEAN;
      value: BOOLEAN;
    } 
    */
      .then(value => { 
        console.log(value); // debug code for looking at swal 'promise' return value
        if(value.isConfirmed) {
          $.ajax({
            type:"DELETE",
            url: `/koalas/${koalaId}`,// append koalaID to the URL
          })
          .then(function(response){
            getKoalas(); // Call the function getKoalas()
          })
          .catch(function(error){
            console.log('err on delete', error)
          }) 
          swal.fire('Removal Success', 'Koala has been removed', 'success');
        }
        else {
          swal.fire('Removal Stopped', 'No koala has been removed', 'error');
        }
      })
  }); //End of Event Handler and Anonymous Function for Remove Button

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
              <td>Ready</td>
              <td><button class="readyBtn" data-id="${koala.id}">CHANGE TO <b>"NOT READY"</b></button></td>
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
            <td>Not Ready</td>
            <td><button class="readyBtn" data-id="${koala.id}">CHANGE TO <b>"READY"</b></button></td>
            <td>${koala.notes}</td>
            <td><button class="removeBtn" data-id="${koala.id}">REMOVE</button></td>
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
      $.ajax({
      method: 'POST',
      url: '/koalas',
      data: newKoala
    })
    .then((response) =>{
     console.log(response)
     getKoalas();
    })
    .catch((err) =>{
      console.log('error in POST ',err)
    })
}

function removeKoala(oldKoala){
  console.log(' in removeKoala', oldKoala );
//ajax call to server to get koalas


}//end removeKoala