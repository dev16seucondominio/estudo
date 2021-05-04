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
		end
	end

	def destroy
		status, resp = Administrativo::PassagensService.destroy(params)

		case status
		when :success then render json: resp, status: :ok
		end
	end

	def params_passagem
		attrs = [:passagem, :id]

		resp = {}

		resp[:passagem] = params.require(:passagem).permit(attrs)

		resp
	end

end
