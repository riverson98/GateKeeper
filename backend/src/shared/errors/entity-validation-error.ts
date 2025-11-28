export class EntityValidationError extends Error {
  constructor(public error: Record<string, string[]>) {
    super('Entity validation Error');
    this.name = 'ValidationError';
  }
}
