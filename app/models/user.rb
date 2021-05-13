class User < ApplicationRecord
  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i.freeze

  validates :first_name, presence: true, length: {maximum: 25}
  validates :least_name, presence:true, length: {maximum: 25}
  validates :email, presence: true,
                    length: {maximum: 255},
                    uniqueness: {case_sensitive: false },
                    format: {with: VALID_EMAIL_REGEX}
  validates :password, presence: true, confirmation: true, length: { minimum: 6 }
  validates :confirmpassword, presence: true, on: :create

  before_save :to_lowercase

  private

  def to_lowercase
    email.downcase!
  end

end
