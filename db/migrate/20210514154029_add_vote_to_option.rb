class AddVoteToOption < ActiveRecord::Migration[6.1]
  def change
    add_column :options, :vote, :integer, default: 0
  end
end
