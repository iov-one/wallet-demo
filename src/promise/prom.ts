import { User } from "./state";

export const sampleUsers: ReadonlyArray<User> = [
  {
    id: "123456",
    name: "John Doe",
    age: 34,
  },
];

// How do I tie that this leads to fetchUsers actions out of the middleware?
export const performFetchUsers = async (): Promise<ReadonlyArray<User>> => {
  return sampleUsers;
};
