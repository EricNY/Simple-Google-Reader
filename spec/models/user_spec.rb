require 'spec_helper'

describe User do

  it 'should create a valid user' do
    user = build(:user)
    expect(user).to be_valid
  end

  it 'should have many publications' do
    user = build(:user)
    expect(user.publications).to be_empty
  end

  it 'should have many publications' do
    user = create(:user)
    publication = create(:publication, user: user)
    expect(user.publications.length).to eq(1)
  end

end
