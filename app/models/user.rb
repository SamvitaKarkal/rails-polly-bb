class User < ApplicationRecord
  VALID_EMAIL_REGEX = /\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i.freeze

  has_many :poll, dependent: :destroy
  #, foreign_key: :user_id
  has_secure_password
  has_secure_token :authentication_token

  validates :first_name, presence: true, length: {maximum: 25}
  validates :least_name, presence:true, length: {maximum: 25}
  validates :email, presence: true,
                    length: {maximum: 255},
                    uniqueness: {case_sensitive: false },
                    format: {with: VALID_EMAIL_REGEX}
  validates :password, presence: true, confirmation: true, length: { minimum: 6 }
  validates :password_confirmation, presence: true, on: :create

  before_save :to_lowercase

  private

  def to_lowercase
    email.downcase!
  end

end

#test_cases

#if no mail provided

# def test_user_should_be_not_be_valid_and_saved_without_email
#   @user.email = ''
#   assert_not @user.valid?

#   @user.save
#   assert_equal ["Email can't be blank", 'Email is invalid'],
#                 @user.errors.full_messages
# end

#CHECK EMAIL UNIQUE

# def test_user_should_not_be_valid_and_saved_if_email_not_unique
#   @user.save!

#   test_user = @user.dup
#   assert_not test_user.valid?

#   assert_equal ['Email has already been taken'],
#                 test_user.errors.full_messages
# end

#

# def test_reject_email_of_invalid_length
#   @user.email = ('a' * 50) + '@test.com'
#   assert @user.invalid?
# end

# def test_validation_should_accept_valid_addresses
#   valid_emails = %w[user@example.com USER@example.COM US-ER@example.org
#                     first.last@example.in user+one@example.ac.in]

#   valid_emails.each do |email|
#     @user.email = email
#     assert @user.valid?
#   end
# end

# def test_validation_should_reject_invalid_addresses
#   invalid_emails = %w[user@example,com user_at_example.org user.name@example.
#                       @sam-sam.com sam@sam+exam.com fishy+#.com]

#   invalid_emails.each do |email|
#     @user.email = email
#     assert @user.invalid?
#   end
# end

# def test_user_should_not_be_saved_without_password
#   @user.password = nil
#   assert_not @user.save
#   assert_equal ["Password can't be blank"],
#                 @user.errors.full_messages
# end

# def test_user_should_not_be_saved_without_password_confirmation
#   @user.password_confirmation = nil
#   assert_not @user.save
#   assert_equal ["Password confirmation can't be blank"],
#                 @user.errors.full_messages
# end

# #test to validate unique auth token:

# def test_users_should_have_unique_auth_token
#   @user.save!
#   second_user = User.create!(name: 'Olive Sans', email: 'olive@example.com',
#                              password: 'welcome', password_confirmation: 'welcome')

#   assert_not_same @user.authentication_token,
#                   second_user.authentication_token
# end