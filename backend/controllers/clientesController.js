const pool = require('../db');

exports.getClientes = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM clientes ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getClienteById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM clientes WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createCliente = async (req, res) => {
  try {
    const { nombre, documento, telefono, estado } = req.body;
    const result = await pool.query(
      'INSERT INTO clientes (nombre, documento, telefono, estado) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, documento, telefono, estado]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, documento, telefono, estado } = req.body;
    const result = await pool.query(
      'UPDATE clientes SET nombre = $1, documento = $2, telefono = $3, estado = $4 WHERE id = $5 RETURNING *',
      [nombre, documento, telefono, estado, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM clientes WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json({ message: 'Cliente eliminado', cliente: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
