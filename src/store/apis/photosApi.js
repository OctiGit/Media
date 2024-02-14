import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "@firebase/firestore";
import { db } from "../../Firebase/config";

const photosApi = createApi({
  reducerPath: "photos",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
  }),
  endpoints(builder) {
    return {
      fetchPhotos: builder.query({
        // query: (album) => {
        //   return {
        //     method: "GET",
        //     url: "/photos",
        //     params: {
        //       albumId: album.id,
        //     },
        //   };
        // },
        async queryFn(album) {
          try {
            const querySnapshot = await getDocs(collection(db, "Photos"));
            const photos = querySnapshot.docs
              .map((doc) => ({
                ...doc.data(),
                id: doc.id,
              }))
              .filter((photo) => photo.albumId === album.id);
            return { data: photos };
          } catch (err) {
            return { error: err };
          }
        },
        providesTags: (result, error, album) => {
          const tags = result.map((photo) => {
            return { type: "Photo", id: photo.id };
          });
          tags.push({ type: "AlbumPhoto", id: album.id });
          return tags;
        },
      }),
      addPhoto: builder.mutation({
        // query: (album) => {
        //   return {
        //     method: "POST",
        //     url: "/photos",
        //     body: {
        //       url: faker.image.abstract(150, 150, true),
        //       albumId: album.id,
        //     },
        //   };
        // },
        async queryFn(album) {
          try {
            const photo = {
              url: faker.image.abstract(150, 150, true),
              albumId: album.id,
            };
            const photoRef = await addDoc(collection(db, "Photos"), photo);
            return { ...photo, id: photoRef.id };
          } catch (err) {
            return { error: err };
          }
        },
        invalidatesTags: (result, error, album) => {
          return [{ type: "AlbumPhoto", id: album.id }];
        },
      }),
      removePhoto: builder.mutation({
        // query: (photo) => {
        //   return {
        //     method: "DELETE",
        //     url: `/photos/${photo.id}`,
        //   };
        // },
        async queryFn(photo) {
          try {
            await deleteDoc(doc(db, "Photos", photo.id));
            return { data: "photo removed successfully" };
          } catch (err) {
            return { error: err };
          }
        },
        invalidatesTags: (result, error, photo) => {
          return [{ type: "Photo", id: photo.id }];
        },
      }),
    };
  },
});

export const {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useRemovePhotoMutation,
} = photosApi;
export { photosApi };
