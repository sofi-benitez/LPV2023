const {sequelize} = require("../../connection");
const {UserModel} = require("../../model/user.model");
const UserService = require('../../service/users.service');
const jwt = require ('jsonwebtoken');

const listarController = async function(req, res) {
    console.log("listar usuarios controllers");
    try {
        const users = await UserService.listarService(req.query.filtro || '');
        
        if (users){
            res.json({
                success : true, 
                usuarios : users
            });
        } else {
            res.json({
                success : true, 
                usuarios : []
            });
        }        
    } catch (error) {
        console.log(error);
        res.json({
            success : false, 
            error : error.message
        });
    }

};

const consultarPorCodigo = async function(req, res) {
    console.log("consultar 1 usuario por codigo");
    try {
        //Buscar en la Base de datos por codigo
        const userModelResult = await UserModel.findByPk(req.params.id);

        if (userModelResult) {
            res.json({
                success : true, 
                usuario : userModelResult
            });
        } else {
            res.json({
                success : true, 
                usuario : null
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            success : false, 
            error : error.message
        });
    }

};

const actualizar = async function(req, res) {
    console.log("actualizar usuarios controller");
    //Variables
    let usuarioRetorno = null;    //Guardara el usuario que se va incluir o editar.
     
    try {
        usuarioRetorno = await UserService.actualizar(  req.body.id, 
                                                        req.body.name, 
                                                        req.body.last_name, 
                                                        req.body.avatar, 
                                                        req.body.email, 
                                                        req.body.password, 
                                                        req.body.deleted);
        res.json({
            success : true, 
            user : usuarioRetorno
        });
    } catch (error) {
        console.log(error);
        res.json({
            success : false, 
            error : error.message
        });
    }
};

const eliminar = async function(req, res) {
    console.log("eliminar usuarios");
    //res.send("eliminar de usuarios");

    //Borrado fisico
    //UserModel.destroy(req.params.id);
    try {
        await sequelize.query("UPDATE users SET deleted=true WHERE id = " + req.params.id);
            
        res.json({
            success : true
        });
    } catch (error) {
        console.log(error);
        res.json({
            success : false, 
            error : error.message
        });
    }
};

const login = async function (req, res){
    console.log("login usuario");
    try {
        const userDB = await sequelize.query 
        ("SELECT * FROM users WHERE email = '" + req.body.email + "' AND password =  '" + req.body.password + "'");
    console.log("users", userDB);
    let user = null;
    if(userDB.length > 0 && userDB[0].length > 0){
        user = userDB[0][0];
        if(user.token){
            res.json({
                success: false,
                error: "usuario ya esta autenticado"
            });
            return;
        }
        let token = jwt.sign({
            codigo: user.codigo,
            name: user.name,
            last_name: user.list_name,
            avatar: user.avatar,
            email: user.email
        }, 'passwd');
        const userDBupdate = await sequelize.query("UPDATE users SET token = '" + token + "' WHERE id =  " + user.id );
        res.json({
            success: true,
            token
        })
    }else{
        res.json({
            success: false,
            error: "usuario no encontrado"
        });
    }
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message
        });
    }
}

const logout = async function (res, res){
    try {
        const userDB = await sequelize.query("UPDATE users SET token = null WHERE id =  " + res.locals.userId + " " );

        res.json({
            success: true
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error: error.message
        })
    }
}
module.exports = {
    listarController, 
    busquedaPorCodigo: consultarPorCodigo, 
    actualizar, 
    eliminar, 
    login, 
    logout
};