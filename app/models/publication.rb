class Publication < ActiveRecord::Base
  has_many :articles
end
