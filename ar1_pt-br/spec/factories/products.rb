FactoryBot.define do
  factory :product do
    name { Faker::Name.first_name }
    price_cents { Random.rand(100.1000) }
    company
    category
    brand
  end
end
