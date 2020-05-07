import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { checkAuth } from '../../redux/user/actions'

const useAuth = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    console.log('AUTH CHECKING')
    dispatch(checkAuth()).then(() => {
      console.log('AUTH SUCCESS')
    })

    return () => {}
  }, [dispatch])
}

export default useAuth
