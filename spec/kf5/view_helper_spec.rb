RSpec.describe KF5::ViewHelper do
  include KF5::ViewHelper
  include ActionView::Helpers::AssetTagHelper

  describe "#kf5_tag" do
    subject { kf5_tag }
    it { should eq "<script src=\"/javascripts/kf5.js\" id=\"kf5-provide-supportBox\" kf5-domain=\"domain.kf5.com\"></script>" }
  end
end
