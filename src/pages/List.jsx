import React, { useEffect, useState } from 'react'
import db from '../firebase'
import { collection, getDocs } from "firebase/firestore"
import { Spinner } from 'react-bootstrap'

const List = () => {

  const [loader, setLoader] = useState(true)
  const [list, setList] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async() => {
    try {
      const today = new Date()
      const docs = await getDocs(collection(db, 'users'))
      const newList = await docs.docs.map(el => {
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
      setList(newList);
    } catch (error) {
      setLoader(false)
      console.log(error.message)
    }
  }

  return (
    <div className='d-flex align-items-center justify-content-center'>
      <table className='table table-hover'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Nombre</th>
            <th scope='col'>Edad</th>
            <th scope='col'>País de orígen</th>
          </tr>
        </thead>
        <tbody>
            {
              loader ? 
              <Spinner/> :
              list.length > 0 ?
              list.map((el, i) => 
              <tr key={i}>
                <th scope='row'>{++i}</th>
                <td>{el.name} ****</td>
                <td>{el.age}</td>
                <td>{el.country[0].toUpperCase() + el.country.substring(1)}</td>
              </tr>) :
              <tr>
                <td className='text-center' colSpan={4}>No data</td>
              </tr>
            }
        </tbody>
      </table>
    </div>
  )
}

export default List