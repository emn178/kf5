module KF5
  module ViewHelper
    def kf5_tag
      javascript_include_tag "kf5.js", :id => "kf5-provide-supportBox", :"kf5-domain" => "#{KF5.configuration.domain}.kf5.com"
    end
  end
end
