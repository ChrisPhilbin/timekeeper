class AddIsCheckedOutColumnToTasks < ActiveRecord::Migration[6.0]
  def change
    add_column :tasks, :is_checked_out, :boolean, default: false
  end
end
