json.entities @news_items do |news_item|
  json.id news_item.id
  json.header news_item.header
  json.text news_item.text
  json.date news_item.date.strftime("%-m/%-d/%y")
  json.dateUnix news_item.date.to_time.to_i
end
