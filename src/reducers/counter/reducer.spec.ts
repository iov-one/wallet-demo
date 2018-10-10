import { expect } from 'chai';
import 'mocha';

import { incrementCounter } from "./actions";
import { counterReducer } from "./reducer";

describe("counterReducer", () => {
    it("should increment count", () => {
        const initState = 5;
        const state = counterReducer(initState, incrementCounter());
        expect(state).to.equal(initState+1);
    });

    it("should initialize with 1", () => {
        const state = counterReducer(undefined, incrementCounter());
        expect(state).to.equal(1+1);
    });
});

