const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export interface User {
  id?: string;
  name: string;
  email: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
}

export const createUser = async (userData: CreateUserRequest): Promise<User> => {
  try {
    const response = await fetch(`${API_BASE_URL}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create user: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const getUser = async (userId?: string): Promise<User | User[]> => {
  try {
    const url = userId ? `${API_BASE_URL}/user/${userId}` : `${API_BASE_URL}/user`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to get user: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
};