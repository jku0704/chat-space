# README
**messegeテーブル**

|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

Association

 belongs_to :group
 belongs_to :user

**usersテーブル**

|Column|Type|Options|
|------|----|-------|
|name|string|null: false,add_index: true|
|email|string|null:false,unique: true|

Association
 
 has_many :groups_users
 has_many :groups,through: groups_users
 has_many :messeges

 **groupsテーブル**

|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false,unique:true|

Associatiuon

 has_many :groups_users
 has_many :users, through: groups_users
 has_many :messeges

**groups_usersテーブル**

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

Association

belongs_to :group
belongs_to :user