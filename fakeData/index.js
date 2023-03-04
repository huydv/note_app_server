export default {
  authors: [
    {
      id: "1",
      name: "Author 1",
    },
    {
      id: "2",
      name: "Author 2",
    },
  ],
  folders: [
    {
      id: "1",
      name: "Folder 1",
      createdAt: "2023-02-01T05:20:40Z",
      authorId: "1",
    },
    {
      id: "2",
      name: "Folder 2",
      createdAt: "2023-02-01T05:20:40Z",
      authorId: "2",
    },
  ],
  notes: [
    {
      id: "123",
      content: "Go to super market",
      folderId: "1",
    },
    {
      id: "333",
      content: "Buy food",
      folderId: "1",
    },
    {
      id: "456",
      content: "Learn abc",
      folderId: "2",
    },
  ],
};
