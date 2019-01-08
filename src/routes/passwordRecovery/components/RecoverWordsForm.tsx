import * as React from "react";
import Grid from "~/components/layout/Grid";
import { WordField } from "./WordField";

export const WORD_NUM = "word_num_";

const GenerateFields = (start: number, count: number): ReadonlyArray<JSX.Element> => {
  // tslint:disable-next-line:readonly-array
  const elements: JSX.Element[] = [];
  for (let i = start; i <= start + count; i++) {
    const fieldName = WORD_NUM + i;
    elements.push(<WordField key={fieldName} title={`${i}th word`} fieldName={fieldName} />);
  }

  return elements;
};

export default () => (
  <React.Fragment>
    <Grid>
      <WordField title="1st word" fieldName={WORD_NUM + "1"} />
      <WordField title="2nd word" fieldName={WORD_NUM + "2"} />
      <WordField title="3rd word" fieldName={WORD_NUM + "3"} />
      {GenerateFields(4, 8)}
    </Grid>
  </React.Fragment>
);
