json.array!(@articles) do |article|
  json.extract! article, :id, :name, :publication_id, :publication, :publication_name ,:url, :summary
  json.url article_url(article, format: :json)

end
