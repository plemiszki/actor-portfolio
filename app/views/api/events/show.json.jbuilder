json.entity do
  json.id @event.id
  json.title @event.title
  json.text @event.text
  json.time @event.time.strftime("%-m/%-d/%y %-l:%M %P")
end
