json.events @events do |event|
  json.id event.id
  json.date event.date.strftime("%-m/%-d/%y")
  json.endDate event.end_date.strftime("%-m/%-d/%y")
  json.title event.title
  json.text event.text
end
