"use client"
import React, { useState, useEffect, useRef } from 'react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { ConfirmationModal } from '@/components/confirmationModal'

const manualPosts = [
  {
    id: 301,
    title: "Company 1",
    content: "Notifications Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate odit porro dicta, ipsum eligendi ipsam praesentium, magnam quaerat repellat aliquid voluptatem rem eos numquam quasi laborum voluptate cumque molestiae suscipit, quidem beatae culpa at ad consequatur. Consequatur laborum illum necessitatibus, molestiae, nisi minus numquam eveniet, eaque enim inventore ut nulla. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit perferendis maxime cupiditate illum voluptatem aliquid quasi sit temporibus culpa? Illo dolor hic nisi quidem ab quae illum accusantium vitae autem ullam! Sequi corporis exercitationem dolore, ab molestiae voluptates labore. Rem non cum doloribus explicabo itaque dolore incidunt esse reiciendis nesciunt?",
  },
  {
    id: 302,
    title: "Company 2",
    content: "Notifications Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate odit porro dicta, ipsum eligendi ipsam praesentium, magnam quaerat repellat aliquid voluptatem rem eos numquam quasi laborum voluptate cumque molestiae suscipit, quidem beatae culpa at ad consequatur. Consequatur laborum illum necessitatibus, molestiae, nisi minus numquam eveniet, eaque enim inventore ut nulla. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit perferendis maxime cupiditate illum voluptatem aliquid quasi sit temporibus culpa? Illo dolor hic nisi quidem ab quae illum accusantium vitae autem ullam! Sequi corporis exercitationem dolore, ab molestiae voluptates labore. Rem non cum doloribus explicabo itaque dolore incidunt esse reiciendis nesciunt?",
  },
  {
    id: 303,
    title: "Company 3",
    content: "Notifications Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate odit porro dicta, ipsum eligendi ipsam praesentium, magnam quaerat repellat aliquid voluptatem rem eos numquam quasi laborum voluptate cumque molestiae suscipit, quidem beatae culpa at ad consequatur. Consequatur laborum illum necessitatibus, molestiae, nisi minus numquam eveniet, eaque enim inventore ut nulla. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit perferendis maxime cupiditate illum voluptatem aliquid quasi sit temporibus culpa? Illo dolor hic nisi quidem ab quae illum accusantium vitae autem ullam! Sequi corporis exercitationem dolore, ab molestiae voluptates labore. Rem non cum doloribus explicabo itaque dolore incidunt esse reiciendis nesciunt?",
  },
  {
    id: 304,
    title: "Company 4",
    content: "Notifications Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate odit porro dicta, ipsum eligendi ipsam praesentium, magnam quaerat repellat aliquid voluptatem rem eos numquam quasi laborum voluptate cumque molestiae suscipit, quidem beatae culpa at ad consequatur. Consequatur laborum illum necessitatibus, molestiae, nisi minus numquam eveniet, eaque enim inventore ut nulla. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit perferendis maxime cupiditate illum voluptatem aliquid quasi sit temporibus culpa? Illo dolor hic nisi quidem ab quae illum accusantium vitae autem ullam! Sequi corporis exercitationem dolore, ab molestiae voluptates labore. Rem non cum doloribus explicabo itaque dolore incidunt esse reiciendis nesciunt?",
  },
]


type CardProps = React.ComponentProps<typeof Card>

export function CardDemo({ className, ...props }: CardProps) {
  const [posts, setPosts] = useState<any[]>(manualPosts)
  const hasFetched = useRef(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null)
  const router = useRouter()


  useEffect(() => {

    const fetchPosts = async () => {
      if (hasFetched.current) return;

      hasFetched.current = true;
      try {
        const response = await axios.get('http://localhost:3001/posts');
        console.log(response);

        setPosts(prevPosts => [...prevPosts, ...response.data])

      } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
      }
    }
    fetchPosts()
  }, [])

  const handleShowMore = (id: number) => {
    // Check if the post is from the manualPosts array
    const isManualPost = manualPosts.some(post => post.id === id);

    if (isManualPost) {
      // Handle manual post differently, e.g., show a modal or expand the card
      alert("This is a manually added post, it has no detailed page. show more button only work with dynamic data which is come from backend api");
    } else {
      // If it's an API post, navigate to the detail page
      router.push(`/posts/${id}`);
    }
  };


  const handleDelete = async () => {
    if (postToDelete === null) return
    try {
      // Check if the post is from the manualPosts array
      if (manualPosts.some(post => post.id === postToDelete)) {
        // If it's a manual post, just update the state without making an API call
        setPosts(prevPosts => prevPosts.filter(post => post.id !== postToDelete));
      } else {
        // If it's a post from the API, make an API call to delete it
        await axios.delete(`http://localhost:3001/posts/${postToDelete}`);
        setPosts(prevPosts => prevPosts.filter(post => post.id !== postToDelete));
      }
      handleModalClose()
    } catch (error) {
      console.error("Error deleting post:", error);
      throw error;
    }
  };

  const handleModalOpen = (id: number) => {
    setPostToDelete(id)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setPostToDelete(null)
  }

  return (
    <>
      {posts.map((i) => {
        return (
          <Card key={i.id} className={cn("w-[380px]", className)} {...props}>
            <CardHeader>
              <CardTitle>{i.title}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <CardDescription className='line-clamp-2'>
                {i.content}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button className="w-full mx-2 hover:bg-gray-600 dark:hover:bg-gray-300" onClick={() => handleShowMore(i.id)}
              >
                Show More
              </Button>
              <Button className="w-full bg-red-600 mx-2 hover:bg-red-500" onClick={() => handleModalOpen(i.id)}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        )
      })}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this post?"
      />
    </>
  )
}
