import * as React from "react";
import ComingSoon from "./ComingSoon";
import PageTitle from "./PageTitle";

export default (): JSX.Element => {
  return (
    <React.Fragment>
      <PageTitle />
      <ComingSoon />
    </React.Fragment>
  );
};
