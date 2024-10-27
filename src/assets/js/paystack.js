var paymentForm = document.getElementById('paymentForm');
console.log(paymentForm);
paymentForm.addEventListener('submit', payWithPaystack, false);
function payWithPaystack() {
//     console.log(PaystackPop);
//   var handler = PaystackPop.setup({
//     key: 'pk_live_12444fc74132afa7ad35a8c6017beedc58853307', // Replace with your public key
//     email: 'naeemakram213@gmail.com', //document.getElementById('naeemakram213@gmail.com').value,
//     amount: '10', //document.getElementById('10').value * 100, // the amount value is multiplied by 100 to convert to the lowest currency unit
//     currency: 'US', // Use GHS for Ghana Cedis or USD for US Dollars
//     ref: 'sdjhsd74#2fkdj', // Replace with a reference you generated
//     callback: function(response) {
//       //this happens after the payment is completed successfully
//       var reference = response.reference;
//       alert('Payment complete! Reference: ' + reference);
//       // Make an AJAX call to your server with the reference to verify the transaction
//     },
//     onClose: function() {
//       alert('Transaction was not completed, window closed.');
//     },
//   });
//   handler.openIframe();
e.preventDefault();

let handler = PaystackPop.setup({
  key: 'pk_live_12444fc74132afa7ad35a8c6017beedc58853307', // Replace with your public key
  email: 'naeemakram213@gmail.com',
  amount: '10',
  ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
  // label: "Optional string that replaces customer email"
  onClose: function(){
    alert('Window closed.');
  },
  callback: function(response){
    let message = 'Payment complete! Reference: ' + response.reference;
    alert(message);
  }
});

handler.openIframe();
}
