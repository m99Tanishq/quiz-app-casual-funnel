import axios from 'axios';
import { APIResponse, Question } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'https://opentdb.com/api.php';

export const api = {
  async fetchQuizQuestions(): Promise<Question[]> {
    try {
      const { data } = await axios.get<APIResponse>(`${API_URL}?amount=15`);
      if (data.response_code !== 0) {
        throw new Error('Failed to fetch questions');
      }
      return data.results;
    } catch (error) {
      throw new Error('Error fetching quiz questions');
    }
  }
};