const useNode = () => {

    const getTopNode = function (tree) {
        return tree;
    }

    const insertNode = function (tree, menuListId, item) {
      if (tree.id === menuListId) {
        tree.menuList.push({
          id: new Date().getTime(),
          buttonName: item,
          menuList: [],
        });
        return tree;
      }
  
      let latestNode = [];
      latestNode = tree.menuList.map((ob) => {
        return insertNode(ob, menuListId, item);
      });
  
      return { ...tree, menuList: latestNode };
    };
  
    const editNode = (tree, menuListId, value) => {
      if (tree.id === menuListId) {
        tree.buttonName = value;
        return tree;
      }
  
      tree.menuList.map((ob) => {
        return editNode(ob, menuListId, value);
      });
  
      return { ...tree };
    };
  
    const deleteNode = (tree, id) => {
      for (let i = 0; i < tree.menuList.length; i++) {
        const currentItem = tree.menuList[i];
        if (currentItem.id === id) {
          tree.menuList.splice(i, 1);
          return tree;
        } else {
          deleteNode(currentItem, id);
        }
      }
      return tree;
    };
  
    return { insertNode, editNode, deleteNode, getTopNode };
  };
  
  export default useNode;