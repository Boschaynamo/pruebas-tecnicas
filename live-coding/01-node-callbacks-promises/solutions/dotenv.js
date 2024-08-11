import fs from 'node:fs'
export function config (path='solutions/.env'){
    try {
        const datos = fs.readFileSync(path,'utf-8');
        const splittedData = datos.split('\r\n')
        
        splittedData.forEach((dataString,index) =>{
            const split = dataString.split('=');
            if(split[1].startsWith('"'))
                split[1] = split[1].slice(1,-1);
            process.env[split[0]] = split[1]
            
        })
        
    } catch (error) {
        console.error(error.message)
    }
}

const dotenv = {
    config
}

export default dotenv