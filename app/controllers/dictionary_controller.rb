class DictionaryController < ApplicationController
  # skip_before_action :verify_authenticity_token

  def index
    # binding.pry
    test_word = params[:key]
    api_key = "1.1114605929881118e30"
    uri = URI("https://www.wordgamedictionary.com/api/v1/references/scrabble/" +
              "#{test_word}?key=#{api_key}")
    response = Net::HTTP.get(uri)

    xml_rex = /<scrabble>[1-9]/

    is_valid = response.match(xml_rex)

    if is_valid
      render json: { 'is_valid': true, 'word': test_word }
    else
      render json: { 'is_valid': false, 'word': test_word }
    end
  end
end
