const redis = require('redis');
const client = redis.createClient("redis://redis:@localhost:6379");
client.connect();


async function teste (){
    var result = await client.set("teste","cursos");
    console.log(result);
    result = await client.get("teste");
    console.log(result);
}

teste()



