class Request < ApplicationRecord
  validates :content, uniqueness: true
end
