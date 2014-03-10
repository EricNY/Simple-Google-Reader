class Article < ActiveRecord::Base
  belongs_to :publication
  belongs_to :user
# add: validates presence of publication_id
    def self.update_from_feed(feed_url, publication_id, user, publication_name)
    feed = Feedzirra::Feed.fetch_and_parse(feed_url)
    feed.entries.each do |entry|
      unless exists? :guid => entry.id
        create!(
          :name             => entry.title,
          :summary          => entry.summary,
          :url              => feed_url,
          :published_at     => entry.published,
          :guid             => entry.id,
          :publication_id   => publication_id,
          :user_id          => user.id,
          :publication_name => publication_name
        )
      end
    end
  end

end
