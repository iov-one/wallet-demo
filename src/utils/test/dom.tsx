import { ConnectedRouter } from "connected-react-router";
import * as React from "react";
import TestUtils from "react-dom/test-utils";
import { Provider } from "react-redux";
import { Store } from "redux";
import MatchMedia from "~/context/MatchMediaContext";
import Route from "~/routes";
import { history } from "~/store";

/** 
 * This is required because it is not possible to test menu items containg Popper component 
 * because of component limitation. We should test it in phone mode.
 */

// tslint:disable-next-line:no-object-mutation
window.matchMedia = jest.fn().mockImplementation(query => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
});

export const createDom = (store: Store): React.Component =>

  TestUtils.renderIntoDocument(
    <Provider store={store}>
      <MatchMedia>
        <ConnectedRouter history={history}>
          <Route />
        </ConnectedRouter>
      </MatchMedia>
    </Provider>,
  ) as React.Component;

export const expectRoute = (store: Store, route: string) => {
  expect(store.getState().router.location.pathname).toBe(route);
};

export const findRenderedDOMComponentWithId = (tree: React.Component<any>, id: string): Element => {
  const elementsWithId = TestUtils.findAllInRenderedTree(tree, (inst: React.ReactInstance) => {
    return TestUtils.isDOMComponent(inst) && inst.id === id;
  });

  if (!elementsWithId || elementsWithId.length === 0) {
    throw new Error(`Element with id "${id}" not found`);
  }

  if (elementsWithId.length > 1) {
    throw new Error(`Too many elements with id "${id}" was found (${elementsWithId.length})`);
  }

  return elementsWithId[0] as Element;
}
