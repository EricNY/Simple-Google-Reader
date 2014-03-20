class AddFeedUrlToPublications < ActiveRecord::Migration
  def change
    add_column :publications, :feed_url, :string
  end
end
