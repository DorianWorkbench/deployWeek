import bcrypt from "bcrypt";

export async function hashPswd(userPassword:string){
    const hash = new Promise((resolve, reject)=>{
        bcrypt.hash(userPassword, parseInt(process.env.SALT!), function(err, hash){
            if(err){
                reject(err);
            }
            resolve(hash);
        })
    })
    return hash;
}
export async function compareHash(password:string, hash:any){
    return new Promise((resolve, reject)=>{
        bcrypt.compare(password, hash, function(err, result) {
            if(err){
                reject(err);
            }
            resolve(result);
        });
    })
}