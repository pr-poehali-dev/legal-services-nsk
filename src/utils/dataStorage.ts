interface ClientData {
  id: string;
  timestamp: string;
  name: string;
  phone: string;
  email?: string;
  message: string;
  source: 'contact_form' | 'consultation_request' | 'callback';
  status: 'new' | 'processed' | 'completed';
}

class DataStorage {
  private storageKey = 'client_data';

  saveClientData(data: Omit<ClientData, 'id' | 'timestamp' | 'status'>): string {
    const clientData: ClientData = {
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      status: 'new',
      ...data
    };

    const existingData = this.getAllData();
    existingData.push(clientData);
    
    localStorage.setItem(this.storageKey, JSON.stringify(existingData));
    
    return clientData.id;
  }

  getAllData(): ClientData[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  getDataById(id: string): ClientData | null {
    const allData = this.getAllData();
    return allData.find(item => item.id === id) || null;
  }

  updateStatus(id: string, status: ClientData['status']): boolean {
    const allData = this.getAllData();
    const index = allData.findIndex(item => item.id === id);
    
    if (index !== -1) {
      allData[index].status = status;
      localStorage.setItem(this.storageKey, JSON.stringify(allData));
      return true;
    }
    
    return false;
  }

  exportData(): string {
    const data = this.getAllData();
    return JSON.stringify(data, null, 2);
  }

  clearData(): void {
    localStorage.removeItem(this.storageKey);
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

export const dataStorage = new DataStorage();
export type { ClientData };