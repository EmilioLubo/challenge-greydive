import React, { useEffect, useRef, useState } from 'react'
import db from '../firebase'
import { addDoc, collection, query, getDocs, where } from 'firebase/firestore'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'

const Form = () => {

    const [loader, setLoader] = useState(true)
    const [inputs, setInputs] = useState([])
    const [selectDefault, setSelectDefault] = useState('')
    const selectRef = useRef()
    const formRef = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        fetch('/data/db.json')
        .then(res => res.json())
        .then(data => {
            setLoader(false)
            setInputs(data.items)
        })
        .catch(err => {
            setLoader(false)
            console.log(err.message)
        })
    }, [])

    const selectHandler = () => {
        setSelectDefault(selectRef.current.value)
    }

    const submitHandler = async(e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current)
        const values = Object.fromEntries(formData)
        try {
            const res = await postData(values)
            if(res.id){
                Swal.fire({
                    icon: 'success',
                    title: '¡Gracias por contestar!',
                    text: '¿Quieres conocer los resultados de ésta encuesta?',
                    showCancelButton: true,
                    showConfirmButton: true
                })
                .then(result => {
                    if(result.isConfirmed){
                        navigate(`/data`)
                    } else{
                        setSelectDefault('')
                        e.target.reset()
                    }
                })
            } else{
                Swal.fire({
                    icon: 'error',
                    title: 'El usuario ya existe',
                    text: res,
                    showConfirmButton: true
                })
            }
        } catch (error) {
            console.log(error.message)
        }

    }

    const postData = async(data) => {
        try {
            const q = query(collection(db, 'users'), where('email', '==', data.email))
            const result = await getDocs(q)
            if(result.docs.length === 0){
                const col = collection(db, 'users')
                const doc = await addDoc(col, data)
                return doc
            } else{
                return 'El email ingresado ya ha contestado la encuesta'
            }
            } catch (error) {
            console.log(error);
        }
    }

  return (
    <section className='container-fluid container-lg p-1'>
        <h1 className='text-center pt-5'>¡Forma parte de la encuesta!</h1>
        <div className='pt-5'>
            {
                loader ?
                <Spinner/> :
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
            }
        </div>
    </section>
  )
}

export default Form