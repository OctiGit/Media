import {
  createApi,
  fakeBaseQuery,
  // fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "@firebase/firestore";
import { db } from "../../Firebase/config";

// DEV ONLY!!!
// const pause = (duration) => {
//   return new Promise((resolve) => setTimeout(resolve, duration));
// };

const albumsApi = createApi({
  reducerPath: "albums",
  // baseQuery: fetchBaseQuery({
  //   baseUrl: "http://localhost:3005",
  //   fetchFn: async (...args) => {
  //     // REMOVE FOR PRODUCTION
  //     await pause(1000);
  //     return fetch(...args);
  //   },
  // }),
  baseQuery: fakeBaseQuery(),
  endpoints(builder) {
    return {
      fetchAlbums: builder.query({
        // query: (user) => {
        //   return {
        //     url: "/albums",
        //     params: {
        //       userId: user.id,
        //     },
        //     method: "GET",
        //   };
        // },
        async queryFn(user) {
          try {
            const querySnapshot = await getDocs(collection(db, "Albums"));
            const albums = querySnapshot.docs
              .map((doc) => ({
                ...doc.data(),
                id: doc.id,
              }))
              .filter((album) => album.userId === user.id);
            return { data: albums };
          } catch (err) {
            return { error: err };
          }
        },
        providesTags: (result, error, user) => {
          const tags = result.map((album) => {
            return { type: "Album", id: album.id };
          });
          tags.push({ type: "UsersAlbums", id: user.id });
          return tags;
        },
      }),
      addAlbum: builder.mutation({
        // query: (user) => {
        //   return {
        //     url: "/albums",
        //     method: "POST",
        //     body: {
        //       userId: user.id,
        //       title: faker.commerce.productName(),
        //     },
        //   };
        // },
        async queryFn(user) {
          try {
            const album = {
              userId: user.id,
              title: faker.commerce.productName(),
            };
            const albumRef = await addDoc(collection(db, "Albums"), album);
            return { ...album, id: albumRef.id };
          } catch (err) {
            return { error: err };
          }
        },
        invalidatesTags: (result, error, user) => {
          return [{ type: "UsersAlbums", id: user.id }];
        },
      }),
      removeAlbum: builder.mutation({
        // query: (album) => {
        //   return {
        //     url: `albums/${album.id}`,
        //     method: "DELETE",
        //   };
        // },
        async queryFn(album) {
          try {
            await deleteDoc(doc(db, "Albums", album.id));
            return { data: "album removed successfully" };
          } catch (err) {
            return { error: err };
          }
        },
        invalidatesTags: (result, error, album) => {
          return [{ type: "Album", id: album.id }];
        },
      }),
    };
  },
});

export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApi;
export { albumsApi };
