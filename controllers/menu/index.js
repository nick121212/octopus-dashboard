import utils from '../../utils';

exports = module.exports = (app, db) => {
    let {models} = db;
    let name = utils.modelNames.menu;
    let Model = models[name];
    
    return (req, res, next) => {
        let filter = utils.query(req);

        Model.findAndCountAll(filter).then((result) => res.json(result), next);
    };
}