class AddPublicationToAtricles < ActiveRecord::Migration
  def change
    add_column :articles, :publication, :string
  end
end
