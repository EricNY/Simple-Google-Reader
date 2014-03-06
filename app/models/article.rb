class Article < ActiveRecord::Base
  belongs_to :publication
  belongs_to :user
# add: validates presence of publication_id
    def self.update_from_feed(feed_url, publication_id)
    feed = Feedzirra::Feed.fetch_and_parse(feed_url)
    feed.entries.each do |entry|
      unless exists? :guid => entry.id
        create!(
          :name           => entry.title,
          :summary        => entry.summary,
          :url            => feed_url,
          :published_at   => entry.published,
          :guid           => entry.id,
          :publication_id => publication_id
        )
      end
    end
  end

end
