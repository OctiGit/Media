import { collection, deleteDoc, doc, getDocs } from "@firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
import { db } from "../../Firebase/config";

const removeUser = createAsyncThunk("users/remove", async (user) => {
  // await axios.delete(`http://localhost:3005/users/${user.id}`);
  const users = await getDocs(collection(db, "Users"));
  for (const snap of users.docs) {
    if (snap.id === user.id) {
      await deleteDoc(doc(db, "Users", snap.id));
    }
  }

  // FIX !!!!
  return user;
});

export { removeUser };
