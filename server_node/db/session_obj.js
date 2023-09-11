import mongoStore from "./MongoStore.js";
const session_obj={
    secret: "345titilo",
    secure:false,
    saveUninitialized: false, // don't create session until something stored
    resave: false,
    store: mongoStore
}

export default session_obj;