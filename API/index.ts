import app from './app';
import {startConnection} from './database';
const ip = '127.16.18.20'
startConnection();
app.listen(3000, ip);
console.log('Server is running on port 3000 with ' + ip)