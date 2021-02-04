const Router = require('koa-router');
const router = new Router();
const koaBody = require('koa-body')();
const UsersContoller = require('../controllers/userController');


router.get('/users', async(ctx)=>{
    try {
        const users = new UsersContoller();
        const result = await users.getUsers();
        ctx.status = 200
        ctx.body = result; 
    } catch (error) {
        ctx.throw(error.status, error.message);
    }
})

router.get('/user/:name', async(ctx)=>{
    try {
        const name = ctx.params.name;
        const users = new UsersContoller();
        const result = await users.getUser(name);
        ctx.status = 200
        ctx.body = result; 
    } catch (error) {
        ctx.throw(error.status, error.message);
    }
    
})

router.post('/user/', koaBody, async(ctx)=>{
    try{
        const user = ctx.request.body;
        const users = new UsersContoller();
        const result = await users.create(user);
    
        ctx.status = 201
        ctx.body = result;
    } catch (error) {
        ctx.throw(error.status, error.message);
    }

})

router.put('/user/:name', koaBody, async(ctx)=>{

    try{
        const name = ctx.params.name;
        const user = ctx.request.body;
        const users = new UsersContoller();
        await users.update(name, user);
        ctx.status = 204;
    }catch (error) {
        ctx.throw(error.status, error.message);
    }
    
})

router.delete('/user/:name', async(ctx)=>{

    try {
        const name = ctx.params.name;
        const users = new UsersContoller();
        const user = await users.getUser(name);
        const result = await users.delete(name);
    
    
        ctx.status = 200
        ctx.body = user
        
    } catch (error) {
        ctx.throw(error.status, error.message);
    }
})


module.exports =router;