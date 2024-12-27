import React, { useState } from 'react'
import { Event, sendEvent } from '../api/eventService';

type Recipe = {
    type: string;
    name: string;
    description: string;
    ingredients: string[];
    instructions: string;
}

function EventForm() {
    const [state, setState] = useState<Recipe>({
        type: "",
        name: "",
        description: "",
        ingredients: [],
        instructions: ""
    });

    const handleAddIngredients = () => {
        setState({...state, ingredients: [...state.ingredients, ""]})
    }

    const handleIngredientChange = (index: number, value: string) => {
        const updatedIngredients = [...state.ingredients];
        updatedIngredients[index] = value;
        setState({...state, ingredients: updatedIngredients});
    }

    const handleSubmit = async () => {
        const newEvent: Event = {
            type: state.type,
            data: {
                name: state.name,
                description: state.description,
                ingredients: state.ingredients,
                instructions: state.instructions
            }
        }

        await sendEvent(newEvent);
        setState({
            type: "",
            name: "",
            description: "",
            ingredients: [],
            instructions: ""
        })
    }

  return (
    <div>
        <h3>Create Event</h3>
        <input
            type="text"
            value={state.type}
            onChange={(e) => setState({...state, type: e.target.value})}
            placeholder="Event Type"
        />
        <br/>
        <input
            type="text"
            value={state.name}
            onChange={(e) => setState({...state, name: e.target.value})}
            placeholder="Recipe Name"
        />
        <br/>
        <input
            type="text"
            value={state.description}
            onChange={(e) => setState({...state, description: e.target.value})}
            placeholder="Description"
        />
        <br/>
        {state.ingredients.map((ingredient, index) => {
                return <input
                    key={index}
                    type="text"
                    value={ingredient}
                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                    placeholder={`Ingredient ${index + 1}`}
                />
            })}
        <br/>
        <button onClick={handleAddIngredients}>Add Ingredient</button>
        <textarea
            value={state.instructions}
            onChange={(e) => setState({...state, instructions: e.target.value})}
            placeholder='Instructions'
        />
        <button onClick={handleSubmit}>Send Event</button>
    </div>
  )
}

export default EventForm