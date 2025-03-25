const useTraverse = () => {
  function addNode(tree, id, name, isFolder) {
    if (tree.id == id && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name,
        isFolder,
        items: [],
      });
      return tree;
    }
    const updatedNode = tree.items.map((item) => {
      return addNode(item, id, name, isFolder);
    });
    return { ...tree, items: updatedNode };
  }
  return { addNode };
};
export default useTraverse;
