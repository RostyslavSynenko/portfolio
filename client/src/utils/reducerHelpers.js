export const updateItem = (projects, id, updatedPost) => {
  const idx = projects.findIndex(
    project => project._id === id
  );

  const newArray = [
    ...projects.slice(0, idx),
    updatedPost,
    ...projects.slice(idx + 1)
  ];

  return newArray;
};

export const deleteItem = (projects, id) => {
  const idx = projects.findIndex(
    project => project._id === id
  );

  const newArray = [
    ...projects.slice(0, idx),
    ...projects.slice(idx + 1)
  ];

  return newArray;
};
