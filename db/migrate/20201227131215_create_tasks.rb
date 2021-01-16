class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.string :name
      t.text :description
      t.datetime :check_out
      t.datetime :check_in
      t.integer :total_time
      t.references :project, null: false, foreign_key: true
      t.boolean :finished

      t.timestamps
    end
  end
end
