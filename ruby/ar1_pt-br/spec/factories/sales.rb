FactoryBot.define do
  factory :sale do
    amount_cents { Random.rand(100..1000) }
    product_number { Random.rand(1..4) }
    product
    company
  end
end
