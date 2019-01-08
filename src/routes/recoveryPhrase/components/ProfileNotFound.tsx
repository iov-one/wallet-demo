import * as React from "react";
import Typography from "~/components/layout/Typography";
import OneColumn from "./OneColumn";
import PageTitle from "./PageTitle";

export default (): JSX.Element => {
  return (
    <OneColumn>
      <PageTitle />
      <Typography variant="h4" color="textPrimary">
        Profile not found
      </Typography>
    </OneColumn>
  );
};
