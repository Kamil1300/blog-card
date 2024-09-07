"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {useState} from 'react'
import axios from "axios"

export function InputWithButton() {
  const [title,setTitle] = useState('')
  const [content,setContent] = useState('')
  const [errors,setErrors] = useState<{title?: string, content?: string}>({})

  const handlePost = async() => {
    setErrors({})

    let valid = true
    const newErrors : {title? : string; content?: string} = {}

    if(!title.trim()){
      newErrors.title = "Title should not be empty"
      valid = false
    }

    if(!content.trim()){
      newErrors.content = "Content should not be empty"
      valid = false
    }

    if(!valid){
      setErrors(newErrors)
      return
    }

    try {
      const response = await axios.post('http://localhost:3001/posts',{
        title,
        content
      })
      console.log('Blog post created:', response.data);
      setTitle('')
      setContent('')
      
    } catch (error) {
      console.error("Error creating blog post:", error)
    }
  }

  return (
    <div className="flex flex-col gap-5 w-full max-w-sm items-center space-x-2">
      <Input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} required/>
      {errors.title && <p className="text-red-500">{errors.title}</p>}
      <Textarea placeholder="Write here" style={{ msOverflowStyle: "none",scrollbarWidth: "none",}} value={content} onChange={(e) => setContent(e.target.value) } required/>
        {errors.content && <p className="text-red-500">{errors.content}</p>}
      <Button type="submit" onClick={handlePost}>Add</Button>
    </div>
  )
}
