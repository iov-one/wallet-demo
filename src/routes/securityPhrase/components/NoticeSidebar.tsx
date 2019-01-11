import * as React from "react";
import LeftSidebar from "~/components/layout/LeftSidebar";
import Spacer from "~/components/layout/Spacer";

interface Props {
  readonly children: React.ReactNode;
}

const NoticeSidebar = ({ children }: Props) => {
  return (
    <LeftSidebar>
      <Spacer order={1} />
      {children}
      <Spacer order={1} />
    </LeftSidebar>
  );
};

export default NoticeSidebar;
