class PollsController < ApplicationController
  #after_action :verify_authorized, except: :index
  before_action :authenticate_user_using_x_auth_token, except: :index
  before_action :load_poll, only: %i[show update destroy]
  before_action :load_options, :load_current_user_response, only: :show

  def index
    polls = Poll.all.order('created_at DESC')
    render status: :ok, json: { polls: polls }
  end

  def create
    @poll = Poll.new(poll_params.merge(user_id: @current_user.id))
    if @poll.save
      render status: :ok, json: { notice: t('successfully_created', entity: 'Poll') }
    else
      render status: :unprocessable_entity,
      json: { error: poll.errors.full_messages.to_sentence }
    end
    rescue ActiveRecord::RecordNotUnique => e
      render status: :unprocessable_entity, json: { errors: e.message }
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

  def update
    if @poll.update(poll_params)
      render status: :ok, json: {notice: "Poll successfully updated" }
    else
      render status: :unprocessable_entity, 
      json: { errors: poll.errors.full_messages }
    end
  end
  
  def destroy
    if @poll.destroy
      render status: :ok, json: { notice: 'Poll deleted successfully.' }
    else
      render status: :unprocessable_entity, 
      json: { errors: poll.errors.full_messages}
    end
  end

  private

  def load_poll
    @poll = Poll.find_by_slug!(params[:slug])
    render json: {error: @url.errors.full_messages.to_sentence} unless @poll
    rescue ActiveRecord::RecordNotFound => e
    render json: { error: e }, status: :not_found
  end

  def poll_params
    params.require(:poll).permit(:title, :option_attributes => [:id, :content])
    #, :user_id)
  end

  def load_current_user_response
    @current_user_response = Response.find_by(user: @current_user.id , poll: @poll.id)
  end

  def load_options
    @options = Option.where(polls: @poll.id)
  end

end
