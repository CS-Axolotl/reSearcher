import axios from 'axios';

const G_SEARCH_URL = 'https://www.googleapis.com/customsearch/v1';
const SEARCH_ENGINE_ID = '014283448084479844869:zffloy02m7q';

const SearchController = {
  get: (req, res, next) => {
    const {
      q,
      num = 10,
      exactTerms = '',
      excludeTerms = '',
      cx = SEARCH_ENGINE_ID,
      key = process.env.API_KEY,
    } = req.query;

    axios
      .get(G_SEARCH_URL, {
        params: {
          q,
          num,
          exactTerms,
          cx,
          key,
          excludeTerms,
        },
      })
      .then(({ data }) => {
        const items = data.items.map(({
          htmlTitle, link, htmlSnippet,
        }) => ({
          htmlTitle, link, htmlSnippet,
        }));
        return res.json(items);
      })
      .catch(err => next(err));
  },
};

export default SearchController;
