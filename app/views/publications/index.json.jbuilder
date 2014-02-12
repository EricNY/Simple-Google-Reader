json.array!(@publications) do |publication|
  json.extract! publication, :id, :name
  json.url publication_url(publication, format: :json)
end
