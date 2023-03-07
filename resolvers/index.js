// A map of functions which return data for the schema.

// import fakeData from "../fakeData/index.js";
import { GraphQLScalarType } from "graphql";
import { AuthorModel, FolderModel, NoteModel } from "../models/index.js";
export const resolvers = {
  Date: new GraphQLScalarType({
    name: "Date",
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.toISOString();
    },
  }),

  Query: {
    folders: async (req, res, context) => {
      const folders = await FolderModel.find({
        authorId: context.uid,
      }).sort({
        updated: "desc",
      });
      return folders;
      //return fakeData.folders;
    },
    folder: async (parent, args) => {
      const folderId = args.folderId;
      const folder = await FolderModel.findById(folderId);
      return folder;
      // return fakeData.folders.find((folder) => folder.id === folderId);
    },
    note: async (parent, args) => {
      const noteId = args.noteId;
      const note = await NoteModel.findById(noteId);
      return note;
      // return fakeData.notes.find((note) => note.id === noteId);
    },
  },

  Folder: {
    author: async (parent, args) => {
      const authorId = parent.authorId;
      // return fakeData.authors.find((author) => author.id === authorId);
      const author = await AuthorModel.findOne({
        uid: authorId,
      });
      return author;
    },
    notes: async (parent, args) => {
      // return fakeData.notes.filter((note) => note.folderId === parent.id);
      const notes = await NoteModel.find({
        folderId: parent.id,
      }).sort({
        updated: "desc",
      });
      return notes;
    },
  },
  Mutation: {
    addNote: async (parent, args, context) => {
      const newNote = new NoteModel(args);
      await newNote.save();
      return newNote;
    },

    updateNote: async (parent, args, context) => {
      const noteId = args.id;
      const note = NoteModel.findByIdAndUpdate(noteId, args);
      return note;
    },

    addFolder: async (parent, args, context) => {
      console.log(context);
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
