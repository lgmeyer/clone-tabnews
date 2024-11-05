import database from "infra/database.js"

async function status(req, res) {
  const updatedAt = new Date().toISOString();
  const postgresVersionResult = await database.query('SELECT version()');
  const postgresVersion = postgresVersionResult.rows[0].version;
  const maxConnectionsResult = await database.query('SHOW max_connections');
  const maxConnections = parseInt(maxConnectionsResult.rows[0].max_connections, 10);
  const usedConnectionsResult = await database.query('SELECT COUNT(*) AS used_connections FROM pg_stat_activity');
  const usedConnections = parseInt(usedConnectionsResult.rows[0].used_connections, 10);

  res.status(200).json({ 
    updated_at: updatedAt,
    postgres_version: postgresVersion,
    max_conextions: maxConnections, 
    used_connections: usedConnections
  });

}

export default status;