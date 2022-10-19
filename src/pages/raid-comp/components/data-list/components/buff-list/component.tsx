import React from "react";
import { BuffSubType, Player } from "../../../../../../models";
import { Box, Grid, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";

interface PublicProps {
  players: (Player | undefined)[];
}

export type Props = PublicProps;

export const BuffList: React.FC<Props> = ({ players }) => {
  return (
    <Box>
      <Typography>
        <FormattedMessage
          id={"buff-list-title"}
          defaultMessage={"Buffs (Unimplemented)"}
        />
      </Typography>
      <Grid container>
        {Object.keys(BuffSubType)
          .filter((bst) => isNaN(Number(bst)))
          .map((bst) => (
            <Grid item xs={6} key={bst}>
              <FormattedMessage
                id={"buff-list-item"}
                defaultMessage={"{num} {buffName}"}
                values={{
                  num: 0,
                  buffName: bst,
                }}
              />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};
