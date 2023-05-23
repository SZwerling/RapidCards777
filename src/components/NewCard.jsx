import React from 'react'

const NewCard = ({setNewFront, setNewBack, handleAddCard, newFront, newBack, _id}) => {
  return (
    <div className="card-edit-container">
    <button className="btn-edit" onClick={() => handleAddCard(_id)}>submit</button>
    <form className="card-edit">
       <textarea spellCheck="false" onChange={(e) => setNewFront(e.target.value)} value={newFront} maxLength={"95"} className="card-edit-1" autoFocus="autoFocus"></textarea>
       <textarea spellCheck="false" onChange={(e) => setNewBack(e.target.value)} value={newBack} maxLength={"95"} className="card-edit-2"></textarea>
    </form>
 </div>
  )
}

export default NewCard