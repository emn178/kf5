RSpec.describe KF5::Helper do
  include KF5::Helper

  before { allow_any_instance_of(Time).to receive(:to_i).and_return(1441197000) }

  describe "#kf5_url" do
    subject { url }

    context "without optional" do
      let(:url) { kf5_url(:username => "username") }
      it { should eq "https://domain.kf5.com/user/remote?username=username&time=1441197000&token=92eede2f9079c408171d90cd2e30a46e" }
    end

    context "with optional" do
      let(:url) { kf5_url(:username => "username", :name => "name", :phone => "0987654321", :return_to => "http://return.to") }
      it { should eq "https://domain.kf5.com/user/remote?username=username&time=1441197000&token=92eede2f9079c408171d90cd2e30a46e&name=name&phone=0987654321&return_to=http%3A%2F%2Freturn.to" }
    end

    context "with undefined params" do
      let(:url) { kf5_url(:username => "username", :undefined => "undefined") }
      it { should eq "https://domain.kf5.com/user/remote?username=username&time=1441197000&token=92eede2f9079c408171d90cd2e30a46e" }
    end
  end

  describe "#redirect_to_kf5" do
    subject { controller }
    let(:controller) { Controller.new }

    context "with current_user" do
      let(:user) {
        OpenStruct.new(
          :username => "username",
          :name => "name",
          :phone => "phone"
        )
      }
      before { allow(controller).to receive(:current_user).and_return(user) }

      context "without options" do
        before { controller.redirect_to_kf5 }
        its(:redirect_url) { should eq "https://domain.kf5.com/user/remote?username=username&time=1441197000&token=92eede2f9079c408171d90cd2e30a46e&name=name&phone=phone" }
      end

      context "with options" do
        before { controller.redirect_to_kf5(:name => "myname") }
        its(:redirect_url) { should eq "https://domain.kf5.com/user/remote?username=username&time=1441197000&token=92eede2f9079c408171d90cd2e30a46e&name=myname&phone=phone" }
      end

      context "without current_user" do
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
    end

    context "without current_user" do
      before { 
        controller.redirect_to_kf5(
          :username => "username",
          :name => "name",
          :phone => "phone") 
      }
      its(:redirect_url) { should eq "https://domain.kf5.com/user/remote?username=username&time=1441197000&token=92eede2f9079c408171d90cd2e30a46e&name=name&phone=phone" }
    end
  end
end
