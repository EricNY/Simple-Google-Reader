class AddStuffToArticles < ActiveRecord::Migration
  def change
    add_column :articles, :summary, :text
    add_column :articles, :url, :string
    add_column :articles, :published_at, :datetime
    add_column :articles, :guid, :string
  end
end
