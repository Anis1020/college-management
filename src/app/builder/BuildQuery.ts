import { Query } from "mongoose";

class BuildQuery<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string) {}
  filter() {}
  sort() {}
  pagination() {}
  fields() {}
}
export default BuildQuery;
