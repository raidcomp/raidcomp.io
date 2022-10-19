import { Player } from "./players";
import { Specialization } from "./models";

export enum ItemType {
  Specialization = "specialization",
  Player = "player",
}

export interface SpecializationItem {
  specialization: Specialization;
}

export interface PlayerItem {
  player: Player;
  fromIndex: number;
}
