class ResponsesController < ApplicationController
    before_action :authenticate_user_using_x_auth_token, only: :create
  
    def create
      response = Response.new(load_params.merge(user_id: @current_user.id))
      prev_response = Response.find_by(user: @current_user.id, poll: response.poll_id)
      if(prev_response)
        render status: :unprocessable_entity, json: {
          error: "Response to this poll already provided"
        }
      elsif response.save
        render status: :ok, json:{
          notice: t('response_recorded')
        }
      else
        render status: :unprocessable_entity, json: {
          errors: response.errors.full_messages.to_sentence
        }
      end
    end

    private
    
    def load_params
      params.require(:response).permit(:poll_id, :option_id)
    end
  end