import Result from '../models/ResultModel';

const ResultController = {};

ResultController.getAll = () => {
  Result.find({}, () => {});
};

ResultController.create = (req, res, next) => {
  Result.create(
    { ...req.body },
    (err) => {
      if (err) {
        res.status(400);
      } else {
        next();
      }
    },
  );
};

module.exports = ResultController;
