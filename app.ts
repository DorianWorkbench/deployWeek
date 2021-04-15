import {serverRun} from "./server";

async function init(){
    const serve = await serverRun()
    
    serve.listen(process.env.PORT, ()=>{
        console.log("SERVER ON "+process.env.PORT);
    });
}
init();
