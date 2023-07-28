import React, { useState } from 'react'
import useNode from '../../hooks/useNode'
import { MenuList } from './MenuList'

const menuList2 = {
  id: 1,
  menuList: [
    {
      id: 122,
      buttonName: 'Эко-кожа',
      menuList: []
    },
    {
      id: 123,
      buttonName: 'Ткань',
      menuList: [
        {
          id: 124,
          buttonName: 'Бим текст',
          menuList: [
            {
              id: 125,
              buttonName: 'Germes',
              menuList: [
                {
                  id: 126,
                  buttonName: 'Germes1',
                  menuList: []
                }
              ]
            },
            {
              id: 127,
              buttonName: 'Lamborghini',
              menuList: []
            },
            {
              id: 128,
              buttonName: 'Omega',
              menuList: []
            },
            {
              id: 129,
              buttonName: 'Brabus',
              menuList: []
            }
          ]
        }
      ]
    }
  ]
}

const menuList = {
  id: 1,
  menuList: []
}

export const MenuListJson = () => {

  const [menuListData, setMenuListData] = useState(menuList);

  const { insertNode, editNode, deleteNode, getTopNode } = useNode();

  const handleGetTopNode = () => {
    const structure = getTopNode(menuListData);
    console.log(JSON.stringify(structure));
  }

  const handleInsertNode = (folderId, item) => {
    console.log('hello', menuListData, folderId, item, JSON.stringify(menuListData));
    const finalStructure = insertNode(menuListData, folderId, item);
    setMenuListData(finalStructure);
  }

  const handleEditNode = (folderId, value) => {
    const finalStructure = editNode(menuListData, folderId, value);
    setMenuListData(finalStructure);
  }

  const handleDeleteNode = (folderId) => {
    console.log('del')
    const finalStructure = deleteNode(menuListData, folderId);
    const temp = { ... finalStructure };
    setMenuListData(temp);
  }

  return (
    <div>
      <MenuList menuList={menuListData}
        handleGetTopNode={handleGetTopNode}
        handleInsertNode={handleInsertNode}
        handleEditNode={handleEditNode}
        handleDeleteNode={handleDeleteNode} />
    </div>
  )
}
