import { eventRepository } from '../repositories/eventRepository';

class EventService {
  async getAllEvents() {
    try {
      const result = await eventRepository.getAllEvents();
      return { success: true, data: result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  }

  async getEventsByType(eventType: string) {
    try {
      const result = await eventRepository.getEventsByType(eventType);
      return { success: true, data: result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  }

  async getPastEvents() {
    try {
      const result = await eventRepository.getPastEvents();
      return { success: true, data: result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  }

  async getUpcomingEvents() {
    try {
      const result = await eventRepository.getUpcomingEvents();
      return { success: true, data: result };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  }
}

export const eventService = new EventService();
