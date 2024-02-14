import { collection, getDocs } from "@firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
import { db } from "../../Firebase/config";

const fetchUsers = createAsyncThunk("users/fetch", async () => {
  // const response = await axios.get("http://localhost:3005/users");

  const querySnapshot = await getDocs(collection(db, "Users"));
  const users = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  // DEV ONLY!!!
  await pause(1000);

  // return response.data;
  return users;
});

// DEV ONLY!!!
const pause = (duration) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

export { fetchUsers };
