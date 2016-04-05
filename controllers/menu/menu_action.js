import utils from '../../utils';

exports = module.exports = (app, db) => {
    let {sequelize} = db;

    return (req, res, next) => {
        let sql = [];

        sql.push('SELECT node.*,(count(parent.id)-1) as depth');
        sql.push('  FROM menu as node, menu as parent');
        sql.push('  where node.lft between parent.lft and parent.rgt');
        sql.push('  group by node.id');
        sql.push('  order by node.lft;');

        sequelize.query(sql.join('')).then((results) => {
            res.json(results[0]);
        }, next);
    };
}