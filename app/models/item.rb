class Item < ApplicationRecord
  enum item_type: [:course, :materials]

end
