RSpec.describe KF5::Configuration do
  subject { properties }
  let(:properties) { KF5::Configuration.new(:domain => 'test') }
  
  describe "#initialize" do
    its(:domain) { should eq 'test' }
  end
end
