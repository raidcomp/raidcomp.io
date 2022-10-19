import { Expansion, Specialization } from "../../../../models";
import React from "react";
import { Grid } from "@mui/material";
import { ClassBox } from "./components/class-box";

interface PublicProps {
  expansion: Expansion;
  onSpecClick?: (spec: Specialization) => void;
}

export type Props = PublicProps;

export const SpecSelection: React.FC<Props> = ({ expansion, onSpecClick }) => {
  return (
    <Grid container spacing={2} alignItems={"center"}>
      {expansion.classes.map((wowClass) => (
        <Grid item xs={4} md={3} key={wowClass.id}>
          <ClassBox wowClass={wowClass} onSpecClick={onSpecClick} />
        </Grid>
      ))}
    </Grid>
  );
};
