/* eslint-disable no-undef */
// const mongoose = require("mongoose");
// const request = require("supertest");

// const app = require("../../app");
// const {User} = require("../../models/user");

// const DB_HOST_TEST =
//   "mongodb+srv://Anastasiia:JUdewhNGYLnHzRYF@cluster0.ffsyvzp.mongodb.net/db-contacts-test?retryWrites=true&w=majority";

// describe("test login route", () => {
//   let server = null;

//   beforeAll(async () => {
//     await mongoose.connect(DB_HOST_TEST);
//     server = app.listen(3000);
//   })

//   afterAll(async () => {
//     await mongoose.connection.close(DB_HOST_TEST);
//     server.close();
//   })
// })

// test("test correct register data", async () => {
//   const loginData = {
//     password: "123456",
//     email: "test@gmail.com",
//   };
//   const { body, statusCode } = await (
//     await request(app).post("/api/auth/register")
//   ).send(loginData);

//   expect(statusCode).toBe(200);
//   expect(body.password).toBe(loginData.password);
//   expect(body.email).toBe(loginData.email);
// //   expect(body.token).toBe(loginData.token);

//   const user = await User.findOne({email: loginData.email, password: loginData.password})
//   expect(user.email).toBe(loginData.email)
//   expect(user.password).toBe(loginData.password)
// });
