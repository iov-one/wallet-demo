import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { FormState } from "final-form";
import * as React from "react";
import Form from "~/components/forms/Form";
import Block from "~/components/layout/Block";
import Button from "~/components/layout/Button";
import Grid from "~/components/layout/Grid";
import GridItem from "~/components/layout/GridItem";
import Hairline from "~/components/layout/Hairline";
import Img from "~/components/layout/Image";
import logo from "~/routes/signup/assets/logo.svg";
import EmptyHeader from "./EmptyHeader";
import SubtitleSection from "./SubtitleSection";
import TitleSection from "./TitleSection";

interface Props extends WithStyles<typeof styles> {
  readonly leftMenu: () => JSX.Element;

  readonly onSubmit: (values: object) => void;
  readonly formRender: () => JSX.Element;
  readonly validation?: (values: object) => object | Promise<object>;

  readonly primaryTitle: string;
  readonly secondaryTitle: string;
  readonly subtitle: string;

  readonly renderHeader?: () => JSX.Element;
}

const ref = React.createRef<GridItem>();

const styles = createStyles({
  logo: {
    bottom: "80px",
    position: "relative",
    display: "flex",
    margin: "0 auto",
  },
});

const Layout = ({
  classes,
  formRender,
  onSubmit,
  primaryTitle,
  secondaryTitle,
  subtitle,
  renderHeader,
  leftMenu,
  validation,
}: Props): JSX.Element => (
  <Grid>
    <GridItem xs={0} sm={4} ref={ref} maxwidth="sm">
      <Block overlap>
        {leftMenu()}
        <Img src={logo} alt="Logo" className={classes.logo} />
      </Block>
    </GridItem>
    <GridItem xs={12} sm={8} growSm={4} growElem={ref} variant="column">
      <Form onSubmit={onSubmit} validation={validation} grow>
        {({ valid, submitting, validating }: FormState) => (
          <React.Fragment>
            <Block scroll grow>
              <Block offsetSm={2}>
                {renderHeader ? renderHeader() : <EmptyHeader />}
                <TitleSection primaryTitle={primaryTitle} secondaryTitle={secondaryTitle} />
                <SubtitleSection text={subtitle} />
                {formRender()}
              </Block>
            </Block>
            <Hairline />
            <Block margin="md" />
            <Grid nowrap noshrink nogrow>
              <GridItem xs={12} sm={12} grow center="xs" end="xs">
                <Block margin="md" offsetSm={2} padding="xxl">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={!valid || submitting || validating}
                    size="large"
                  >
                    {"Continue\u00a0"}
                    <ArrowForwardIcon fontSize="small" />
                  </Button>
                </Block>
              </GridItem>
            </Grid>
          </React.Fragment>
        )}
      </Form>
    </GridItem>
  </Grid>
);

export default withStyles(styles)(Layout);
