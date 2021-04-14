class PagadoresController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    respond_to do |format|
      format.html { layout_erp }
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
    attrs = [:id, :processar_ao_salvar, :tipo, :juridica, :sexo, :deficiente, :nome, :doc, :rg, :nasc, :prof, :email,
      :emailalt, :iden, :telefone, :obs, :razao_social, :contato, :enderecos, :contas, :banco, :perfil_pagamentos, :reajuste_contratual, :bloquear_clientes]
    attrs << {enderecos: [:id, :pagador_id, :principal, :titulo, :cep, :cidade, :logradouro, :complemento, :bairro, :_destroy]}
    attrs << {perfil_pagamentos: [:id, :pagador_id, :operacao, :plano_de_contas, :fundo, :_destroy]}
    attrs << {contas: [:id, :pagador_id, :banco_id, :tipo_conta, :agencia, :dv_agencia, :numero_conta, :dv_conta, :juridica, :responsavel, :doc, :principal, :_destroy]}
    attrs << {reajuste_contratual: [:id, :pagador_id, :reajustar, :tipo, :correcao, :valor, :valor_percentual, :frequencia, :periodo, :ultimo_reajuste, :notificar, :_destroy]}
    attrs << {bloquear_clientes: [:id, :pagador_id, :bloquear, :periodo, :frequencia, :depois_do_vencimento, :clientes, :_destroy]}

    resp = {}

    resp[:pagador] = params.require(:pagador).permit(attrs)

    resp[:filtro] = get_params[:filtro]

    resp
  end

end
