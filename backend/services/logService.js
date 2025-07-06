const fs = require('fs').promises;
const path = require('path');

const logService = {
  DB_FILE: path.join(__dirname, '../logs.json'),
  validLevels: ['error', 'warn', 'info', 'debug'],

  async initializeDB() {
    try {
      await fs.access(this.DB_FILE);
    } catch {
      await fs.writeFile(this.DB_FILE, JSON.stringify([]));
    }
  },

  async readLogs() {
    await this.initializeDB();
    const data = await fs.readFile(this.DB_FILE, 'utf8');
    return JSON.parse(data);
  },

  async writeLogs(logs) {
    await fs.writeFile(this.DB_FILE, JSON.stringify(logs, null, 2));
  },

  validateLog(log) {
    const requiredFields = ['level', 'message', 'resourceId', 'timestamp', 'traceId', 'spanId', 'commit', 'metadata'];
    if (!requiredFields.every(field => log[field])) {
      throw new Error('Missing required fields');
    }
    if (!this.validLevels.includes(log.level)) {
      throw new Error('Invalid log level');
    }
    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(log.timestamp)) {
      throw new Error('Invalid timestamp format');
    }
  },

  async ingestLog(log) {
    this.validateLog(log);
    const logs = await this.readLogs();
    logs.push({ ...log, id: Date.now().toString() });
    await this.writeLogs(logs);
    return log;
  },

  async queryLogs(filters) {
    let logs = await this.readLogs();
    if (filters.level) {
      logs = logs.filter(log => log.level === filters.level);
    }
    if (filters.message) {
      const searchTerm = filters.message.toLowerCase();
      logs = logs.filter(log => log.message.toLowerCase().includes(searchTerm));
    }
    if (filters.resourceId) {
      logs = logs.filter(log => log.resourceId === filters.resourceId);
    }
    if (filters.timestamp_start) {
      logs = logs.filter(log => new Date(log.timestamp) >= new Date(filters.timestamp_start));
    }
    if (filters.timestamp_end) {
      logs = logs.filter(log => new Date(log.timestamp) <= new Date(filters.timestamp_end));
    }
    if (filters.traceId) {
      logs = logs.filter(log => log.traceId === filters.traceId);
    }
    if (filters.spanId) {
      logs = logs.filter(log => log.spanId === filters.spanId);
    }
    if (filters.commit) {
      logs = logs.filter(log => log.commit === filters.commit);
    }
    return logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }
};

module.exports = logService;