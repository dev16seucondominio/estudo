class UsersBackoffice::ProfileController < UsersBackofficeController
  before_action :set_user, only: [:edit]
  before_action :verify_password, only: [:update]

  def edit
    @user.build_user_profile if @user.user_profile.blank?
  end

  def update
    st, resp = UsersBackoffice::ProfileService.update(params_user)
    case st
    when :success then redirect_to users_backoffice_profile_path, resp
    else
      @user = resp
      render :edit
    end
  end

  private

  def params_user
    params.require(:user).permit(:id, :first_name, :last_name, :email, :password, :password_confirmation,
      user_profile_attributes: [:id, :address, :gender, :birthdate, :avatar])
  end

  def verify_password
    if params[:user][:password].blank? && params[:user][:password_confirmation].blank?
      params[:user].extract!(:password, :password_confirmation)
    end
  end

  def set_user
    @user = User.find(current_user.id)
  end
end
