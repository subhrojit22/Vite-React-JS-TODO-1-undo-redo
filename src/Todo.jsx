//rfce
//react functional export component
import React from 'react';
import { useState } from 'react';

function Todo() {
  const [data, setData] = useState('');
  const [listData, setlistData] = useState([]);
  // const [previousTodos, setPreviousTodos] = useState([]);

  // Add a new state variable to store the previous 5 states of the list.
  const [undoStack, setUndoStack] = useState([]);

  // Add a new state variable to store the previous 5 states of the list that have been undone.
  const [redoStack, setRedoStack] = useState([]);

  // Declare the updatedList variable in the same scope as the code where you are trying to use it.
  //let updatedList;

  function addData() {
   // If the data state variable is empty, do not add the data to the list.
   if (data === '') {
     alert("Empty");
    return;
  }
    //method 1
    // setlistData([...listData,data])
    //    console.log(listData)

    //method 2
    setlistData((listData) => {
      const updatedList = [...listData, data];
      console.log('updatedList1:' + updatedList);

      console.log('addData listData:' + listData);
      setUndoStack(listData);

      // Save the previous state of the list to the undo stack.
      setUndoStack([...undoStack, listData]);

      // Limit the size of the undo stack to 5.
      if (undoStack.length > 5) {
        undoStack.shift();
      }
      return updatedList;
    });
    //console.log("updatedList2:"+updatedList)

    //method 3 for preventing double print log
    // Initialize the updatedList variable.
    //updatedList = [...listData, data];

    // Update the list data.
    //setlistData(updatedList);

    // Log the updated list data to the console.
    //console.log(updatedList);
  } //addData end

  function removeData(i) {
    // alert("removeData:"+i);
    console.log('removeData:' + i);
    const updatedListData = listData.filter((elem, id) => {
      console.log('filter');
      return i != id;
    });
    setlistData(updatedListData);
    console.log('removeData listData:' + listData);
    setUndoStack(listData);

    // Save the previous state of the list to the undo stack.
    setUndoStack([...undoStack, listData]);

    // Limit the size of the undo stack to 5.
    if (undoStack.length > 5) {
      undoStack.shift();
    }

    // Save the removed Data to the redo stack.
  setRedoStack([...redoStack, listData[i]]);
  console.log('redoStack in add:' + redoStack);
  // Limit the size of the redo stack to 5.
  if (redoStack.length > 5) {
    redoStack.shift();
  }
  } //removeData end

  function clearList() {
    console.log('clearlist');
    setUndoStack(listData);

    // Save the previous state of the list to the undo stack.
    setUndoStack([...undoStack, listData]);

    // Limit the size of the undo stack to 5.
    if (undoStack.length > 5) {
      undoStack.shift();
    }

    console.log('listData:' + listData);
    setlistData([]);
  }



  function undo() {
    
    // Initialize the undoStack state variable to an empty array if it is undefined.
  if (undoStack.length === 0) {
    // The undoStack is empty.
    console.log('undoStack empty:' + undoStack);
    alert("No further Undo possible...");
    return;
  }

    if (undoStack != []) {
      console.log('undoStack not empty:' + undoStack);
      // Pop the previous state of the list from the undo stack.
      const previousListData = undoStack.pop();

      // Restore the previous state of the list.
      setlistData(previousListData);

      // Save the previous state of the list to the redo stack.
    setRedoStack([...redoStack, listData]);
    }
  }

  
  function redo() {
    if (redoStack.length === 0) {
      // The undoStack is empty.
      console.log('redoStack empty:' + redoStack);
      alert("No further Redo possible...");
      return;
    }
    console.log('redoStack in redo:' + redoStack);

    // Pop the previous state of the list from the redo stack.
    const previousListData = redoStack.pop();

    // Restore the previous state of the list.
    setlistData(previousListData);
  }
  return (
    <>
      <div className="container">
        <div className="header">Todo List</div>
        <input
          type="text"
          placeholder="Add Data"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <button onClick={addData}>Add</button>
        <button onClick={clearList}>Clear All List</button>
        <button onClick={undo}>Undo({undoStack.length})</button>
        <button onClick={redo}>Redo({redoStack.length})</button>
        <p className="list-heading">Here is your List </p>
        {listData != [] &&
          listData.map((data, i) => {
            return (
              <>
                <p key={i} className="list">
                  <div className="listData">{data}</div>
                  <div className="btn-div-delete">
                    <button
                      className="btn-delete"
                      onClick={() => removeData(i)}
                    >
                      Delete
                    </button>
                  </div>
                </p>
              </>
            );
          })}
      </div>
    </>
  );
}

export default Todo;
