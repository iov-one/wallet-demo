import * as React from "react";
import Field from "~/components/forms/Field";
import TextField from "~/components/forms/TextField";
import { required } from "~/components/forms/validator";
import Block from "~/components/layout/Block";
import Grid from "~/components/layout/Grid";
import GridItem from "~/components/layout/GridItem";
import Typography from "~/components/layout/Typography";

export const WORD_NUM = "word_num_";

const titleFor = (pos: number) =>
  pos === 0 ? "1st word" : pos === 1 ? "2nd word" : pos === 2 ? "3rd word" : `${pos+1}th word`;


export default () => (
  <React.Fragment>
    <Grid>
    {[...Array(12)].map((_: number, idx: number) => {
        const title = titleFor(idx);
        const fieldName = WORD_NUM + idx;

        return (
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
      })}
    </Grid>
  </React.Fragment>
);
