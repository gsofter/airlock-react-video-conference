import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { checkAuth } from '../../redux/user/actions'

const useAuth = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    console.log('AUTH CHECKING')
    dispatch(checkAuth())
      .then(() => {
        console.log('AUTH SUCCESS')
      })
      .catch((e) => {
        console.log('AUTH FAILED')
      })

    return () => {}
  }, [dispatch])
}

export default useAuth
