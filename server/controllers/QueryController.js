import Query from '../models/QueryModel';

const QueryController = {};

QueryController.getAll = (req, res, next) => {
  Query.find({ userId: res.locals.userId }, (err, queries) => {
    if (err) return next(err);
    if (!queries) return res.sendStatus(404);
    return res.status(200).send(queries);
  });
};

QueryController.get = (req, res, next) => {
  Query.find({ _id: req.params.id, userId: res.locals.userId }, (err, query) => {
    if (err) return next(err);
    if (!query) return res.sendStatus(404);
    return res.status(200).send(query);
  });
};

QueryController.delete = (req, res, next) => {
  Query.findOneAndRemove({ _id: req.params.id, userId: res.locals.userId }, (err) => {
    if (err) return next(err);
    return res.sendStatus(200);
  });
};

QueryController.create = (req, res, next) => {
  const { searchText, results } = req.body;
  const newQuery = new Query({ userId: res.locals.userId, searchText: searchText, results: results });
  newQuery.save((err, query) => {
    // if (err) return res.status(500).send(err);
    // if (!query) return res.sendStatus(404);
    // return res.sendStatus(200);
  });
};

export default QueryController;
