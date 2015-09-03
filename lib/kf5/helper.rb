module KF5
  module Helper
    def kf5_url(options)
      username = Helper.indifferent_access(options, :username)
      time = Time.now.to_i
      token = Digest::MD5.hexdigest "#{username}#{time}#{KF5.configuration.key}"

      params = {
        :username => username,
        :time => time,
        :token => token
      }
      Helper.copy_if_exist(options, params, :name)
      Helper.copy_if_exist(options, params, :phone)
      Helper.copy_if_exist(options, params, :return_to)

      query = URI.encode_www_form(params)
      "https://#{KF5.configuration.domain}.kf5.com/user/remote?#{query}"
    end

    def redirect_to_kf5(options = {})
      redirect_to current_user_kf5_url(options)
    end

    private

    def current_user_kf5_url(options = {})
      kf5_url(current_user_kf5_options.merge(options))
    end

    def current_user_kf5_options
      options = {}
      return options unless respond_to? :current_user
      [:username, :name, :phone].each { |key| 
        property = KF5.configuration.properties.send(key)
        next if property.nil? || !current_user.respond_to?(property)
        value = current_user.send(property)
        options[key] = value unless value.nil?
      }
      options
    end

    def self.indifferent_access(hash, key)
      hash[key.to_s] || hash[key.to_sym]
    end

    def self.copy_if_exist(from_hash, to_hash, key)
      value = indifferent_access(from_hash, key)
      to_hash[key] = value unless value.nil?
    end
  end
end
