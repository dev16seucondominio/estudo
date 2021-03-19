class AdminsBackoffice::AdminsController < AdminsBackofficeController
  before_action :verify_password, only: [:update]
  before_action :set_admin, only: [:edit]

  def index
    @admins = Admin.all.reverse_order.page(params[:page]).per(5)
  end

  def destroy
    st, resp = AdminsBackoffice::AdminsService.destroy(params)
    case st
    when :success then redirect_to admins_backoffice_admins_path, resp
    else
      @admin = "Administrador já excluído"
      redirect_to admins_backoffice_admins_path
    end
  end

  def edit
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

  def set_admin
    @admin = Admin.find(params[:id])
  end

  def params_admin
    params.require(:admin).permit(:id, :email, :password, :password_confirmation)
  end

  def verify_password
    if params[:admin][:password].blank? && params[:admin][:password_confirmation].blank?
      params[:admin].extract!(:password, :password_confirmation)
    end
  end

end
