export interface IModel<TDataToStore, TDataToSend> {
  toStorage(): TDataToStore,
  toResponse(): TDataToSend,
}