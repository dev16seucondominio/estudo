class PagadoresController < ApplicationController
  skip_before_action :verify_authenticity_token

  # list = get = index, por padrao a gente usa index no controller, na resource/route blz nao sei se eh exatamente qualquer um, mas so manter nesse padrao q nao da erro sdpofpasdokfpofkapfkasdasdasdpoaksd
  # como eu disse antes, o index eh o metodo chamado assim q a tela eh aberta/carregada... eh a primeira requisicao
  def index # index = list
    respond_to do |format|
      ## dentro dos formatos disponiveis (existem outros, bem como formatos de arquivos - pra carregar um pdf, por exemplo), tu precisa setar o que o metodo vai retornar de acordo com o formato passdao... se for html, eh carregar uma template, se for json, eh carregar um registro ou fazer uma requisicao q carrega varios registros...
      format.html { layout_erp } # qnd bate no html ele carrega a template
      format.json{

        status, resp = PagadoresService.index(get_params)

        case status
        when :success then render json: resp, status: :ok
        when :error then render json: { errors: resp }, status: :error
        end
      }
    end
  end

  def save
    status, resp = PagadoresService.save(params_pagador)

    case status
    when :success then render json: resp, status: :ok
    when :error then render json: { errors: resp }, status: :error
    end
  end

  def destroy
    status, resp = PagadoresService.destroy(params)

    case status
    when :success then render json: resp, status: :ok
    when :not_found then render json: { errors: resp }, status: :not_found
    when :error then render json: { errors: resp }, status: :error
    end
  end


  def show
    status, resp = PagadoresService.show(get_params)

    case status
    when :success then render json: resp, status: :ok
    when :not_found then render json: { errors: resp }, status: :not_found
    when :error then render json: { errors: resp }, status: :error
    end
  end

  def params_pagador
    attrs = [:id, :tipo, :juridica, :sexo, :deficiente, :nome, :doc, :rg, :nasc, :prof, :email,
      :emailalt, :iden, :telefone, :obs, :razao_social, :contato, :enderecos, :contas]
    attrs << {enderecos: [:id, :pagador_id, :principal, :titulo, :cep, :cidade, :logradouro, :complemento, :bairro, :_destroy]}
    attrs << {contas: [:id, :pagador_id, :banco, :tipo_da_conta, :agencia, :dv_agencia, :numero_conta, :dv_conta, :juridica, :responsavel, :doc, :principal, :_destroy]}
    params.require(:pagador).permit(attrs)
  end

end
