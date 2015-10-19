module KF5
  module Helper
    def self.indifferent_access(hash, key)
      hash[key.to_s] || hash[key.to_sym]
    end

    def self.copy_if_exist(from_hash, to_hash, key)
      value = indifferent_access(from_hash, key)
      to_hash[key] = value unless value.nil?
    end
  end
end
