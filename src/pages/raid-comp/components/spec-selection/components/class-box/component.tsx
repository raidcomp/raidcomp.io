import { Class, Specialization } from "../../../../../../models";
import React from "react";
import { Card, Grid } from "@mui/material";
import { ClassSpecButton } from "../class-spec-button";

export interface PublicProps {
  wowClass: Class;
  onSpecClick?: (spec: Specialization) => void;
}

export type Props = PublicProps;

export const ClassBox: React.FC<Props> = ({ wowClass, onSpecClick }) => {
  return (
    <Card>
      <Grid container alignItems="center" bgcolor={wowClass.hexColor}>
        {wowClass.specs.map((spec) => (
          <Grid
            container
            item
            xs={12 / wowClass.specs.length}
            key={spec.id}
            justifyContent={"space-evenly"}
          >
            <ClassSpecButton spec={spec} onClick={onSpecClick} />
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};
