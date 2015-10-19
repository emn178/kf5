module KF5
  module ControllerHelper
    def kf5_url(options = {})
      username = Helper.indifferent_access(options, :username)
      time = Time.now.to_i
      token = Digest::MD5.hexdigest "#{username}#{time}#{KF5.configuration.key}"

      params = {
        :username => username,
        :time => time,
        :token => token
      }
      options[:rememberMe] = Helper.indifferent_access(options, :remember_me) || KF5.configuration.remember_me
      options[:rememberMe] = KF5.configuration.remember_me unless 
      [:name, :phone, :return_to, :photo, :rememberMe].each do |key|
        Helper.copy_if_exist(options, params, key)
      end

      query = URI.encode_www_form(params)
      "https://#{KF5.configuration.domain}.kf5.com/user/remote?#{query}"
    end

    def redirect_to_kf5(options = {})
      if Helper.indifferent_access(options, :sso) == false
        redirect_to "https://#{KF5.configuration.domain}.kf5.com/"
      else
        redirect_to current_user_kf5_url(options)
      end
    end

    private

    def current_user_kf5_url(options = {})
      kf5_url(current_user_kf5_options.merge(options))
    end

    def current_user_kf5_options
      options = {}
      return options unless respond_to? :current_user
      [:username, :name, :phone, :photo].each { |key| 
        property = KF5.configuration.properties.send(key)
        next if property.nil? || !current_user.respond_to?(property)
        value = current_user.send(property)
        options[key] = value unless value.nil?
      }
      options
    end
  end
end
