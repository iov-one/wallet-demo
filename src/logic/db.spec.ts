// tslint:disable:no-unused-expression
import { expect } from 'chai';
import 'mocha';

import { createMemDb, hasDbKey } from "./db";

describe("createMemDb", () => {
    const demoKey = "demo";

    it("returns an empty db", async () => {
        const db = createMemDb();
        expect(await hasDbKey(db, demoKey)).to.be.false;
    });

    it("returns a fresh copy each time", async () => {
        const db = createMemDb();
        db.put(demoKey, "foo");

        const db2 = createMemDb();

        expect(await hasDbKey(db, demoKey)).to.be.true;
        expect(await hasDbKey(db2, demoKey)).to.be.false;
    });
});

describe("hasDbKey", () => {
    const demoKey = "dbKey";

    it("returns if key is present", async () => {
        const db = createMemDb();
        expect(await hasDbKey(db, demoKey)).to.be.false;
        db.put(demoKey, "foo");
        expect(await hasDbKey(db, demoKey)).to.be.true;
    });
});
