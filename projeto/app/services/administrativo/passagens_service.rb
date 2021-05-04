class Administrativo::PassagensService

  def self.index(params)
    passagens = Administrativo::PassagemServico.all(&:slim_obj)

    resp = { list: passagens }

    [:success, resp]
  end

  def self.save(params)

    params = params[:passagem]

    passagem = Administrativo::PassagemServico.new

    if passagem.save
      resp = {passagem: passagem.slim_obj}
      [:success, resp]
    else
      errors = passagem.errors.full_messages
      [:error, errors]
    end
  end

  def self.destroy(params)
  	passagem = Administrativo::PassagemServico.where(id: params[:id]).first

  	if passagem.destroy
  		resp = {msg: "Deu bão"}
  		[:success, resp]
  	else
  		errors = passagem.errors.full_messages
  		[:error, errors]
  	end
  end


end
