class PassagensController < ApplicationController
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
end
