import React from "react";
import { Player, SpecializationRole } from "../../../../../../models";
import { Box, Grid, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";

interface PublicProps {
  players: (Player | undefined)[];
  onRoleHover: (role: SpecializationRole) => void;
  onRoleClear: () => void;
}

export type Props = PublicProps;

export const RoleList: React.FC<Props> = ({
  players,
  onRoleHover,
  onRoleClear,
}) => {
  let numOfTanks = 0;
  let numOfMelee = 0;
  let numOfRanged = 0;
  let numOfHealers = 0;

  players.forEach((p) => {
    if (!p) {
      return;
    }

    switch (p.specialization.role) {
      case SpecializationRole.Tank:
        numOfTanks++;
        break;
      case SpecializationRole.MeleeDPS:
        numOfMelee++;
        break;
      case SpecializationRole.RangedDPS:
        numOfRanged++;
        break;
      case SpecializationRole.Healer:
        numOfHealers++;
        break;
    }
  });

  return (
    <Box>
      <Typography>
        <FormattedMessage id={"role-list-title"} defaultMessage={"Roles"} />
      </Typography>
      <Grid container>
        <Grid item xs>
          <Typography
            onMouseEnter={() => onRoleHover(SpecializationRole.Tank)}
            onMouseOut={onRoleClear}
          >
            <FormattedMessage
              id={"role-list-tanks"}
              defaultMessage={"{num} Tanks"}
              values={{ num: numOfTanks }}
            />
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography
            onMouseEnter={() => onRoleHover(SpecializationRole.MeleeDPS)}
            onMouseOut={onRoleClear}
          >
            <FormattedMessage
              id={"role-list-melee"}
              defaultMessage={"{num} Melee"}
              values={{ num: numOfMelee }}
            />
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography
            onMouseEnter={() => onRoleHover(SpecializationRole.RangedDPS)}
            onMouseOut={onRoleClear}
          >
            <FormattedMessage
              id={"role-list-ranged"}
              defaultMessage={"{num} Ranged"}
              values={{ num: numOfRanged }}
            />
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography
            onMouseEnter={() => onRoleHover(SpecializationRole.Healer)}
            onMouseOut={onRoleClear}
          >
            <FormattedMessage
              id={"role-list-healers"}
              defaultMessage={"{num} Healers"}
              values={{ num: numOfHealers }}
            />
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
