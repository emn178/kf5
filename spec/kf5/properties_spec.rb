RSpec.describe KF5::Properties do
  subject { properties }
  let(:properties) { KF5::Properties.new(:photo => 'http://photo/1.jpg') }
  
  describe "#initialize" do
    its(:photo) { should eq 'http://photo/1.jpg' }
  end
end
