const { DisconnectReason } = require("@whiskeysockets/baileys");
const makeWASocket = require("@whiskeysockets/baileys").default;
const {useRedisAuthStateWithHSet, deleteHSetKeys} = require('baileys-redis-auth');

const {
  BufferJSON,
  useMultiFileAuthState,
} = require("@whiskeysockets/baileys");

//redis
//const redis = require("redis");


const  redisOptions  = {
	host:  '127.0.0.1',
	port:  6379,
};



async function connect() {
const {state, saveCreds, redis} =  await  useRedisAuthStateWithHSet(redisOptions, 'DB1');
  

const sock = makeWASocket({
    printQRInTerminal: true,
    auth: {
        creds:state.creds,
        keys:state.keys
       
    },
  });

    
  sock.ev.on("creds.update", saveCreds);
  console.log(state);
  sock.ev.on("conection.update", async (update) => {
    const { connection, lastDisconnect } = update;

    if (update?.qr) {
      console.log(qr);
    }

    if (connection === "close") {
      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !==
        makeWASocket.DisconnectReason.loggedOut;
      //  await deleteKeysWithPattern({redis, pattern: 'DB1*'});

    }

    if (shouldReconnect) {
        await deleteKeysWithPattern({redis, pattern: 'DB1*'});
    }
  });
}

connect();
