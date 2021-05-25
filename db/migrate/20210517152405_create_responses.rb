class CreateResponses < ActiveRecord::Migration[6.1]
  def change
    create_table :responses do |t|
      t.integer "user_id", nul: false
      t.integer "poll_id", null:false
      t.integer "option_id", null: false
      t.index ["user_id"], name: "index_responses_on_user_id"
      t.index ["poll_id"], name: "index_responses_on_poll_id"
      t.index ["option_id"], name: "index_responses_on_option_id"
      t.timestamps
    end
  end
end
