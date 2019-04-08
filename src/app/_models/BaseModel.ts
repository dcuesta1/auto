export class BaseModel {
  constructor(model: any = null, toCamel: boolean = false) {
    if (model) {
      for (let key of Object.keys(model)) {
        const originalKey = key;
        if (toCamel) {
          key = this.snakeToCamel(key.toString());
        }

        this[key] = model[originalKey];
      }
    }
  }

  public snakeToCamel(s) {
    return s.replace(/([-_][a-z])/ig, ($1) => {
      return $1.toUpperCase()
        .replace('_', '');
    });
  }
}
