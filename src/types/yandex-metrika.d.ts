declare global {
  interface Window {
    ym?: (
      counterId: number,
      method: string,
      goalName?: string,
      params?: Record<string, any>
    ) => void;
  }
}

export {};
