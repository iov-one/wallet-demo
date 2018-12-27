import { Badge, createStyles, withStyles, WithStyles } from "@material-ui/core";
import React, { PureComponent } from "react";
import Img from "~/components/layout/Image";
import { xxl } from "~/theme/variables";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement>, WithStyles<typeof styles> {
  readonly icon: string;
  readonly badge: React.ReactElement<HTMLImageElement>;
}

const styles = createStyles({
  background: {
    backgroundColor: '#d6faf4',
    height: xxl,
    width: xxl,
    borderRadius: xxl,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    width: '29px',
    top: '-8px',
    right: '-8px',
  },
});

class BadgeIcon extends PureComponent<Props> {
  public render(): JSX.Element {
    const { icon, badge, classes, ...rest } = this.props;
    const badgeClasses = { badge: classes.badge }

    return (
      <Badge badgeContent={badge} classes={badgeClasses} color="primary">
        <div className={classes.background}>
          <Img src={icon} alt="Icon" {...rest} />
        </div>
      </Badge>
    );
  }
}

export default withStyles(styles)(BadgeIcon);
