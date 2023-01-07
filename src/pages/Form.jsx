import React, { useEffect, useRef, useState } from 'react'
import db from '../firebase'
import { addDoc, collection } from 'firebase/firestore'

const Form = () => {

    const [inputs, setInputs] = useState([])
    const [selectDefault, setSelectDefault] = useState('')
    const selectRef = useRef()
    const formRef = useRef()

    useEffect(() => {
        fetch('/data/db.json')
        .then(res => res.json())
        .then(data => setInputs(data.items))
        .catch(err => console.log(err.message))
    }, [])

    const selectHandler = () => {
        setSelectDefault(selectRef.current.value)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current)
        const values = Object.fromEntries(formData)
        postData(values)
    }

    const postData = async(data) => {
        try {
            const col = collection(db, 'users')
            const doc = await addDoc(col, data)
            console.log(doc)
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <section className='container-fluid container-lg'>
        <div>
            <form className='d-flex flex-column' ref={formRef} onSubmit={submitHandler}>
                {
                    inputs.length > 0 ?
                    inputs.map(el => {
                        if(el.type !== 'submit'){
                            return (
                            <label className={`d-flex ${el.type !== 'checkbox' ? 'flex-column' : 'gap-3'}`} key={el.label}>
                                {el.label}
                                {
                                    el.type !== 'select' ? 
                                    <input type={el.type} name={el.name} required></input> : 
                                    <select name={el.name} value={selectDefault} ref={selectRef} onChange={selectHandler}>
                                        <option disabled value={''}>Selecciona un país</option>
                                        {
                                            el.options.map(op => <option key={op.value} value={op.value}>{op.label}</option>)
                                        }
                                    </select>   
                                }
                            </label>
                            )
                        } else{
                            return <input key={el.label} type={el.type} value={el.label}></input>
                        }
                    }
                    ) :
                    <h5>Data error</h5>
                }
            </form>
        </div>
    </section>
  )
}

export default Form