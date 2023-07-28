const useNode = () => {

    const getTopNode = function (tree) {
        return tree;
    }

    const insertNode = function (tree, menuListId, item) {
      if (tree.id === menuListId) {
        console.log('1', tree, menuListId, item)
        tree.menuList.push({
          id: new Date().getTime(),
          buttonName: item,
          menuList: [],
        });

        console.log('11', tree, menuListId, item)
        return tree;
      }
  
      let latestNode = [];
      console.log('2')
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
        console.log('del 2')
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