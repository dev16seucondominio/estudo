class SiteController < ApplicationController
  
  layout 'site'

  def index
    respond_to do |format|
      format.html { layout_erp }
      format.json{ }
    end
  end

end
