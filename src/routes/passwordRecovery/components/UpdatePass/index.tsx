import * as React from "react";
import PageColumn from "~/components/pages/PageColumn";
import StepsCount from "../StepsCount";
import ReadyMsg from "./ReadyMsg";
import { UpdatePassForm } from "./UpdatePassForm";

const StepsSection = () => <StepsCount stepNum={2} />;

const ReadyMsgSection = () => <ReadyMsg />;

interface Props {
  readonly validation: (values: any) => object | Promise<object>;
  readonly onSubmit: (values: any) => void;
}

export const UpdatePass = ({ validation, onSubmit }: Props): JSX.Element => (
  <PageColumn
    icon="black"
    leftMenu={ReadyMsgSection}
    onSubmit={onSubmit}
    primaryTitle="Set up"
    secondaryTitle="a new password"
    subtitle="Set up a new password for your wallet."
    renderHeader={StepsSection}
    formRender={UpdatePassForm}
    nextMsg="Continue"
    validation={validation}
  />
);
