module.exports = (app) => {
    let server = app.resource('ecms/api/servers', app.controllers.server);
}