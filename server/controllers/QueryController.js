import Query from '../models/QueryModel';

const QueryController = {};

QueryController.getAll = (req, res, next) => {
  Query.find({}, (err, queries) => {
    if (err) return next(err);
    if (!queries) return res.sendStatus(404);
    return res.status(200).send(queries);
  });
};

QueryController.get = (req, res, next) => {
  Query.findById({ _id: req.params.id }, (err, query) => {
    if (err) return next(err);
    if (!query) return res.sendStatus(404);
    return res.status(200).send(query);
  });
};

QueryController.delete = (req, res, next) => {
  Query.findByIdAndRemove({ _id: req.params.id }, (err) => {
    if (err) return next(err);
    return res.sendStatus(200);
  });
};

QueryController.create = (req, res, next) => {
  const { searchText, results, userId } = req.body;
  const newQuery = new Query({ userId, searchText, results });
  newQuery.save((err, query) => {
    if (err) return next(err);
    if (!query) return res.sendStatus(404);
    return res.status(200).send(query);
  });
};

export default QueryController;
