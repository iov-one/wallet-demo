import * as React from "react";
import Block from "~/components/layout/Block";
import Grid from "~/components/layout/Grid";
import { MatchMediaContext } from "~/context/MatchMediaContext";
import PhraseWord from "./PhraseWord";
import ProfileNotFound from "./ProfileNotFound";

interface Props {
  readonly mnemonic: string | undefined;
}

export const RecoveryWords = ({ mnemonic }: Props) => {
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
