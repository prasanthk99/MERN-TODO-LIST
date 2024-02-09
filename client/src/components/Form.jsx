import React, { useState, useEffect, useRef } from 'react'
// import ReactTooltip from 'react-tooltip'

function Form(props) {
    const [name, setName] = useState("")
  const inputEl = useRef(null)

    const handleChange = (evt) => {
        setName(evt.target.value)
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        console.log("event checked")
        if (name === "") return alert("enter a valid todo")
        if (name.length < 5) return alert("A good todo item should have at least 5 letters")
        if (name.length > 50) return alert("Write a short todo item of less that 50 characters")

        if(props.isEditing){
            props.setIsEditing(false);
            props.handleUpdate(name);
            setName("");
            return;
        }

        props.addTask(name)
        setName("");
    }

    const handleFocus = (evt) => {
        const target = evt.target
        target.parentNode.classList.add('active')
    }

    const handleBlur = (evt) => {
        const target = evt.target
        if (!target.value) {
            target.parentNode.classList.remove('active');
        }
    }

    useEffect(() => {
        inputEl.current.value.trim("") !== "" ?
        inputEl.current.parentNode.classList.add('active') :
        inputEl.current.parentNode.classList.remove('active')
    }, [])

    useEffect(()=>{
        const value = props.todos.filter((t)=>t._id==props.editId);
        if(props.isEditing){
            console.log(value);
            setName(value[0].title);
        }
    },[props.editId])

    return (
        <form onSubmit={handleSubmit} className={`form`} style={{textAlign:"center"}}>
            <div className="search-container">
                <label htmlFor='new-todo' style={{fontSize: "1.4rem",display: "block"}}
                    className='lbl-new-todo'>
                    Create a new todo...
                </label>
                <input type="text"
                    name="text"
                    id='new-todo'
                    className='new-todo'
                    autoComplete='off'
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    value={name}
                    ref={inputEl}
                    onChange={handleChange} style={{width:"30vw",margin:"10px"}} required/>
                {!props.isEditing?(
                <button type="submit" className='btn btn-submit'
                    data-delay-hide='100'
                    data-tip='enter a todo with length between 5 and 50 characters'>
                    <span className='sr-only'>Add-ToDo</span>                  
                </button>
                ):(
                <button type="submit" className='btn btn-submit'
                    data-delay-hide='100'
                    data-tip='enter a todo with length between 5 and 50 characters'>
                    <span className='sr-only'>Update-ToDo</span>                  
                </button>
                )}
                {/* <ReactTooltip /> */}
            </div>
        </form>
    )
}

export default Form