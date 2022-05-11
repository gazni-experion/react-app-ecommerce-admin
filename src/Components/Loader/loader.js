import React from 'react'
import {RotatingLines} from 'react-loader-spinner'
import "../../Styles/styles.css";

export default function Loader({isLoading}) {
  
  return (
      isLoading?(
    <div className='loader'><RotatingLines width="100" /></div>
      ): null
  )
}
