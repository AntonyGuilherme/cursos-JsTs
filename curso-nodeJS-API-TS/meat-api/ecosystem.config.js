module.exports = {
  apps: [{ //pm2 start ecosystem.config.js pm2 start ecosystem.config.js --env production
    name: "MEAT-API",
    script: "./dist/main.js",
    instances: 1, //quantidade clusters
    exec_mode: "cluster",
    merge_logs: true,
    watch: true,
    env: {
      SERVER_PORT: 5000,
      DB_URL: 'mongodb://localhost/meat-api',
      NODE_ENV: "development"
    },
    env_production: {
      SERVER_PORT: 5001,
      //DB_URL : 'mongodb://localhost/meat-api',
      NODE_ENV: "production"
    }
  }]
}
