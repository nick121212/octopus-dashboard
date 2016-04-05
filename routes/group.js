
module.exports = (app) => {
    let groups = app.resource('ecms/api/groups', app.controllers.group);
    let groupactions = app.resource('ecms/api/groupactions', app.controllers.groupaction);
}