import * as Sentry from "@sentry/browser";
import * as React from "react";

export const SentryWidget = () => {
  Sentry.showReportDialog();

  return <React.Fragment />;
};
