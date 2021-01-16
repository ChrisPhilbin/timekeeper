class Project < ApplicationRecord
  belongs_to :user
  has_many   :tasks, dependent: :destroy

  default_scope { order(created_at: :desc)}

  validates_presence_of :name, :description

end
