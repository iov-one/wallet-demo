import { BcpConnection } from "@iov/bcp-types";
import * as React from "react";
import PageColumn from "~/components/pages/PageColumn";
import ExplanationMenuComponent from "./ExplanationMenu";
import FormComponent from "./FormComponent";

const ExplanationMenu = () => <ExplanationMenuComponent />;

interface Props {
  readonly onSubmit: (values: object) => void;
  readonly onBack: () => void;
  readonly connection: BcpConnection;
}

const CreateUsername = ({ connection, onSubmit, onBack }: Props) => (
  <PageColumn
    icon="black"
    leftMenu={ExplanationMenu}
    onSubmit={onSubmit}
    onBack={onBack}
    primaryTitle="Create"
    secondaryTitle="your unique IOV username"
    subtitle="Share your username with anyone to recieve payments. It’s simple and secure."
    formRender={() => <FormComponent connection={connection} />}
    nextMsg="Continue"
  />
);

export default CreateUsername;
