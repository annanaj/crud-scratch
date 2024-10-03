import jsonServer from 'json-server';
import cors from 'cors';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// povolení uplně všech CORS požadavků bez specifikace
server.use(cors());

// pouziti middleware
server.use(middlewares);

// pouziti routeru
server.use(router);

server.listen(5001, () => {
	console.log('JSON Server is running on http://localhost:5001');
});
