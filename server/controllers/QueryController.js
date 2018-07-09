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
  console.log(req.body);
  debugger;
  const { searchText, results } = req.body;
  console.log(typeof results)
  console.log(typeof JSON.parse(results))
  const newQuery = new Query({ userId: res.locals.userId, searchText, results });
  console.log(newQuery.results);
  // newQuery.save((err, query) => {
  //   if (err) return next(err);
  //   if (!query) return res.sendStatus(404);
  //   return res.status(200).send(query);
  // });
};

export default QueryController;
