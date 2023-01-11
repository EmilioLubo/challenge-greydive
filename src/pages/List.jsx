import React, { useEffect, useRef, useState } from 'react'
import db from '../firebase'
import { collection, getDocs, query, where } from "firebase/firestore"
import { Button, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const List = () => {

  const [loader, setLoader] = useState(true)
  const [list, setList] = useState([])
  const navigate = useNavigate()
  const [countries, setCountries] = useState([])
  const countryRef = useRef()
  const [selectDefault, setSelectDefault] = useState('')

  useEffect(() => {
    getDocs(collection(db, 'users'))
    .then(res => {
      setCountries(Array.from(new Set(res.docs.map(el => el.data().country_of_origin))))
    })
    getData()
    //eslint-disable-next-line
  }, [selectDefault])

  const getData = async() => {
    try {
      const today = new Date()
      let docs
      if(selectDefault === ''){
        docs = await getDocs(collection(db, 'users'))
      } else{
        const q = query(collection(db, "users"), where("country_of_origin", "==", selectDefault))
        docs = await getDocs(q)
      }
      const newList = docs.docs.map(el => {
        let item = el.data()
        let birth = new Date(item.birth_date)
        let age = today.getFullYear() - birth.getFullYear()
        if(today.getMonth() < birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())){
          age--
        }
        return {
          name: item.full_name.split(' ')[0],
          age: age.toLocaleString(),
          country: item.country_of_origin
        }
      })
      setLoader(false)
      setList(newList)
    } catch (error) {
      setLoader(false)
      console.log(error.message)
    }
  }

  let countryFilter = () => {
    setSelectDefault(countryRef.current.value)
  }

  return (
    <div className='d-flex flex-column align-items-center justify-content-center p-5'>
      <h1 className='align-self-start font-monospace text-decoration-underline'>Datos de la encuesta:</h1>
      <div className='w-100 d-flex justify-content-end align-items-center'>
        <label className='fs-6 fw-bold d-flex gap-2'>Filtrar por País: 
          <select name="country" ref={countryRef} value={selectDefault} onChange={countryFilter}>
            <option value={''}>Todos</option>
            {
              countries.length > 0 &&
              countries.map(el => <option key={el} value={el}>{el}</option>)
            }
          </select>
        </label>
      </div>
      <table className='table table-hover m-5'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Nombre</th>
            <th scope='col'>Edad</th>
            <th scope='col'>País de orígen</th>
          </tr>
        </thead>
        <tbody>
            { loader ?
              <tr>
                <td className='text-center' colSpan={4}><Spinner/></td>
              </tr> :
              list.length > 0 ?
              list.map((el, i) => 
              <tr key={i}>
                <th scope='row'>{++i}</th>
                <td>{el.name} ****</td>
                <td>{el.age}</td>
                <td>{el.country[0].toUpperCase() + el.country.substring(1)}</td>
              </tr>) :
              <tr>
                <td className='text-center' colSpan={4}>No hay datos aún...</td>
              </tr>
            }
        </tbody>
        <tfoot>
            <tr>
              <td className='text-start' colSpan={3}>Total  de personas:</td>
              <td>{list.length > 0 ? list.length : 0}</td>
            </tr>
        </tfoot>
      </table>
      <Button variant='outline-dark' onClick={() => navigate('/')}>Volver al formualario</Button>
    </div>
  )
}

export default List