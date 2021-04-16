class String
  def to_boolean
    return true  if self == 'true'
    return false if self == 'false'
  end

  def is_json?
    is_array? || is_hash?
  end

  def is_array?
    return true if self =~ /^(\[)(.*)(\])$/
    false
  end

  def is_hash?
    return true if self =~ /^({)(.*)(})$/
    false
  end

  def somente_numeros
    self.gsub(/[^0-9]/, '')
  end

  def is_documento?
    self.is_cpf? || self.is_cnpj?
  end

  def is_cpf?
    self.somente_numeros.length == 11
  end

  def is_cnpj?
    self.somente_numeros.length == 14
  end

  def is_email?
    # regex = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i
    regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i
    self =~ regex ? true : false
  end

end
