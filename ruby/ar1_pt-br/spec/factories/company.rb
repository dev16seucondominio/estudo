FactoryBot.define do
  factory :company do
    name { Faker::Name.first_name }
    balance_cents { Random.rand(1000..100000) }
    status { %w[Active Pending].sample }
  end
end
