class UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    if @user.save
      render status: :ok, json: { notice: t('successfully_created', entity: 'User') }
    else
      render status: :unprocessable_entity, json: {
        errors: @user.errors.full_messages.to_sentence
      }
    end
  end

  private

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:first_name, :last_name, :email, :password, :confirmpassword)
    end
end
