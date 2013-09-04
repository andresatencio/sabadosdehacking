var data = {
   db: { native_parser: false },
   server: { poolSize: 2 },
   user: process.env.sabados,
   pass: process.env.sabados,
   uri: process.env.sabados_uri
}

module.exports = data;

