class Administrativo::PassagensService

  def self.index(params)
    passagens = Administrativo::PassagemServico.all(&:slim_obj)

    resp = { list: passagens }

    [:success, resp]
  end


end
