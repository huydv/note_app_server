// A map of functions which return data for the schema.

import fakeData from "../fakeData/index.js";
import { AuthorModel, FolderModel } from "../models/index.js";
export const resolvers = {
  Query: {
    folders: async (req, res, context) => {
      const folders = await FolderModel.find({
        authorId: context.uid,
      });
      return folders;
      //return fakeData.folders;
    },
    folder: async (parent, args) => {
      const folderId = args.folderId;
      const folder = await FolderModel.findOne({ _id: folderId });
      return folder;
      // return fakeData.folders.find((folder) => folder.id === folderId);
    },
    note: async (parent, args) => {
      const noteId = args.noteId;
      const note = await NoteModel.findOne({ _id: noteId });
      return note;
      // return fakeData.notes.find((note) => note.id === noteId);
    },
  },

  Folder: {
    author: (parent, args) => {
      const authorId = parent.authorId;
      return fakeData.authors.find((author) => author.id === authorId);
    },
    notes: (parent, args) => {
      return fakeData.notes.filter((note) => note.folderId === parent.id);
    },
  },
  Mutation: {
    addFolder: async (parent, args, context) => {
      const newFolder = new FolderModel({ ...args, authorId: context.uid });
      await newFolder.save();
      return newFolder;
    },
    register: async (parent, args) => {
      const newAuthor = new AuthorModel(args);
      const findAuthor = AuthorModel.findOne({ uid: args.uid });
      if (!findAuthor) {
        await newAuthor.save();
        return newAuthor;
      }
      return findAuthor;
    },
  },
};
