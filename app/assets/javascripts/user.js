$(function(){
    function addUser(user) {
        let html = `
        <div class="chat-group-user clearfix">
            <p class="chat-group-user__name">${user.name}</p>
            <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
        </div>
        `;
        $("#user-search-result").append(html);
    }

  function addNoUser() {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>
    `;
    $("#user-search-result").append(html);
  }


  function addDeleteUser(name, id) {
    let html = `
    <div class="chat-group-user clearfix" id="${id}">
      <input name='group[user_ids][]' type='hidden' value=${id}>
      <div class="chat-group-user clearfix">${name}
        <div class="chat-group-user__remove chat-group-user__btn chat-group-user__btn--remove" data-user-id=${id} data-user-name=${name}>削除</div>
      </div>
    </div>
    `;
    $("#chat-group-users").append(html);
  }


  // function addMember(id, name) {
  //   let html = `<div class="chat-group-user clearfix js-chat-member" id="chat-group-user-8">
  //   <input value="${id}" name="group[user_ids][]" type="hidden" id="${id}">
  //   <p class="ChatMember__name">${name}</p>
  //   <div clasxs="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</div>
  //   </div>`;

  //   $(`#chat-group-users`).append(html)
  // }
    
    var search_list = $("#user-search-result");
    var member_list = $("#member-append");

   

    function appendErrMsgToHTML(msg){
        var html = `
            <div class="chat-group-user clearfix">
            <p class="chat-group-user__name">${msg}</p>
        </div>
       `;
        search_list.append(html);
    }
    $('#user-search-field').on('keyup', function(){
    var input = $("#user-search-field").val();


    $.ajax({
        type: 'GET',                // HTTPメソッドはGETで
        url:  '/users',             // /usersのURLに (これによりusersコントローラのindexアクションが起動)
        data: { keyword: input},    // keyword: inputを送信する
        dataType: 'json'            // サーバから値を返す際はjsonである
    })

    .done(function(users){             // usersにjson形式のuser変数が代入される。複数形なので配列型で入ってくる
    
        

        if(input.length == 0) { 
            $('#user-search-result').empty();
            return;
        }

        if(users.length != 0){
        
            $('#user-search-result').empty();

            users.forEach(function(user){ // users情報をひとつずつとりだしてuserに代入
                addUser(user)
            });
        }else
        {
            $('#user-search-result').empty(); // ユーザーが見つからなければ「見つからない」を返す。
            appendErrMsgToHTML("一致するユーザーが見つかりません");
            addNoUser()
        }
    })

    .fail(function() {
        alert('ユーザー検索に失敗しました');
    });
  });
 $('#user-search-result').on('click', ".user-search-add", function(){

    
  
  });

$(document).on("click", ".chat-group-user__btn--add", function() {
    
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
    
    $(this)
      .parent()
      .remove();

    addDeleteUser(userName, userId);
    addMember(userName, userId,);
});
  $(document).on("click", ".chat-group-user__btn--remove", function() {
    $(this)
      .parent()
      .remove();
      
  });
})
