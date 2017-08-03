class ApiController < ApplicationController
  def index
    testWord = request.body.read
    apiKey = "1.1114605929881118e30"
    uri = URI("https://www.wordgamedictionary.com/api/v1/references/scrabble/#{testWord}?key=#{apiKey}")
    response = Net::HTTP.get(uri)

    binding.pry
  end
end
