import * as React from "react";
import Form from "~/components/forms/Form";
import { Item } from "~/components/forms/SelectField";
import Hairline from "~/components/layout/Hairline";
import DesktopTransactionsTable from "./desktop/TransactionsTable";
import PhoneTransactionsTable from "./phone/TransactionsTable";
import ToolBox from "./ToolBox";

interface Props {
  readonly phone: boolean;
}

export default class Layout extends React.Component<Props> {

  public readonly onChangeRows = (item: Item) => {
    console.log(item);
    this.setState({
      rowsPerPage: Number(item.name),
    });
  };

  // tslint:disable-next-line:no-empty
  public readonly onSubmit = async (_: object) => { };
  public render(): JSX.Element {
    const {
      phone
    } = this.props;

    return (
      <React.Fragment>
        <Hairline />
        <ToolBox phone={phone} />
        <Hairline />
        <Form onSubmit={this.onSubmit}>
          {() => (
            <React.Fragment>
              {phone ? 
                <PhoneTransactionsTable onChangeRows={this.onChangeRows} />
                :
                <DesktopTransactionsTable onChangeRows={this.onChangeRows} />
              }
            </React.Fragment>
          )}
        </Form>
      </React.Fragment>
    )
  }
}
