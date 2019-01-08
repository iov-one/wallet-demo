import * as React from "react";
import Field from "~/components/forms/Field";
import TextField from "~/components/forms/TextField";
import { required } from "~/components/forms/validator";
import Block from "~/components/layout/Block";
import GridItem from "~/components/layout/GridItem";
import Typography from "~/components/layout/Typography";

interface Props {
  readonly title: string;
  readonly fieldName: string;
}

export const WordField = ({ title, fieldName }: Props) => (
  <GridItem xs={6} lg={4}>
    <Block padding="xxl" margin="xxl">
      <Block margin="sm">
        <Typography variant="subtitle2" color="textPrimary">
          {title}
        </Typography>
      </Block>
      <Field
        variant="outlined"
        name={fieldName}
        fullWidth
        component={TextField}
        validate={required}
        placeholder={title}
      />
    </Block>
  </GridItem>
);
