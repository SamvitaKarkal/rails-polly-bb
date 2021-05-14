class PollsController < ApplicationController
  before_action :load_poll, only: %i[ show update destroy ]

  def index
    polls = Poll.all.order('created_at DESC')
    render status: :ok, json: { polls: polls }
  end

  def show
    render status: :ok, json: { poll: @poll.as_json(include: {
      options: {
        only: [:option, :id, :vote]
      }
    })
  }
  end

  def create
    @poll = Poll.new(poll_params)
    if @poll.save
      render status: :ok, json: { notice: "Poll created successfully!" }
    else
      render status: :unprocessable_entity, json: { error: @poll.errors.full_messages.to_sentence}
    end
    rescue ActiveRecord::RecordNotUnique => e
      render status: :unprocessable_entity, json: { errors: e.message }
  end

  def update
    if @poll.update(poll_params)
      render status: :ok, json: {}
    else
      errors = @poll.errors.full_messages
      render status: :unprocessable_entity, json: { errors: errors }
    end
  end

  def destroy
    if @poll.destroy
      render status: :ok, json: { 
        notice: 'Poll deleted successfully.'
      }
    else
      errors = @poll.errors.full_messages
      render status: :unprocessable_entity, json: { errors: errors }
    end
  end

  private

    def load_poll
      @poll = Poll.find_by_slug!(params[:slug])
      # @poll = Poll.find(params[:id])
    rescue ActiveRecord::RecordNotFound => e
      render json: { errors: e }, status: :not_found
    end

    def poll_params
      params.require(:poll).permit(:title, :options_attributes => [:id, :option, :vote]).merge(user_id: @current_user.id)
    end
end
