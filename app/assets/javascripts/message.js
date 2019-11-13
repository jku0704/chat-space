$(function(){
function buildMessage(message){
  console.log(message)
  // var message = message.jmessage ? `${ message.jmessage }` : "";
  var image = message.jimage ? `<img src= ${ message.jimage } class="lower-message__image">` : "";
  var html = `<div class="message">
                <div class="upper-message">
                  <div class="upper-message__name">
                  ${message.jusername}
                  </div>
                  <div class="upper-message__date">
                  ${message.jdate}
                  </div>
                  <div class="image">
                  ${image}
                  </div> 
                </div>
                <div class="lower-message">
                  ${message.jmessage}
                </div>
               
              </div>
              `

  return html;
  
}

  $('#new_message').on('submit', function(e){
     e.preventDefault()
    var message = new FormData(this)
    var url = $(this).attr('action')
      
    $.ajax({
      url: url,  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
      data: message,  
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(message){
      // console.log(message);
      var html = buildMessage(message);
      // console.log('good2');
      $('.chat-main__messages').append(html);
      $('form_message')[0].reset();
      $('.form__submit').prop('disabled', false);
      $('.chat-main__messages').animate({ scrollTop: $('.chat-main__messages')[0].scrollHeight});
    })
    .fail(function(message){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })

    
  });
  
});
