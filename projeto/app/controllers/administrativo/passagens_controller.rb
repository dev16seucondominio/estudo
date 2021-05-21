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

	def micro_update
		status, resp = Administrativo::PassagensService.micro_update(params_passagem)

		case status
		when :success then render json: resp, status: :ok
    when :error then render json: { errors: resp }, status: :bad_request
		when :not_found then render json: { errors: resp }, status: :not_found
		end
	end

	def save
		status, resp = Administrativo::PassagensService.save(params_passagem)

		case status
		when :success then render json: resp, status: :ok
    when :error then render json: { errors: resp }, status: :bad_request
		when :not_found then render json: { errors: resp }, status: :not_found
		end
	end

	def show
		status, resp = Administrativo::PassagensService.show(params)

		case status
		when :success then render json: resp, status: :ok
		when :not_found then render json: { errors: resp }, status: :not_found
		end
	end

	def destroy
		status, resp = Administrativo::PassagensService.destroy(params)

		case status
		when :success then render json: resp, status: :ok
		end
	end

  private

	def params_passagem
		attrs = [:passagem, :id, :observacoes, :status, :objetos, :user_saiu_id, :user_entrou_id,
      :micro_update_type, :user_saiu_senha, :user_entrou_senha]

    attrs << {objetos: [:id, :objeto_categoria_id,
      :_destroy, :passagem_servico_id, itens: [:descricao, :qtd, :verificado]]
    }

		resp = {}

		resp[:passagem] = params.require(:passagem).permit(attrs)
    resp[:filtro] = get_params[:filtro]

		resp
	end
end
