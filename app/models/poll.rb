class Poll < ApplicationRecord

  belongs_to :user
  has_many :option
  accepts_nested_attributes_for ;option
  validates :title, presence: true, length: {maximum: 50}
  validates :slug, uniqueness: true
  validate :slug_not_changed
  validates :options, presence: true
  before_create :set_slug

  private

  def set_slug
    #iterator to append no. at end to create unique slug
    itr = 1
    loop do
      title_slug = title.parameterize
      slug_candidate = itr > 1 ? "#{title_slug}-#{itr}" : title_slug
      break self.slug = slug_candidate unless Task.exists?(slug: slug_candidate)
      itr += 1
    end
  end

  def slug_not_changed
    if slug_changed? && self.persisted?
      errors.add(:slug, t('is immutable!'))
    end
  end

end
