import * as React from "react";
import { connect } from "react-redux";
import Block from "~/components/layout/Block";
import Grid from "~/components/layout/Grid";
import { MatchMediaContext } from "~/context/MatchMediaContext";
import selectors, { SelectorProps } from "../container/selector";
import PhraseWord from "./PhraseWord";
import ProfileNotFound from "./ProfileNotFound";

const RecoveryWords = ({ mnemonic }: SelectorProps) => {
  const words = mnemonic ? mnemonic.split(" ") : undefined;

  return (
    <MatchMediaContext.Consumer>
      {phone => (
        <Block padding={phone ? "xs" : "md"} margin="lg">
          <Grid>
            {words ? words.map((word: string) => <PhraseWord key={word} word={word} />) : <ProfileNotFound />}
          </Grid>
        </Block>
      )}
    </MatchMediaContext.Consumer>
  );
};

const RecoveryWordsConnected = connect(selectors)(RecoveryWords);

export default () => <RecoveryWordsConnected />;
