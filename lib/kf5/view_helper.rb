module KF5
  module ViewHelper
    def kf5_tag
      javascript_include_tag "//assets.kf5.com/supportbox/main.js", :id => "kf5-provide-supportBox", :"kf5-domain" => "#{KF5.configuration.domain}.kf5.com"
    end
  end
end
