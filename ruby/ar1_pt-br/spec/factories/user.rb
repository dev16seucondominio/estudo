FactoryBot.define do
  factory :user do
    name { Faker::Name.first_name }
    email { Faker::Internet.email }
    gender { %w[Female Male].sample }
    age { Random.rand(10..30) }
    balance_cents { Random.rand(1000..100000) }
  end
end
