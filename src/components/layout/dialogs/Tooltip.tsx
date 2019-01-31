import { createStyles, Popper, WithStyles, withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import * as React from "react";
import ReactDOM from "react-dom";
import { OpenHandler, openHoc, OpenType } from "~/components/hoc/OpenHoc";
import Block from "~/components/layout/Block";
import Img from "~/components/layout/Image";
import Typography from "~/components/layout/Typography";
import { MatchMediaContext } from "~/context/MatchMediaContext";
import { border, itemBackground, md, shadow, sm, xs } from "~/theme/variables";
import infoNormal from "./assets/info_normal.svg";

const styles = createStyles({
  paper: {
    padding: md,
    boxShadow: shadow, //`0 ${xs} ${md} 0 #e3e4e7`,
  },
  phone: {
    border: `1px solid ${border}`,
    borderRadius: xs,
    backgroundColor: itemBackground,
    padding: md,
  },
});

interface Outer extends WithStyles<typeof styles> {
  readonly phoneHook: HTMLDivElement | null;
  readonly children: React.ReactNode;
}

type Props = OpenType & OpenHandler & Outer;

class Tooltip extends React.PureComponent<Props> {
  private readonly tooltipRef = React.createRef<HTMLDivElement>();

  public render(): JSX.Element {
    const { toggle, open, children, classes, phoneHook } = this.props;

    const popperStyle = {
      marginTop: sm,
      maxWidth: 200,
    };

    return (
      <MatchMediaContext.Consumer>
        {phone => {
          const showPhone = phone && phoneHook !== null && open;

          return (
            <React.Fragment>
              <div ref={this.tooltipRef} onClick={toggle}>
                <Img src={infoNormal} alt="Info" width={16} height={16} />
              </div>
              {showPhone ? (
                ReactDOM.createPortal(
                  <Block className={classes.phone}>
                    <Typography variant="body2">{children}</Typography>
                  </Block>,
                  phoneHook!,
                )
              ) : (
                <Popper
                  open={open}
                  style={popperStyle}
                  anchorEl={this.tooltipRef.current}
                  placement="bottom-end"
                  modifiers={{
                    flip: {
                      enabled: true,
                    },
                  }}
                >
                  <Paper className={classes.paper}>
                    <Typography variant="body2">{children}</Typography>
                  </Paper>
                </Popper>
              )}
            </React.Fragment>
          );
        }}
      </MatchMediaContext.Consumer>
    );
  }
}

export default withStyles(styles)(openHoc<Outer>(Tooltip));
