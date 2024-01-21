export class SentenceState {
  private state: boolean = false; // Static variable to store data
  private static instance: SentenceState;

  // Private constructor to prevent creating instances with the new keyword
  private constructor() { }

  // Method to set the value of the static variable
  public setState(value: boolean): void {
    this.state = value;
  }

  // Method to get the value of the static variable
  public getState(): boolean {
    return this.state;
  }

  // Method to get the singleton instance
  public static getInstance(): SentenceState {
    if (!SentenceState.instance) {
      SentenceState.instance = new SentenceState();
    }
    return SentenceState.instance;
  }
}