class AddColumnsToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :profile, :string, limit: 1000, after: :email
  end
end
