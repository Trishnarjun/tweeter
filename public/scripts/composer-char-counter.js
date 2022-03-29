

$(document).ready(function() {
  let counter = 0;
  let remainingChar;
  let $inputField = "#tweet-text"
  $($inputField).on('input', function(e) {
    counter = $(this).val().length;
    remainingChar = (140 - counter)
    let $output = $(this).parent().find(".counter")
    $output.text(remainingChar);
    if (remainingChar < 0) {
      $output.css("color","red")
    } else {
      $output.css("color", "")
    }
  })
});

