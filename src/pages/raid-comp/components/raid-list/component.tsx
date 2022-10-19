import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { PartyList } from "./components/party-list";
import { Player } from "../../../../models";
import { MAX_PARTY_SIZE } from "../../../../models";
import { FormattedMessage } from "react-intl";
import { SpecializationRole } from "../../../../models";

interface PublicProps {
  players: (Player | undefined)[];
  role?: SpecializationRole;
  onPlayerRemove: (player: Player) => void;
  onPlayerAdd: (newPlayer: Player, toIndex: number, fromIndex?: number) => void;
  onPlayerEdit: (newPlayer: Player, oldPlayer: Player) => void;
}

export type Props = PublicProps;

export const RaidList: React.FC<Props> = ({
  players,
  role,
  onPlayerRemove,
  onPlayerAdd,
  onPlayerEdit,
}) => {
  let parties: (Player | undefined)[][] = [];
  for (let i = 0; i < players.length; i = i + MAX_PARTY_SIZE) {
    parties = [...parties, [...players.slice(i, i + MAX_PARTY_SIZE)]];
  }

  return (
    <Grid container spacing={2}>
      {parties.map((party, partyIndex) => {
        // I hope this works this is pretty jank
        const partyKey = `${partyIndex}-${party.reduce(
          (prevValue, player) => prevValue + player?.id,
          ""
        )}`;

        return (
          <Grid item xs={6} md={3} key={partyKey}>
            <Typography>
              <FormattedMessage
                id={"group-title-text"}
                description={"Title shown above each party"}
                defaultMessage={"Group {numOfGroup}"}
                values={{ numOfGroup: partyIndex + 1 }}
              />
            </Typography>
            <Box pt={1}>
              <PartyList
                party={party}
                role={role}
                partyIndex={partyIndex}
                onPlayerRemove={onPlayerRemove}
                onPlayerAdd={(p, toIndex, fromIndex) =>
                  onPlayerAdd(p, toIndex, fromIndex)
                }
                onPlayerEdit={onPlayerEdit}
              />
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};
