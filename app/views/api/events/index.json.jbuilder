json.entities @events do |event|
  json.id event.id
  json.time event.time.strftime("%-m/%-d/%y - %-l:%M %P")
  json.timeUnix event.time.to_i
  json.title event.title
  json.text event.text
end
