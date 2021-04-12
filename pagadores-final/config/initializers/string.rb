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

  def is_email?
    # regex = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i
    regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i
    self =~ regex ? true : false
  end

end
