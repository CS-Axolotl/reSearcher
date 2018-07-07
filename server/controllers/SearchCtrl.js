import axios from 'axios';

const G_SEARCH_URL = 'https://www.googleapis.com/customsearch/v1';
const SEARCH_ENGINE_ID = '014283448084479844869:zffloy02m7q';

const SearchApiCtrl = {
  get: (req, res, next) => {
    const {
      q,
      num = 10,
      exactTerms = '',
      excludeTerms = '',
      cx = SEARCH_ENGINE_ID,
      key = process.env.API_KEY,
    } = req.query;
    fetch(G_SEARCH_URL, {
      params: {
        q, num, exactTerms, excludeTerms, cx, key,
      },
    }).then((data) => {
      console.log(data);
      return res.send(data);
    }).catch((err) => {
      console.log(err)
      return next(err)
    });
  },
};

export default SearchApiCtrl;

