const pool = require('../db');

exports.getProductos = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM productos ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
