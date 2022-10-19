import {
  ExpansionID,
  getSpec,
  MAX_RAID_SIZE,
  Player,
  SpecializationID,
} from "../models";
import { v4 as uuidv4 } from "uuid";

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const encodeSpec: (specID: SpecializationID) => string = (specID) => {
  const index = Object.values(SpecializationID).indexOf(specID);

  if (index < 0) {
    throw new Error(`Invalid specialization ID: ${specID}`);
  }

  return alphabet.charAt(index);
};

const decodeSpec: (encodedSpecID: string) => SpecializationID = (
  encodedSpecID
) => {
  const index = alphabet.indexOf(encodedSpecID);

  if (index < 0) {
    throw new Error(`Invalid encoded spec: ${encodedSpecID}`);
  }

  return Object.values(SpecializationID)[index];
};

export const encodePlayer = (player: Player) => {
  let encodedPlayer = "";

  encodedPlayer += encodeSpec(player.specialization.id);

  if (player.name) {
    encodedPlayer += `:${encodeURIComponent(player.name)}`;
  }

  return encodedPlayer;
};

export const decodePlayer = (
  expansionID: ExpansionID,
  encodedPlayer: string
): Player => {
  const playerParts = encodedPlayer.split(":");

  const specID = decodeSpec(playerParts[0]);

  let name;
  if (playerParts[1]) {
    name = decodeURIComponent(playerParts[1]);
  }

  return {
    id: uuidv4(),
    specialization: getSpec(expansionID, specID),
    name: name,
  };
};

export const encodePlayers: (players: (Player | undefined)[]) => string = (
  players
) => {
  // First, trim players
  let lastPlayerIndex = players.length - 1;
  while (lastPlayerIndex >= 0) {
    if (players[lastPlayerIndex]) {
      break;
    }

    lastPlayerIndex--;
  }

  // Hey there's no players!
  if (lastPlayerIndex < 0) {
    return "";
  }

  const trimmedPlayers = players.slice(0, lastPlayerIndex + 1);

  return trimmedPlayers
    .map((player) => (player ? encodePlayer(player) : ""))
    .join(",");
};

export const decodePlayers: (
  expansionID: ExpansionID,
  decodeString?: string | null
) => (Player | undefined)[] = (expansionID, decodeString) => {
  if (!decodeString) {
    return [];
  }

  const playerParts = decodeString.split(",");

  const players: (Player | undefined)[] = playerParts.map((encodedPlayer) =>
    encodedPlayer ? decodePlayer(expansionID, encodedPlayer) : undefined
  );

  return [
    ...players,
    ...new Array(MAX_RAID_SIZE - players.length).fill(undefined),
  ];
};
