import React from "react";
import { Card, Grid } from "@mui/material";
import { Player } from "../../../../../../models/players";
import { MAX_PARTY_SIZE } from "../../../../../../models/constants";
import { PlayerItem } from "./components/player-item";
import { SpecializationRole } from "../../../../../../models";

interface PublicProps {
  party: (Player | undefined)[];
  role?: SpecializationRole;
  partyIndex: number;
  onPlayerRemove: (player: Player) => void;
  onPlayerAdd: (newPlayer: Player, toIndex: number, fromIndex?: number) => void;
  onPlayerEdit: (newPlayer: Player, oldPlayer: Player) => void;
}

export type Props = PublicProps;

export const PartyList: React.FC<Props> = ({
  party,
  role,
  partyIndex,
  onPlayerRemove,
  onPlayerAdd,
  onPlayerEdit,
}) => {
  return (
    <Card>
      <Grid container direction={"column"} p={1}>
        {party.map((player, index) => (
          <Grid item key={player ? player.id : index}>
            <PlayerItem
              player={player}
              selected={player ? player.specialization.role === role : false}
              raidIndex={partyIndex * MAX_PARTY_SIZE + index}
              onRemoveButtonClick={onPlayerRemove}
              onDrop={(p, fromIndex) =>
                onPlayerAdd(p, partyIndex * MAX_PARTY_SIZE + index, fromIndex)
              }
              onNameInputSubmit={onPlayerEdit}
            />
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};
