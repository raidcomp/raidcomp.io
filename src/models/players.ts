import { Specialization } from "./models";

export interface Player {
  id: string;
  name?: string;
  specialization: Specialization;
}
