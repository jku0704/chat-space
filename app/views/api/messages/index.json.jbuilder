json.array! @messages do |message|
  json.jmessage message.content
  json.jimage message.image.url
  json.jdate message.created_at.strftime("%Y年%m月%d日 %H時%M分")
  json.jusername message.user.name
  json.id message.id
  
end