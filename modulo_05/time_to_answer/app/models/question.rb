class Question < ApplicationRecord
  searchkick

  belongs_to :subject, counter_cache: true, inverse_of: :questions
  has_many :answers, dependent: :destroy
  accepts_nested_attributes_for :answers, reject_if: :all_blank, allow_destroy: true

  # Callback
  after_create :set_statistic

  # Scopes // usado para faazer pesquisas no banco de dados
  scope :_search_, ->(page, term){
    includes(:answers, :subject).where("lower(description) LIKE ?", "%#{term.downcase}%").page(page).per(5)
  }

  scope :last_questions, ->(page){
    includes(:answers, :subject).order('created_at desc').page(page).per(5)
  }

  scope :_search_subject_, ->(page, subject_id) {
    includes(:answers, :subject).where(subject_id: subject_id).page(page).per(5)
  }

  def set_statistic
    AdminStatistic.set_event(AdminStatistic::EVENTS[:total_questions])
  end
end
