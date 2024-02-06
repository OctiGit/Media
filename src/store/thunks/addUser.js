import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
import { faker } from "@faker-js/faker";
import { addDoc, collection } from "@firebase/firestore";
import db from "../../Firebase/config";

const addUser = createAsyncThunk("users/add", async () => {
  // const response = await axios.post("http://localhost:3005/users", {
  // const response = await axios.post(
  //   "https://my-json-server.typicode.com/OctiGit/Media/users",
  //   {
  //     name: faker.person.fullName(),
  //   }
  // );
  const user = { name: faker.person.fullName() };
  const addUserRef = await addDoc(collection(db, "Users"), user);
  const newUser = { ...user, id: addUserRef.id };

  // return response.data;
  return newUser;
});

export { addUser };
