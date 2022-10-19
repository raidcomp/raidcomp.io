import { Button, ButtonGroup, Grid } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ExpansionID } from "../../models";
import React from "react";
import { FormattedMessage } from "react-intl";

export const HomePage = () => {
  return (
    <Grid container spacing={2} minHeight={160}>
      <Grid item xs display="flex" justifyContent="center" alignItems="center">
        <ButtonGroup orientation="vertical">
          <Button
            component={RouterLink}
            to={`/${ExpansionID.WrathOfTheLichKing}`}
          >
            <FormattedMessage
              id={"home-page-wrath-title"}
              defaultMessage={"Wrath of the Lich King"}
            />
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};
