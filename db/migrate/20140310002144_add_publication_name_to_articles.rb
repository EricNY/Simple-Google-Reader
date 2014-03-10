class AddPublicationNameToArticles < ActiveRecord::Migration
  def change
    add_column :articles, :publication_name, :string
  end
end
