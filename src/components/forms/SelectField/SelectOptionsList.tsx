import Popper from "@material-ui/core/Popper";
import * as React from "react";
import ReactDOM from "react-dom";
import { sm } from "~/theme/variables";
import { SelectFieldItem } from "./index";
import SelectItems from "./SelectItems";

export interface SelectOptionsListProps {
  readonly action: (value: SelectFieldItem) => () => void;
  readonly phone: boolean;
  readonly items: ReadonlyArray<SelectFieldItem>;
  readonly align?: "left" | "right";
  readonly showPhone: boolean;
  readonly phoneHook: HTMLDivElement | null;
  readonly open: boolean;
}

interface Props extends SelectOptionsListProps {
  readonly menuRefTarget: HTMLDivElement | null;
}
const SelectOptionsList = ({
  action,
  phone,
  items,
  align = "left",
  showPhone,
  phoneHook,
  open,
  menuRefTarget,
}: Props) => {
  const popperStyle = {
    marginTop: sm,
  };

  return showPhone ? (
    ReactDOM.createPortal(
      <SelectItems align={align} phone={phone} items={items} action={action} />,
      phoneHook!,
    )
  ) : (
    <Popper open={open} style={popperStyle} anchorEl={menuRefTarget} placement="bottom">
      {() => <SelectItems align={align} phone={phone} items={items} action={action} />}
    </Popper>
  );
};

export default SelectOptionsList;
