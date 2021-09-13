export class Location {
  lat: number;
  lon: number;
  private radius = 6371;

  constructor(lat: number, lon: number) {
    this.lat = lat;
    this.lon = lon;
  }

  getLocation(): number[] {
    return [this.lat, this.lon];
  }

  calculateDistanceFromHereInKm(lat: number, lon: number) {
    // const dlat = lat - this.lat;
    // const dlon = lon - this.lon;
    // const a =
    //   Math.sin(dlat / 2) * Math.sin(dlat / 2) +
    //   Math.cos(this.lat) *
    //     Math.cos(lat) *
    //     Math.sin(dlon / 2) *
    //     Math.sin(dlon / 2);
    // const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    // const d = this.radius * c;

    const lat1 = (this.lat / 180) * Math.PI;
    const lat2 = (lat / 180) * Math.PI;
    const lon1 = (this.lon / 180) * Math.PI;
    const lon2 = (lon / 180) * Math.PI;
    const sin = (num: number): number => {
      return Math.sin(num);
    };
    const cos = (num: number): number => {
      return Math.cos(num);
    };
    const a = Math.acos(
      sin(lat1) * sin(lat2) + cos(lat1) + cos(lat2) * cos(lon2 - lon1)
    );

    console.log("the distance is:", a);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = this.radius * c;

    return d;
  }
}
