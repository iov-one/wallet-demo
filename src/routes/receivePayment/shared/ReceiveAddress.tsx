import * as React from "react";
import Block from "~/components/layout/Block";
import Typography from "~/components/layout/Typography";

interface Props {
  readonly sender: string;
  readonly address: string;
}

const ReceiveAddress = ({ sender, address }: Props) => (
  <Block>
    <Typography inline variant="h6" weight="light">
      Receive payment from
    </Typography>
    <Typography inline variant="h6" weight="semibold" color="primary">
      {` ${sender} `}
    </Typography>
    <Typography inline variant="h6" weight="light">
      {`by giving them ${address} address`}
    </Typography>
  </Block>
);

export default ReceiveAddress;
