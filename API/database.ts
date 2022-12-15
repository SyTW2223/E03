import { connect } from 'mongoose';

const options = {
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
    authSource: process.env.DB_AUTHSOURCE
}
export const startConnection = async () => {
    try {
        const db = await connect('mongodb://172.16.19.20:27017/test2', options);
        console.log(db.connection.name);
    } catch (error) {
        console.error(error);
    }
}