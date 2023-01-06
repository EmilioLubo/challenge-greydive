import React, { useEffect, useRef, useState } from 'react'

const Form = () => {

    const [inputs, setInputs] = useState([])
    const [selectDefault, setSelectDefault] = useState('')
    const selectRef = useRef()

    useEffect(() => {
        fetch('/data/db.json')
        .then(res => res.json())
        .then(data => setInputs(data.items))
        .catch(err => console.log(err.message))
    }, [])

    const selectHandler = () => {
        setSelectDefault(selectRef.current.value)
    }

  return (
    <section className='container-fluid container-lg'>
        <div>
            <form className='d-flex flex-column' action="">
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