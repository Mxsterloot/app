import Elysia from "elysia";

export const userRoutes = new Elysia().get("/api/users", () => {
  return [
    {
      name: "John Doe",
      email: "johndoe@example.com",
      age: 25,
    },
    {
      name: "John Doe",
      email: "johndoe@example.com",
      age: 25,
    },
    {
      name: "John Doe",
      email: "johndoe@example.com",
      age: 25,
    },
    {
      name: "John Doe",
      email: "johndoe@example.com",
      age: 25,
    },
    {
      name: "John Doe",
      email: "johndoe@example.com",
      age: 25,
    },
    {
      name: "John Doe",
      email: "johndoe@example.com",
      age: 25,
    },
  ];
});
