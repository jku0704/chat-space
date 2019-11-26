$(function(){
  function buildMessage(message){
    
    var image = message.jimage ? `<img src= ${ message.jimage } class="lower-message__image">` : "";
    var html = `<div class="message" data-message-id = ${message.id}>
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
  //非同期通信の記述
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
      var html = buildMessage(message);
      $('.chat-main__messages').append(html);
      $('.new_message')[0].reset();
      $('.form__submit').prop('disabled', false);
      $('.chat-main__messages').animate({ scrollTop: $('.chat-main__messages')[0].scrollHeight});
    })
    .fail(function(message){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
  });
  

  //ここから自動更新の記述！！
  var reloadMessages = function () {
    
    if (window.location.href.match(/\/groups\/\d+\/messages/)){//今いるページのリンクが/groups/グループID/messagesのパスとマッチすれば以下を実行。
      var last_message_id = $('.message:last').data("message-id"); //dataメソッドで.messageにある:last最後のカスタムデータ属性を取得しlast_message_idに代入。
      
      
      // var group_id = $(".group").data("group-id");
      $.ajax({ //ajax通信で以下のことを行う
        url: "api/messages", //サーバを指定。今回はapi/message_controllerに処理を飛ばす
        type: 'get', //メソッドを指定
        dataType: 'json', //データはjson形式
        data: {last_id: last_message_id} //飛ばすデータは先ほど取得したlast_message_id。またparamsとして渡すためlast_idとする。
       

      })
      .done(function (messages) { //通信成功したら、controllerから受け取ったデータ（messages)を引数にとって以下のことを行う
        var insertHTML = '';//追加するHTMLの入れ物を作る
        messages.forEach(function (message) {//配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
          insertHTML += buildMessage(message); //メッセージが入ったHTMLを取得
      
          $('.chat-main__messages').append(insertHTML);//メッセージを追加
        
        })
         $('.chat-main__messages').animate({scrollTop: $('.chat-main__messages')[0].scrollHeight}, 'fast');//最新のメッセージが一番下に表示されようにスクロールする。
      })
      .fail(function () {
        
        alert('自動更新に失敗しました');//ダメだったらアラートを出す
      });
    }
  };
   setInterval(reloadMessages, 50000);//50000ミリ秒ごとにreloadMessagesという関数を実行し自動更新を行う。
});  
