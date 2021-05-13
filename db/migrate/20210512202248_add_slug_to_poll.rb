class AddSlugToPoll < ActiveRecord::Migration[6.1]
  def change
    add_column :polls, :slug, :string, null: false
    add_index :polls, :slug, unique: true
  end
end


class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :password
      t.string :confirmpassword

      t.timestamps
    end
  end
end
