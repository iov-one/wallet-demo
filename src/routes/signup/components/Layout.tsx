import * as React from "react";
import Block from "~/components/layout/Block";
import Grid from "~/components/layout/Grid";
import GridItem from "~/components/layout/GridItem";
import ImageSection from "./ImageSection";
import LoginSection from "./LoginSection";
import SignupFormSection from "./SignupFormSection";
import SubtitleSection from "./SubtitleSection";
import TitleSection from "./TitleSection";

interface Props {
  readonly onSubmit: (values: object) => void;
}

const ref = React.createRef<GridItem>();

const Layout = ({ onSubmit }: Props): JSX.Element => (
  <Grid>
    <GridItem ref={ref} maxwidth="sm" xs={12} sm={4}>
      <ImageSection />
    </GridItem>
    <GridItem xs={12} sm={8} growElem={ref} growSm={4} variant="column" padding="xxl">
      <Block padding="xxl" align="right" margin="xxl">
        <LoginSection />
      </Block>
      <Block padding="xxl" maxWidth={450} margin="sm">
        <TitleSection />
      </Block>
      <Block padding="xxl" margin="xl">
        <SubtitleSection />
      </Block>
      <SignupFormSection onSubmit={onSubmit} />
    </GridItem>
  </Grid>
);

export default Layout;
