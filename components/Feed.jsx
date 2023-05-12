'use client'
import React from 'react'
import { useState , useEffect } from 'react'
import PromptCar from './PromptCar'

const PromptCardList = ({data , handleTagClick}) =>{
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCar
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}
const Feed = () => {

  const [searchText , setSearchText] = useState('');
  const [posts , setPost] = useState([]);
  
  const handleSearchChange = (e) => {
                
  }
  
  const fetchPosts = async () => { 
    const response = await fetch('/api/prompt')
    const data = await response.json()
  setPost(data)
  }
  useEffect(() => {
    fetchPosts()
  },[])
  return (
    <section className='feed'>
      <form action="" className='relative w-full flex-center'>
        <input type="text" placeholder='Search for a tag or a username'
        onChange={handleSearchChange}
        required 
        className='search_input peer'/>
      </form>
      <PromptCardList
       data ={posts}
      handleTagClick ={() => {}} />
    </section>
  )
}

export default Feed