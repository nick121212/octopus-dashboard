import utils from "../../utils";
import _ from "lodash";
import async from "async";

exports = module.exports = (app, db, errors) => {
    let name = utils.modelNames.interface;
    let {models} = db;
    let Model = models[name];
    let Server = models[utils.modelNames.server];
    let Sequelize = db.Sequelize;

    return (req, res, next) => {
        let interfaceKey = req.params[name];
        let filter = _.extend({}, utils.query(req), req.query);

        app.controllers.interface.execute_interface(interfaceKey, filter, req.body, req.user ? req.user.access_token : "").then((result) => {
            console.log("fdfjldkfjaljdf---::fjjdakljflkjadf---", result);
            res.json(result);
        }, next);
    };
}