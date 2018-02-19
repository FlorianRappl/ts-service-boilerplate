export interface CollectionResponseEntity<T> {
  items: Array<T>;
  count: number;
  offset: number;
}
