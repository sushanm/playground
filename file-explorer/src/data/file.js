export const fileStruct = {
  id: 1,
  name: "root",
  isFolder: true,
  items: [
    {
      id: 2,
      name: "Folder 1",
      isFolder: true,
      items: [
        {
          id: 4,
          name: "Folder 3",
          isFolder: true,
          items: [
            {
              id: 5,
              name: "Folder 3",
              isFolder: false,
              items: [],
            },
          ],
        },
      ],
    },
    {
      id: 3,
      name: "Folder 2",
      isFolder: true,
      items: [],
    },
  ],
};
