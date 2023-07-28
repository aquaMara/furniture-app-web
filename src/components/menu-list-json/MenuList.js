import React, { useState, useRef, useEffect } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { Action } from './Action';

export const MenuList = ({ menuList, handleInsertNode, handleEditNode, handleDeleteNode, handleGetTopNode }) => {

  const [buttonName, setButtonName] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [expand, setExpand] = useState(false);
  const buttonNameRef = useRef(null);

  useEffect(() => {
    buttonNameRef?.current?.focus();
  }, [editMode]);

  const handleNewMenuList = () => {
    setExpand(true);
    setShowInput(true);
  };

  const onAddMenuList = () => {
    if (editMode) {
      handleEditNode(menuList.id, buttonNameRef?.current?.innerText);
    } else {
      setExpand(true);
      handleInsertNode(menuList.id, buttonName);
      setShowInput(false);
      setButtonName("");
    }

    if (editMode) setEditMode(false);
  };

  const handleDelete = () => {
    handleDeleteNode(menuList.id);
  };

  const showMenuList = () => {
    handleGetTopNode();
  }

  return (
    <div>
      <div className={menuList.id === 1 ? "inputContainer" : "menuListContainer"}>
        {menuList.id === 1 ? (
          <>
            <TextField id="standard-basic" variant="standard" className='json-input'
              name='buttonName' label='Введите buttonName' required={true}
              onChange={(e) => setButtonName(e.target.value)} value={buttonName} />
            <Action
              className="reply menuList"
              type='Добавить MenuList'
              handleClick={onAddMenuList}
            />
          </>
        ) : (
          <>
            <span
              contentEditable={editMode}
              suppressContentEditableWarning={editMode}
              ref={buttonNameRef}
              style={{ wordWrap: "break-word" }}
            >
              {menuList.buttonName}
            </span>

            <div style={{ display: "flex", marginTop: "5px" }}>
              {editMode ? (
                <>
                  <Action
                    className="reply"
                    type='Сохранить'
                    handleClick={onAddMenuList}
                  />
                  <Action
                    className="reply"
                    type="Отмена"
                    handleClick={() => {
                      if (buttonNameRef.current)
                        buttonNameRef.current.innerText = menuList.buttonName;
                      setEditMode(false);
                    }}
                  />
                  <Action
                    className="reply"
                    type="Удалить"
                    handleClick={handleDelete}
                  />
                </>
              ) : (
                <>
                  <Action
                    className="reply"
                    type='Добавить'
                    handleClick={handleNewMenuList}
                  />
                  <Action
                    className="reply"
                    type="Изменить"
                    handleClick={() => {
                      setEditMode(true);
                    }}
                  />
                </>
              )}
            </div>
          </>
        )}
      </div>

      <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
        {showInput && (
          <div className="inputContainer">
            <TextField id="standard-basic" variant="standard" className='json-input'
              name='buttonName' label='Введите buttonName' required={true}
              onChange={(e) => setButtonName(e.target.value)} value={buttonName} />
            <Action className="reply" type="Добавить" handleClick={onAddMenuList} />
            <Action
              className="reply"
              type="Отмена"
              handleClick={() => {
                setShowInput(false);
                if (!menuList?.menuList?.length) setExpand(false);
              }}
            />
          </div>
        )}

        {menuList?.menuList?.map((cmnt) => {
          return (
            <MenuList
              key={cmnt.id}
              handleInsertNode={handleInsertNode}
              handleEditNode={handleEditNode}
              handleDeleteNode={handleDeleteNode}
              menuList={cmnt}
            />
          );
        })}
      </div>
    </div>
  )
}
