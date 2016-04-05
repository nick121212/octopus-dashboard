
module.exports = (app) => {
    let roles = app.resource('ecms/api/roles', app.controllers.role);
    let rolegroups = app.resource('ecms/api/rolegroups', app.controllers.rolegroup);
}