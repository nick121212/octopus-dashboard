module.exports = (app) => {
    let resource = app.resource('ecms/api/schemas', app.controllers.schema, app);
}