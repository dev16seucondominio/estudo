class User < ApplicationRecord

  def to_frontend_obj
  	attrs = {}
  	attrs[:id] = id
  	attrs[:nome] = nome
  	attrs[:email] = email
  	attrs
  end

  def verificar_senha(params_senha)
    params_senha == self.senha
  end


end
