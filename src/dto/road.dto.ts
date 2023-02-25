import { LightDto } from "./light.dto";

export class RoadDto {
  id: string = "";
  name: string = "";
  lat: number = 0;
  lng: number = 0;
  lights: string[] | LightDto[] = [];
}
