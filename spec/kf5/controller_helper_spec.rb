RSpec.describe KF5::ControllerHelper do
  include KF5::ControllerHelper

  before { allow_any_instance_of(Time).to receive(:to_i).and_return(1441197000) }

  describe "#kf5_url" do
    subject { url }

    context "without optional" do
      let(:url) { kf5_url(:username => "username@email.com") }
      it { should eq "https://domain.kf5.com/user/remote?username=username%40email.com&time=1441197000&token=086348249d957524cecd90e4e7e10200" }
    end

    context "with optional" do
      let(:url) { kf5_url(:username => "username@email.com", :name => "name", :phone => "0987654321", :return_to => "http://return.to", :photo => "http://photo/1.jpg", :remember_me => 1) }
      it { should eq "https://domain.kf5.com/user/remote?username=username%40email.com&time=1441197000&token=086348249d957524cecd90e4e7e10200&name=name&phone=0987654321&return_to=http%3A%2F%2Freturn.to&photo=http%3A%2F%2Fphoto%2F1.jpg&rememberMe=1" }
    end

    context "with undefined params" do
      let(:url) { kf5_url(:username => "username@email.com", :undefined => "undefined") }
      it { should eq "https://domain.kf5.com/user/remote?username=username%40email.com&time=1441197000&token=086348249d957524cecd90e4e7e10200" }
    end

    context "with configuration remember_me" do
      before { allow(KF5.configuration).to receive(:remember_me).and_return(10) }
      let(:url) { kf5_url(:username => "username@email.com") }
      it { should eq "https://domain.kf5.com/user/remote?username=username%40email.com&time=1441197000&token=086348249d957524cecd90e4e7e10200&rememberMe=10" }
    end
  end

  describe "#redirect_to_kf5" do
    subject { controller }
    let(:controller) { Controller.new }

    context "with current_user" do
      let(:user) {
        OpenStruct.new(
          :username => "username@email.com",
          :name => "name",
          :phone => "phone"
        )
      }
      before { allow(controller).to receive(:current_user).and_return(user) }

      context "without options" do
        before { controller.redirect_to_kf5 }
        its(:redirect_url) { should eq "https://domain.kf5.com/user/remote?username=username%40email.com&time=1441197000&token=086348249d957524cecd90e4e7e10200&name=name&phone=phone" }
      end

      context "with options" do
        before { controller.redirect_to_kf5(:name => "myname") }
        its(:redirect_url) { should eq "https://domain.kf5.com/user/remote?username=username%40email.com&time=1441197000&token=086348249d957524cecd90e4e7e10200&name=myname&phone=phone" }
      end

      context "with different column" do
        let(:user) {
          OpenStruct.new(
            :email => "username@email.com",
            :name => "name",
            :phone => "phone"
          )
        }
        before { 
          allow(KF5.configuration.properties).to receive(:username).and_return(:email)
          controller.redirect_to_kf5
        }
        its(:redirect_url) { should eq "https://domain.kf5.com/user/remote?username=username%40email.com&time=1441197000&token=086348249d957524cecd90e4e7e10200&name=name&phone=phone" }
      end

      context "without nil property" do
        before { 
          allow(KF5.configuration.properties).to receive(:phone).and_return(:nil)
          controller.redirect_to_kf5
        }
        its(:redirect_url) { should eq "https://domain.kf5.com/user/remote?username=username%40email.com&time=1441197000&token=086348249d957524cecd90e4e7e10200&name=name" }
      end

      context "without sso" do
        before { controller.redirect_to_kf5(:sso => false) }
        its(:redirect_url) { should eq "https://domain.kf5.com/" }
      end

      context "without key" do
        before { 
          allow(KF5.configuration).to receive(:key).and_return(:nil)
          controller.redirect_to_kf5(:sso => false) 
        }
        its(:redirect_url) { should eq "https://domain.kf5.com/" }
      end
    end

    context "without current_user" do
      before { 
        controller.redirect_to_kf5(
          :username => "username@email.com",
          :name => "name",
          :phone => "phone") 
      }
      its(:redirect_url) { should eq "https://domain.kf5.com/user/remote?username=username%40email.com&time=1441197000&token=086348249d957524cecd90e4e7e10200&name=name&phone=phone" }
    end
  end
end
