json.jmessage @message.content
json.jdate @message.created_at.strftime("%Y/%m/%d %H:%M")
json.jusername @message.user.name
json.jimage @message.image.url
json.id @message.id
