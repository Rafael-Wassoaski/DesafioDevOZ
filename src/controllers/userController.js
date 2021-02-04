const database = require('../models/');

class UserController {

    async create(user){

        if(user.age < 18){
            const error = new Error('Menores de idade nao podem ser cadastrados');
            error.status = 400;
            throw error;
        }
        const result = await database.User.create(user, {
            raw: true
        });

        return result;
    }

    async getUsers(){
        const result = await database.User.findAll({attributes: ['name', 'age', 'email'], where: {
            active: 1
        },
        raw: true
    });
        return result;
    }

    async getUser(name){
        const result = await database.User.findOne({attributes: ['name', 'age', 'email'], where:{
                name: name,
            }, 
            raw: true
        });

        if(result == null){
            const error = new Error('User not found');
            error.status = 404;
            throw error;
        }
        return result;
    }

    async update(name, user){
        if(user.age < 18){
            const error = new Error('Menores de idade nao podem ser cadastrados');
            error.status = 400;
            throw error;
        }
        const result = await database.User.update(user, {where:{
                name: name
            }, 
            raw: true
        });
        return result;
    }

    async delete(name){
        const result = await database.User.update({active: 0}, {where:{
            name: name
            }
        });
        return result;
    }

    async destroyData(){
        const result = await database.User.update({active: 0}, {where: {
            active: 1
        }});

        return;
    }
}

module.exports = UserController