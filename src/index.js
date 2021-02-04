//Voce deve rodar os testes usando:  npm test
//Para testar a aplicação, rode: npm run dev

//mais infos
//https://github.com/ZijianHe/koa-router

// todas as configuraçoes devem ser passadas via environment variables
const PORT = process.env.PORT || 3000;

const Koa = require('koa');
const Router = require('koa-router');
const userRoutes = require('./routes/userRoutes');

const koa = new Koa();
var router = new Router();

async function dropDB(){
//funcao que atualiza os valores activate de todos os user do bando para 0, assim eles nao sao listado na proxima requisicao e o banco fica limpo
// para a proxima execucao
  const UserController = require('./controllers/userController');
  const user = new UserController();
  await user.destroyData();
  console.log('Banco limpo')
}

//rota simples pra testar se o servidor está online
router.get('/', async (ctx) => {
  await dropDB();
  ctx.body = `Seu servidor esta rodando em http://localhost:${PORT}`; //http://localhost:3000/
});

//Uma rota de exemplo simples aqui.
//As rotas devem ficar em arquivos separados, /src/controllers/userController.js por exemplo

koa
  .use(router.routes())
  .use(router.allowedMethods())
  .use(userRoutes.routes());

const server = koa.listen(PORT);


module.exports = server;