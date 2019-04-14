json.newsItem do
  json.id @news_item.id
  json.date @news_item.date.strftime("%-m/%-d/%y")
  json.header @news_item.header
  json.text @news_item.text
end
