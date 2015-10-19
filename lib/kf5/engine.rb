if defined?(::Rails::Engine)
  module UsertimeRails
    class Engine < ::Rails::Engine
      initializer "kf5" do
        ActiveSupport.on_load :action_controller do
          include KF5::Helper
        end
        ActiveSupport.on_load :action_view do
          include KF5::ViewHelper
        end
        Rails.application.config.assets.precompile += %w( kf5.js )
      end
    end
  end
end
