import MongoStore from 'connect-mongo';
import 'dotenv/config';

const DB_URI=process.env.DB_URI;

const mongoStore=MongoStore.create({
        mongoUrl:DB_URI,
        collectionName: 'sessioni',
        touchAfter:3600,//si rinnova di 1 ora ad ogni interazione. Scaduta l'ora per inattività sessione finisce
        ttl:3*60*60*24*1000
})

 export default mongoStore;