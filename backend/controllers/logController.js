const logService = require('../services/logService');

const logController = {
  async saveLog(req, res) {
    try {
      const log = await logService.ingestLog(req.body);
      res.status(201).json(log);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getLog(req, res) {
    try {
      const logs = await logService.queryLogs(req.query);
      res.status(200).json(logs);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = logController;