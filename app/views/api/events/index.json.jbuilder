json.events @events do |event|
  json.id event.id
  json.time event.time.strftime("%-m/%-d/%y %-l:%M %P")
  json.timeParsed event.time.strftime("%-m/%-d/%y - %-l:%M %P")
  json.title event.title
  json.text event.text
end
