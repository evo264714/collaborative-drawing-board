
const API_URL = 'http://localhost:5000/api/boards';

/**
 * Fetches the list of boards from the backend.
 * @returns {Promise<Array>} - A promise that resolves to an array of boards.
 */
export const fetchBoards = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching boards:', error);
    return [];
  }
};

/**
 * Creates a new board with the given name.
 * @param {string} name - The name of the new board.
 * @returns {Promise<Object>} - A promise that resolves to the newly created board object.
 */
export const createBoard = async (name) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, elements: [] }), // Ensure elements array is included
    });
    if (!response.ok) {
      throw new Error('Failed to create board');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating board:', error);
    throw error;
  }
};

/**
 * Joins an existing board with the given ID.
 * @param {string} boardId - The ID of the board to join.
 * @returns {Promise<Object>} - A promise that resolves to the board object.
 */
export const joinBoard = async (boardId) => {
  try {
    const response = await fetch(`${API_URL}/${boardId}`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Failed to join board');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error joining board:', error);
    throw error; 
  }
};
