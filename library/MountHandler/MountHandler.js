import { useEffect } from 'react';
export const mountHandler = ({ onMount, onUnMount }) => {
    useEffect(() => {
      onMount()
      return onUnMount
    },[])
    return null
}  