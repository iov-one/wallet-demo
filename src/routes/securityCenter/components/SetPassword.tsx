import React from "react";
import Field from "~/components/forms/Field";
import { FormType } from "~/components/forms/Form";
import TextField from "~/components/forms/TextField";
import { required } from "~/components/forms/validator";
import { OpenHandler, openHoc, OpenType } from "~/components/hoc/OpenHoc";
import Block from "~/components/layout/Block";
import { Prompt } from "~/components/layout/dialogs";
import Typography from "~/components/layout/Typography";
import PswIcon from "../assets/password.svg";
import SecurityCard from "./ItemCard";

export const CURRENT_PASSWORD = "currentPassword";
export const NEW_PASSWORD = "newPassword";
export const CONFIRM_PASSWORD = "confirmPassword";

interface OuterProps {
  readonly validation: (values: FormType) => object | Promise<object>;
  readonly onSubmit: (values: FormType) => Promise<boolean>;
}

type Props = OpenType & OpenHandler & OuterProps;

const SetPassword = ({ open, toggle, onSubmit, validation }: Props): JSX.Element => (
  <React.Fragment>
    <SecurityCard title="Set a password" action="Change" onClick={toggle} icon={PswIcon} />

    <Prompt showDialog={open} onClose={toggle} onSubmit={onSubmit} validation={validation}>
      <React.Fragment>
        <Typography variant="h4" color="textPrimary">
          Change your password
        </Typography>
        <Block margin="xl" />
        <Block margin="sm">
          <Typography variant="subtitle2" color="textPrimary">
            Current password
          </Typography>
        </Block>
        <Field
          variant="outlined"
          name={CURRENT_PASSWORD}
          type="password"
          fullWidth
          component={TextField}
          validate={required}
          placeholder="Current password"
        />
        <Block margin="lg" />
        <Block margin="sm">
          <Typography variant="subtitle2" color="textPrimary">
            New password
          </Typography>
        </Block>
        <Field
          variant="outlined"
          name={NEW_PASSWORD}
          type="password"
          fullWidth
          component={TextField}
          validate={required}
          placeholder="New password"
        />
        <Block margin="lg" />
        <Block margin="sm">
          <Typography variant="subtitle2" color="textPrimary">
            Confirm password
          </Typography>
        </Block>
        <Field
          variant="outlined"
          name={CONFIRM_PASSWORD}
          type="password"
          fullWidth
          component={TextField}
          validate={required}
          placeholder="Confirm password"
        />
      </React.Fragment>
    </Prompt>
  </React.Fragment>
);

export default openHoc<OuterProps>(SetPassword);
