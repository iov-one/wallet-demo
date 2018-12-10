import * as React from "react";
import Grid from "~/components/layout/Grid";
import GridItem from "~/components/layout/GridItem";
import ImageSection from "./ImageSection";
import SignupFormSection from "./SignupFormSection";

interface Props {
  readonly onSubmit: (values: object) => void;
}

const ref = React.createRef<GridItem>();

const Layout = ({ onSubmit }: Props): JSX.Element => (
  <Grid>
    <GridItem ref={ref} maxwidth="sm" xs={0} sm={4}>
      <ImageSection />
    </GridItem>
    <GridItem xs={12} sm={8} growElem={ref} growSm={4} variant="column">
      <SignupFormSection onSubmit={onSubmit} />
    </GridItem>
  </Grid>
);

export default Layout;
