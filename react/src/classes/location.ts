export class Location {
  private _lat: number;
  private _lan: number;

  constructor(lat: number, lan: number) {
    this._lat = lat;
    this._lan = lan;
  }

  public lat(): number {
    return this._lat;
  }

  public lan(): number {
    return this._lan;
  }
}
