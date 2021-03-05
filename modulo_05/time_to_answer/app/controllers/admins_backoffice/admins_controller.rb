class AdminsBackoffice::AdminsController < AdminsBackofficeController
  before_action :verify_password, only: [:update]
  before_action :set_admin, only: [:edit, :update, :destroy]

  def edit
  end

  def set_admin
    @admin = Admin.find(params[:id])
  end

  def index
    @admins = Admin.all.page(params[:page]).per(5)
  end

  def new
    @admin = Admin.new()
  end



  def create
    st, resp = AdminsBackoffice::AdminsService.create(params_admin)
    case st
    when :success then redirect_to admins_backoffice_admins_path, resp
    else
      @admin = resp
      render :new
    end
  end

  def destroy
    st, resp = AdminsBackoffice::AdminsService.destroy(params_admin)
    case st
    when :success then redirect_to admins_backoffice_admins_path, resp
    else
      @admin = resp
      render :index
    end
  end


  def update
    st, resp = AdminsBackoffice::AdminsService.update(params_admin)
    case st
    when :success then redirect_to admins_backoffice_admins_path, resp
    else
      @admin = resp
      render :edit
    end
  end

  private



  def params_admin
    attrs = [ :id, :email, :password, :password_confirmation]
    resp = params.require(:admin).permit(attrs)
    resp
  end

  def verify_password
    if params[:admin][:password].blank? && params[:admin][:password_confirmation].blank?
      params[:admin].extract!(:password, :password_confirmation)
    end
  end

end
