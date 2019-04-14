json.episode do
  json.id @episode.id
  json.title @episode.title
  json.number @episode.number
  json.url @episode.url
  json.synopsis @episode.synopsis
  json.guest @episode.guest
end
