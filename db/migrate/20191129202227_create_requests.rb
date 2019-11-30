class CreateRequests < ActiveRecord::Migration[5.2]
  def change
    create_table :requests do |t|
      t.string :user_first_name
      t.string :user_last_name
      t.string :email

      t.timestamps
    end
  end
end
