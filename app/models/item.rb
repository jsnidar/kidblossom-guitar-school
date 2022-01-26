class Item < ApplicationRecord
  enum type: [:course, :materials]

end
