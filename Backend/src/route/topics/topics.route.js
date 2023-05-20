const topicsController = require('../../controller/topics/topics.controller');
const authMiddleware = require('../../middleware/auth.controller');

module.exports = function (app) {

    app.get("/topics/list", authMiddleware.auth, topicsController.listar);
    app.get("/topics/:id", authMiddleware.auth, topicsController.consultarPorCodigo);
    app.post("/topics/update", authMiddleware.auth, topicsController.actualizar);
    app.delete("/topics/delete/:id", authMiddleware.auth, topicsController.eliminar);
} 
