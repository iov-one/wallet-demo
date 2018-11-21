import * as React from 'react'
import { PageStructure } from '~/components/compoundComponents/page';

type Props = {

}

type State = {
  readonly page: number,
}

class SignUp extends React.Component<Props, State> {
  public readonly state={
    page: 0,
  }

  public render(): JSX.Element {
    return (
      <PageStructure whiteBg>
        <div>
          Hello world
        </div>
      </PageStructure>
    );
  }
}

export default SignUp
