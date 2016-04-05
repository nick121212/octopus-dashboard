module.exports = (app) => {
    let menu = app.resource('ecms/api/menus', app.controllers.menu);
    menu.get("/all", app.controllers.menu.sidemenu);
    menu.get("/all/actions", app.controllers.menu.menu_action);
}