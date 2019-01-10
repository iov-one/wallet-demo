import * as React from "react";
import { connect } from "react-redux";
import Grid from "~/components/layout/Grid";
import selectors, { SelectorProps } from "../container/selector";
import PhraseWord from "./PhraseWord";
import ProfileNotFound from "./ProfileNotFound";

const RecoveryWords = ({ mnemonic }: SelectorProps) => (
  <React.Fragment>
    <Grid>
      {mnemonic ? (
        mnemonic.split(" ").map((word: string) => <PhraseWord key={word} word={word} />)
      ) : (
        <ProfileNotFound />
      )}
    </Grid>
  </React.Fragment>
);

const RecoveryWordsConnected = connect(selectors)(RecoveryWords);

export default () => <RecoveryWordsConnected />;
