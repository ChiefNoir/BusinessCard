export class Category {
  public id: number;
  public code: string;
  public displayName: string;
  public isEverything: boolean;
  public totalProjects: number;
  public version: number;

  // [front-only], url for nagivation
  public url: string;
}
