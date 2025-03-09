require("dotenv").config();
const redis = require("redis");

const client = redis.createClient({
  url: process.env.REDIS_URL,
  socket: {
    family: 4, // Sadece IPv4 kullan
    tls: false // SSL kullanmıyorsanız
  }
});

client.connect()
  .then(() => console.log("Redis'e bağlanıldı!"))
  .catch((err) => console.error("Redis bağlantı hatası:", err));

module.exports = client;