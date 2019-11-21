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
    <div class="ChatMember clearfix" id="${id}">
      <input name='group[user_ids][]' type='hidden' value=${id}>  //この記述によりuserがDBに保存される
      <p class="ChatMember__name">${name}</p>
        <div class="ChatMember__remove ChatMember__button" data-user-id=${id} data-user-name=${name}>削除</div>
    </div>`;
    $(".ChatMembers").append(html);
  }


  function addMember(id, name) {
    let html = `<div class="chat-group-user clearfix js-chat-member" id="chat-group-user-8">
    <input value="${id}" name="group[user_ids][]" type="hidden" id="${id}">
    <p class="ChatMember__name">${name}</p>
    <p class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">
    削除</p>
    </div>`;

    $(`#chat-group-users`).append(html)
  }
    
    var search_list = $("#user-search-result");
    var member_list = $("#member-append");

    // function addUser(user){
    //   var html = `
    //         <div class="chat-group-user clearfix">
    //         <p class="chat-group-user__name">${user.name}</p>
    //         <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
    //     </div>
    //   `;
    //     search_list.append(html);
    // }

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
    
        
        // if (input.length === 0) {         // フォームの文字列長さが0であれば、インクリメンタルサーチ結果を表示しないようにする
        //     $('#user-search-result').empty();
        
        // }

        // else if (input.length !== 0){     // 値が等しくないもしくは型が等しくなければtrueを返す。
        //     $('#user-search-result').empty();
        //     users.forEach(function(user){ // users情報をひとつずつとりだしてuserに代入
        //         appendUser(user)
        //     });
        // }

        // else {
        //     $('#user-search-result').empty(); // ユーザーが見つからなければ「見つからない」を返す。
        //     appendErrMsgToHTML("一致するユーザーが見つかりません");
        //     addNoUser()
        // }

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
//追加ボタンが押されたときに検索結果から削除（メンバー・追加）して、メンバーに追加する（メンバー・削除）。
// １イベントが発火（追加ボタンが押される）したときにデバッグ（コンソールログでハロー）
// ２イベントが発火したときにメンバー・追加を検索結果から削除する
// ３メンバーに追加する（削除ボタン右側にある状態）。
$(document).on("click", ".chat-group-user__btn--add", function() {
    
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
    
    $(this)
      .parent()
      .remove();
    addDeleteUser(userName, userId);
    addMember(userId, userName);
  });
  $(document).on("click", ".chat-group-user__btn--remove", function() {
    $(this)
      .parent()
      .remove();
      
  });
})
