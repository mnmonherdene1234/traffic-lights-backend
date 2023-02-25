import { LightType } from "../models/light.model";
import { RoadDto } from "./road.dto";

export class LightDto {
  id: string = "";
  name: string = "";
  road: string | RoadDto = "";
  type: LightType = LightType.Three;
  x: number = 0;
  y: number = 0;
  created_at: Date = new Date();
  updated_at: Date = new Date();
}
