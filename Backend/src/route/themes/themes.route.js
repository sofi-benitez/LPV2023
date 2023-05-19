const themesController = require('../../controller/themes/themes.controller');
module.exports = function(app) {

    app.get("/themes/list", themesController.listar);
    app.get("/themes/:id", themesController.consultarPorCodigo);
    app.post("/themes/update", themesController.actualizar);
    app.delete("/themes/delete/:id", themesController.eliminar);
}

