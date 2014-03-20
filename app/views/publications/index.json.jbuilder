json.array!(@publications) do |publication|
  json.extract! publication, :id, :name, :feed_url
  json.url publication_url(publication, format: :json)
end
