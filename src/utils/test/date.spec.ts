import { getDate, getTime } from "../date";

describe("Utils -> Date", () => {
  describe("getTime", () => {
    it("should return time string in ampm format from Date object", () => {
      const currentDate = new Date(Date.now());
      currentDate.setHours(5);
      currentDate.setMinutes(13);
      let time = getTime(currentDate);
      expect(time).toBe("5:13 am");

      currentDate.setHours(13);
      currentDate.setMinutes(6);
      time = getTime(currentDate);
      expect(time).toBe("1:06 pm");

      currentDate.setHours(12);
      currentDate.setMinutes(37);
      time = getTime(currentDate);
      expect(time).toBe("12:37 pm");
    });
  });

  describe("getDate", () => {
    it("should return formatted date", () => {
      const currentDate = new Date(Date.now());
      currentDate.setDate(5);
      currentDate.setMonth(10);
      currentDate.setFullYear(2018);
      let date = getDate(currentDate);
      expect(date).toBe("5 Nov 2018");

      currentDate.setDate(10);
      currentDate.setMonth(0);
      currentDate.setFullYear(2017);
      date = getDate(currentDate);
      expect(date).toBe("10 Jan 2017");

      //Bevare of order
      currentDate.setFullYear(2017);
      currentDate.setDate(10);
      currentDate.setMonth(12);
      date = getDate(currentDate);
      expect(date).toBe("10 Jan 2018");

      //Bevare of order
      currentDate.setMonth(0);
      currentDate.setDate(32);
      currentDate.setFullYear(2017);
      date = getDate(currentDate);
      expect(date).toBe("1 Feb 2017");
    });
  });
});
