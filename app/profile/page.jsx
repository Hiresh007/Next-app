'use client'
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Profile from '@components/Profile'
const MyProfile = () => {
    const {data:session} = useSession()
    const [posts, setPost] = useState([])
    const router = useRouter()
    const fetchPosts = async () => { 
        const response = await fetch(`/api/users/${session?.user.id}/posts`)
        const data = await response.json()
      setPost(data)
      }
      useEffect(() => {
       if(session?.user.id) {fetchPosts()}
      },[])

    const handleEdit = (post) =>{
         router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) =>{
      const hasConfirm = confirm("Do you want to delete?")

      if(hasConfirm){
        try {
           await fetch(`/api/prompt/${post._id.toString()}`,{
            method:'DELETE'
           })

           const filterPost = posts.filter((p) => p._id !== post._id)
           setPost(filterPost)
        } catch (error) {
          console.log(error)
        }
      }

    }
  return (
    <Profile
      name = "My"
      desc = "Welcome to your profile"
      data = {posts}
      handleEdit ={handleEdit}
      handleDelete = {handleDelete}
    />
  )
}

export default MyProfile