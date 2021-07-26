const Wiki = require('wikijs').default

const wikiAction = async ({ searchValue }) => {
  const wikiService = Wiki({ apiUrl: 'https://pt.wikipedia.org/w/api.php' })
  const text = await wikiService.find(searchValue).then(response => response.summary())

  return text.split('\n').filter(message => message)
}

module.exports.run = async ({ payload }) => {
  const { searchValue } = payload.params

  return wikiAction({ searchValue })
}

