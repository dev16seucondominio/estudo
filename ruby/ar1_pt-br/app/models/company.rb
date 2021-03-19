class Company < ApplicationRecord
  has_many :transfers

  has_many :products
  has_many :sales

  def update_status
    with_lock do
      self.status = 'active'
      save!
    end
  end
end
