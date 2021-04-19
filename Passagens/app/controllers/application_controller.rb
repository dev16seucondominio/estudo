class ApplicationController < ActionController::Base

	before_action :load_paths

	def get_params
		params_to_hash(params.to_unsafe_h)
	end

	private

	def layout_erp
		render html: "", layout: "layouts/application"
	end

	def load_paths
		Dir["#{Rails.root}/app/services/*"].each{ |file| require file }
	end

  def params_to_hash(val)
    json_parse = lambda { |item|
      item = item.to_boolean if item.in? ['true', 'false']
      return item unless item.is_a?(::String) && (item.is_hash? || item.is_array?)
      params_to_hash(JSON.parse(item))
    }
    resp = val
    if resp.is_a?(::String)
      resp = json_parse.call(resp)
    elsif resp.is_a?(Hash)
      list = resp.keys
      list.each{ |k| resp[k] = json_parse.call(resp[k]) }
    elsif resp.is_a?(Array)
      resp.map!{ |item| params_to_hash(item) }
    end
    should_symbolize = resp.is_a?(Hash) || resp.is_a?(ActionController::Parameters)
    should_symbolize ? resp.deep_symbolize_keys : resp
  end

end
