class Administrativo::PassagensController < ApplicationController
	skip_before_action :verify_authenticity_token

	def index
	  respond_to do |format|
	    format.html { layout_erp }
	    format.json{

	    	status, resp = Administrativo::PassagensService.index(get_params)

	    	case status
	    	when :success then render json: resp, status: :ok
	    	end
	    }
	  end
	end

	def save
		status, resp = Administrativo::PassagensService.save(params_passagem)

		case status
		when :success then render json: resp, status: :ok
    when :error then render json: { errors: resp }, status: :error
		when :not_found then render json: { errors: resp }, status: :not_found
		end
	end

	def destroy
		status, resp = Administrativo::PassagensService.destroy(params)

		case status
		when :success then render json: resp, status: :ok
		end
	end

	def params_passagem
		attrs = [:passagem, :id, :observacoes, :status, :objetos, :user_saiu_id, :user_entrou_id]
    attrs << {objetos: [:id, :administrativo_passagem_servico_objeto_categoria_id,
      :_destroy, :administrativo_passagem_servico_id, itens: [:descricao, :qtd, :verificado]]}

		resp = {}

		resp[:passagem] = params.require(:passagem).permit(attrs)

		resp
	end
end
