class CreateArticles < ActiveRecord::Migration
  def change
    create_table :articles do |t|
      t.string :name
      t.integer :publication_id

      t.timestamps
    end
    add_index :articles, :publication_id
  end
end
