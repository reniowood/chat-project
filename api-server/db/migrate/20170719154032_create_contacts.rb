class CreateContacts < ActiveRecord::Migration[5.1]
  def change
    create_table :contacts do |t|
      t.belongs_to :owner, class_name: 'User', index: true
      t.belongs_to :user
      t.timestamps
    end
  end
end
