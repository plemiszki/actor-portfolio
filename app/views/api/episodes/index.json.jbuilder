json.entities @episodes do |episode|
  json.id episode.id
  json.number episode.number
  json.title episode.title
  json.guest episode.guest
end
