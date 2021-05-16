class PollsController < ApplicationController
  before_action :authenticate_user_using_x_auth_token, except: [:index, :show]
  before_action :load_poll, only: %i[ show update delete]
  before_action :load_options, :load_current_user_response, only: :show

  def index
    polls = Poll.all.order('created_at DESC')
    render status: :ok, json: { polls: polls }
  end

  def show
    response_options = @options
    user_response_option_id = nil
    if(@current_user_response)
      total_responses = Response.where(poll: @poll.id).length
      user_response_option_id = @current_user_response.option_id
      response_options =[]
      @options.each do |option| 
        option_responses = Response.where(option: option.id).length
        response_option = option.attributes
        response_option[:response_percentage] = option_responses * 100 / total_responses
        response_options.push(response_option)
      end
    end
    render status: :ok, json:{
      user_response_option_id:  user_response_option_id , poll: @poll, options: response_options
    }    
  end

  def create
    @poll = Poll.new(load_params.merge(user_id: @current_user.id))
    if @poll.save
      render status: :ok, json: { notice: t('successfully_created', entity: 'Poll') }
    else
      render status: :unprocessable_entity, json: { error: poll.errors.full_messages.to_sentence }
    end
    rescue ActiveRecord::RecordNotUnique => e
      render status: :unprocessable_entity, json: { errors: e.message }
  end

  def update
    if @poll.update(poll_params)
      render status: :ok, json: {notice: "Poll successfully updated" }
    else
      render status: :unprocessable_entity, json: { errors: poll.errors.full_messages }

  def destroy
    if @poll.destroy
      render status: :ok, json: { notice: 'Poll deleted successfully.' }
    else
      render status: :unprocessable_entity, json: { errors: poll.errors.full_messages}
    end
  end

  private

    def load_poll
      @poll = Poll.find_by_slug!(params[:slug])
      rescue ActiveRecord::RecordNotFound => e
        render json: { errors: e }, status: :not_found
    end

    def poll_params
      params.require(:poll).permit(:title, :options_attributes => [:id, :option, :vote]).merge(user_id: @current_user.id)
    end

    def load_current_user_response
      @current_user_response = Response.find_by(user: @current_user.id , poll: @poll.id)
    end

    def load_options
      @options = OPtion.where(polls :@poll.id)
    end
end
