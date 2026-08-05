
      import { createRequire } from 'module';
      const require = createRequire(import.meta.url);
    
import o from"express";import{configDotenv as p}from"dotenv";p();var s={NODE_ENV:process.env.NODE_ENV||"development",PORT:process.env.PORT||3001,DATABASE_URL:process.env.DATABASE_URL||""},r=s;var e=o();e.use(o.urlencoded({extended:!0}));e.use(o.json());e.get("/",async(i,t)=>{t.send("server is running")});var n=e;r.NODE_ENV!=="production"&&n.listen(3001,()=>{console.log("server is running on http://localhost:3001")});var A=n;export{A as default};
