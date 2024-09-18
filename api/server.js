import jsonServer from 'json-server';
import cors from 'cors';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// povolení uplně všech CORS požadavků
server.use(cors());

// pouziti default middlewares
server.use(middlewares);

// pouziti routeru
server.use(router);

server.listen(5001, () => {
	console.log('JSON Server is running on http://localhost:5001');
});
