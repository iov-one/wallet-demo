import { createStyles, Popper, WithStyles, withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import * as React from "react";
import ReactDOM from "react-dom";
import { OpenHandler, openHoc, OpenType } from "~/components/hoc/OpenHoc";
import Block from "~/components/layout/Block";
import Img from "~/components/layout/Image";
import { MatchMediaContext } from "~/context/MatchMediaContext";
import { border, itemBackground, md, shadowColor, sm, xs } from "~/theme/variables";
import { showPhone } from "~/utils/reactportals";
import infoNormal from "./assets/info_normal.svg";

const styles = createStyles({
  paper: {
    padding: md,
    boxShadow: `0 ${xs} ${md} 0 ${shadowColor}`,
  },
  phone: {
    border: `1px solid ${border}`,
    borderRadius: xs,
    backgroundColor: itemBackground,
    padding: md,
    marginTop: sm,
  },
});

interface Outer extends WithStyles<typeof styles> {
  readonly phoneHook: HTMLDivElement | null;
  readonly children: React.ReactNode;
  readonly maxWidth?: number;
}

type Props = OpenType & OpenHandler & Outer;

const DEFAULT_HEIGHT = 16;

class Tooltip extends React.PureComponent<Props> {
  private readonly tooltipRef = React.createRef<HTMLDivElement>();

  public render(): JSX.Element {
    const { toggle, open, children, classes, phoneHook, maxWidth = 200 } = this.props;

    const popperStyle = {
      marginTop: sm,
      maxWidth,
    };

    const popperModifiers = {
      flip: {
        enabled: true,
      },
    };

    const divStyle = {
      height: `${DEFAULT_HEIGHT}px`,
    };

    return (
      <MatchMediaContext.Consumer>
        {phone => {
          return (
            <React.Fragment>
              <div style={divStyle} ref={this.tooltipRef} onClick={toggle}>
                <Img src={infoNormal} alt="Info" width={DEFAULT_HEIGHT} height={DEFAULT_HEIGHT} />
              </div>
              {showPhone(phone, phoneHook, open) ? (
                ReactDOM.createPortal(<Block className={classes.phone}>{children}</Block>, phoneHook!)
              ) : (
                <Popper
                  open={open}
                  style={popperStyle}
                  anchorEl={this.tooltipRef.current}
                  placement="bottom-end"
                  modifiers={popperModifiers}
                >
                  <Paper className={classes.paper}>{children}</Paper>
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
