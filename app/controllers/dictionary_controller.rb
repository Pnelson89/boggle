class DictionaryController < ApplicationController
  # skip_before_action :verify_authenticity_token

  def index
    testWord = params[:key]
    apiKey = "1.1114605929881118e30"
    uri = URI("https://www.wordgamedictionary.com/api/v1/references/scrabble/#{testWord}?key=#{apiKey}")
    response = Net::HTTP.get(uri)

    xmlRex = /<scrabble>[1-9]/

    isValid = response.match(xmlRex)

    if isValid
      render json: {'isValid': true, 'word': testWord}
    else
      render json: {'isValid': false, 'word': testWord}
    end
  end
end


# WORD: OX
# "<?xml version=\"1.0\"?>\n<entry>\n
# <word>ox</word>\n <scrabble>1</scrabble>\n
# <scrabblescore>9</scrabblescore>\n <sowpods>1</sowpods>\n
# <sowpodsscore>9</sowpodsscore>\n <wwf>1</wwf>\n
# <wwfscore>9</wwfscore>\n</entry>\n"

# WORD: BLOC

# "<?xml version=\"1.0\"?>\n<entry>\n
# <word>bloc</word>\n <scrabble>1</scrabble>\n
# <scrabblescore>11</scrabblescore>\n <sowpods>1</sowpods>\n
# <sowpodsscore>8</sowpodsscore>\n <wwf>1</wwf>\n
# <wwfscore>8</wwfscore>\n</entry>\n"

# WORD: TDPR

# "<?xml version=\"1.0\"?>\n<entry>\n
# <word>tdpr</word>\n <scrabble>0</scrabble>\n
# <scrabblescore>0</scrabblescore>\n <sowpods>0</sowpods>\n
# <sowpodsscore>0</sowpodsscore>\n <wwf>0</wwf>\n
# <wwfscore>0</wwfscore>\n</entry>\n"
