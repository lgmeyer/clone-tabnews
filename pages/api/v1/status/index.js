import database from "infra/database.js"

async function status(req, res) {
  const updatedAt = new Date().toISOString();
  const postgresVersionResult = await database.query('SHOW server_version;');
  const postgresVersionValue = postgresVersionResult.rows[0].server_version;

  const maxConnectionsResult = await database.query('SHOW max_connections;');
  const maxConnectionsValue = parseInt(maxConnectionsResult.rows[0].max_connections, 10);

  const openedConnectionsResult = await database.query("SELECT count(*)::int FROM pg_stat_activity WHERE datname = 'postgres';");
  const openedConnectionsValue = openedConnectionsResult.rows[0].count


  res.status(200).json({ 
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: postgresVersionValue,
        max_connections: maxConnectionsValue,
        opened_connections: openedConnectionsValue
      }
    },
  });

}

export default status;