import { Player, SpecializationRole } from "../../../../models";
import React from "react";
import { RoleList } from "./components/role-list";
import { Grid } from "@mui/material";
import { BuffList } from "./components/buff-list";

interface PublicProps {
  players: (Player | undefined)[];
  onRoleSelect: (role: SpecializationRole) => void;
  onRoleClear: () => void;
}

export type Props = PublicProps;

export const DataList: React.FC<Props> = ({
  players,
  onRoleSelect,
  onRoleClear,
}) => {
  return (
    <Grid container spacing={2} direction={"column"}>
      <Grid item>
        <RoleList
          players={players}
          onRoleHover={onRoleSelect}
          onRoleClear={onRoleClear}
        />
      </Grid>
      <Grid item>
        <BuffList players={players} />
      </Grid>
    </Grid>
  );
};
