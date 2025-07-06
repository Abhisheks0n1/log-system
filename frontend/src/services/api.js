const API_URL = 'http://localhost:5000/logs';

export const fetchLogs = async (filters) => {
  try {
    const query = new URLSearchParams(filters).toString();
    const response = await fetch(`${API_URL}?${query}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    // Filter out invalid log entries
    return Array.isArray(data) ? data.filter(log => log && typeof log === 'object' && log.level) : [];
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
};