import React from 'react'
import { useState } from 'react'
import { useAddCardMutation } from '../store'
import { useSelector } from 'react-redux'
import cardSlice from '../store/slices/cardSlice'


// need to get selected deck id

const AddCard = () => {
    const [showInput, setShowInput] = useState(false)
    const [inputs, setInputs] = useState("");
    const [addCard, { data, isLoading, isError, error }] = useAddCardMutation();
    let _id = useSelector((state) => state.cardReducer.cards)
    //console.log(_id)
    

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
     };
     console.log(inputs)

     const handleAddCard = async (e) => {
        const cardObj = {id: _id, front: inputs.front, back: inputs.back}
    
        e.preventDefault();
        try {
           const newCard = await addCard(cardObj)
           setInputs({front: '', back: ''});
           setShowInput(false)
           
        } catch (error) {
           console.log(error);
        }
     };


    if(showInput){
       return <form className="form-inline" onSubmit={handleAddCard}>
            <div className="form-group justify-space-evenly">
               <label>
                  Front
                  <input
                     className="form-control"
                     id="frontInput"
                     placeholder="front"
                     name="front"
                     value={inputs.front || ""}
                     onChange={handleChange}
                  />
               </label>
               <label>
                  Back
                  <input
                     className="form-control"
                     id="backInput"
                     placeholder="back"
                     name="back"
                     value={inputs.back || ""}
                     onChange={handleChange}
                  />
               </label>
               <button className="btn btn-primary ml-2">submit</button>
            </div>
         </form>
    } else {
        return (
            <div><button onClick={() => setShowInput(true)}>AddCard</button></div>
          )
    }
 
}

export default AddCard;