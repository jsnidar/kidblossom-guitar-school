class ApplicationController < ActionController::API

  before_action :authorized

  def encode_token(payload)
    JWT.encode(payload, ENV['JWT_SECRET'])
  end

  def auth_header
    request.headers['Authorization']
  end

  def decoded_token
    if auth_header
      token = auth_header.split(' ')[1]
      begin
        JWT.decode(token, ENV['JWT_SECRET'], true, algorithm: ENV['JWT_ALGORITHM'])
      rescue JWT::DecodeError
        nil
      end
    end
  end

  def current_user

    # if decoded_token
    #   user_id = decoded_token[0]['user_id']
    #   @user = User.find_by(id: user_id)
    # end
    @user ||= decoded_token && User.find_by(id: decoded_token[0]['user_id'])
  end

  def logged_in?
    !!current_user
  end

  def authorized
    render json: { errors: ['Please log in']}, status: :unauthorized unless logged_in?
  end
end