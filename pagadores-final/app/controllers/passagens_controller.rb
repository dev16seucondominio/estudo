class PassagensController < ApplicationController
	def index
	  respond_to do |format|
	    format.html { layout_passagens_erp }
	    format.json{  

	    	status, resp = PassagensService.index(get_params)

	    	case status
	    	when :success then render json: resp, status: :ok
	    	when :error then render json: { errors: resp }, status: :bad_request
	    	end
	    }
	  end
	end
end
