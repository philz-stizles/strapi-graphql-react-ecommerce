module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'mongoose',
      settings: {
        host: env('DATABASE_HOST', 'cluster0-shard-00-00.84cwx.mongodb.net,cluster0-shard-00-01.84cwx.mongodb.net,cluster0-shard-00-02.84cwx.mongodb.net'),
        srv: env.bool('DATABASE_SRV', false),
        port: env.int('DATABASE_PORT', 27017),
        database: env('DATABASE_NAME', 'reactStrapiEcommerce'),
        username: env('DATABASE_USERNAME', 'natourAdmin'),
        password: env('DATABASE_PASSWORD', 'zVSPo8jbiJCM6TbX'),
      },
      options: {
        authenticationDatabase: env('AUTHENTICATION_DATABASE', null),
        ssl: env.bool('DATABASE_SSL', true),
      },
    },
  },
});
