
      import { createRequire } from 'module';
      const require = createRequire(import.meta.url);
    
import o from"express";var p=o();p.get("/",(n,r)=>{r.send("server is running")});var e=p;e.listen(3001,()=>{console.log("Server is running on port 3001")});var l=e;export{l as default};
