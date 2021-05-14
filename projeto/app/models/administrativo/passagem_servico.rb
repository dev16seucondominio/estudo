class Administrativo::PassagemServico < ApplicationRecord
  attr_accessor :validar_user_opts

  # Associations

  has_one :user_entrou, class_name: "User", foreign_key: :user_entrou_id
  has_one :user_saiu, class_name: "User", foreign_key: :user_saiu_id

  has_many :objetos, class_name: "Administrativo::PassagemServicoObjeto",
    foreign_key: :administrativo_passagem_servico_id

  accepts_nested_attributes_for :objetos, allow_destroy: true

  # Validates

  validate :validar_campos
  validate :validar_user

  def slim_obj
    attrs = {}
    attrs[:id] = id
    attrs[:status] = status
    attrs[:user_saiu] = load_user_obj(user_saiu_id)
    attrs[:user_entrou] = load_user_obj(user_entrou_id)
    attrs[:criado_em] = created_at
    attrs
  end

  def to_frontend_obj
    attrs = slim_obj
    attrs[:atualizado_em] = updated_at
    attrs[:observacoes] = observacoes
    attrs[:objetos] = objetos.map(&:to_frontend_obj)
    attrs
  end

  def to_obj
    attrs = {}
    attrs[:id] = id
    attrs[:nome] = nome
    attrs[:email] = email
    attrs
  end

  def load_user_obj(user_id)
    if user_id.present?
      user = User.find(user_id)
      user.to_frontend_obj
    else
      return
    end

    user || {}
  end


  private

  # função será renomeada e escrita com o intuito de validadar a presença dos dois usuários
  # def validar_existencia_usuarios
  # end

  def validar_user
    return unless validar_user_opts.present?

    if user_saiu_id.present? && user_entrou_id.present?
       # obj = user_saiu.verificar_senha(validar_user_opts[:user_saiu_senha]) && user_entrou.verificar_senha(validar_user_opts[:user_entrou_senha])
       # raise obj

       # PG::UndefinedColumn: ERROR: column users.user_entrou_id does not exist LINE 1: SELECT "users".* FROM "users" WHERE "users"."user_entrou_id"... ^
       # to tentando idenficar esse erro, mas até agora não consegui, ele aparece quando chamo a função verificar_senha

      if user_entrou.verificar_senha(:validar_user_opts[:user_entrou_senha])
        errors.add(:base, 'Senha incorreta: quem está entrando.')
      elsif !user_saiu.verificar_senha(validar_user_opts[:user_saiu_senha])
        errors.add(:base, 'Senha incorreta: quem está saindo.')
      end

    end

    errors.empty?
  end

  def validar_campos
    errors.add(:base, 'Quem sai não pode ser vazio.') if self.user_saiu_id.blank?

    if self.objetos.present?
      self.objetos.each do |objeto|
        if objeto[:administrativo_passagem_servico_objeto_categoria_id].blank?
          errors.add(:base, 'Selecione uma categoria para os objetos.')
        elsif objeto[:itens].blank?
          errors.add(:base, 'É necessário adicionar ao menos 1 items para salvar objetos.')
        end

      end
    end

    errors.empty?
  end



end
