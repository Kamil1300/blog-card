"use client"
import React, { useState } from 'react'
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

const data = [
  {
    id: 1,
    title: "Company 1",
    description: "Notifications Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate odit porro dicta, ipsum eligendi ipsam praesentium, magnam quaerat repellat aliquid voluptatem rem eos numquam quasi laborum voluptate cumque molestiae suscipit, quidem beatae culpa at ad consequatur. Consequatur laborum illum necessitatibus, molestiae, nisi minus numquam eveniet, eaque enim inventore ut nulla. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit perferendis maxime cupiditate illum voluptatem aliquid quasi sit temporibus culpa? Illo dolor hic nisi quidem ab quae illum accusantium vitae autem ullam! Sequi corporis exercitationem dolore, ab molestiae voluptates labore. Rem non cum doloribus explicabo itaque dolore incidunt esse reiciendis nesciunt?",
  },
  {
    id: 2,
    title: "Company 2",
    description: "Notifications Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate odit porro dicta, ipsum eligendi ipsam praesentium, magnam quaerat repellat aliquid voluptatem rem eos numquam quasi laborum voluptate cumque molestiae suscipit, quidem beatae culpa at ad consequatur. Consequatur laborum illum necessitatibus, molestiae, nisi minus numquam eveniet, eaque enim inventore ut nulla. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit perferendis maxime cupiditate illum voluptatem aliquid quasi sit temporibus culpa? Illo dolor hic nisi quidem ab quae illum accusantium vitae autem ullam! Sequi corporis exercitationem dolore, ab molestiae voluptates labore. Rem non cum doloribus explicabo itaque dolore incidunt esse reiciendis nesciunt?",
  },
  {
    id: 3,
    title: "Company 3",
    description: "Notifications Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate odit porro dicta, ipsum eligendi ipsam praesentium, magnam quaerat repellat aliquid voluptatem rem eos numquam quasi laborum voluptate cumque molestiae suscipit, quidem beatae culpa at ad consequatur. Consequatur laborum illum necessitatibus, molestiae, nisi minus numquam eveniet, eaque enim inventore ut nulla. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit perferendis maxime cupiditate illum voluptatem aliquid quasi sit temporibus culpa? Illo dolor hic nisi quidem ab quae illum accusantium vitae autem ullam! Sequi corporis exercitationem dolore, ab molestiae voluptates labore. Rem non cum doloribus explicabo itaque dolore incidunt esse reiciendis nesciunt?",
  },
  {
    id: 4,
    title: "Company 4",
    description: "Notifications Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate odit porro dicta, ipsum eligendi ipsam praesentium, magnam quaerat repellat aliquid voluptatem rem eos numquam quasi laborum voluptate cumque molestiae suscipit, quidem beatae culpa at ad consequatur. Consequatur laborum illum necessitatibus, molestiae, nisi minus numquam eveniet, eaque enim inventore ut nulla. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit perferendis maxime cupiditate illum voluptatem aliquid quasi sit temporibus culpa? Illo dolor hic nisi quidem ab quae illum accusantium vitae autem ullam! Sequi corporis exercitationem dolore, ab molestiae voluptates labore. Rem non cum doloribus explicabo itaque dolore incidunt esse reiciendis nesciunt?",
  },
  // {
  //   id: 5,
  //   title: "Company 5",
  //   description: "Notifications Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate odit porro dicta, ipsum eligendi ipsam praesentium, magnam quaerat repellat aliquid voluptatem rem eos numquam quasi laborum voluptate cumque molestiae suscipit, quidem beatae culpa at ad consequatur. Consequatur laborum illum necessitatibus, molestiae, nisi minus numquam eveniet, eaque enim inventore ut nulla. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit perferendis maxime cupiditate illum voluptatem aliquid quasi sit temporibus culpa? Illo dolor hic nisi quidem ab quae illum accusantium vitae autem ullam! Sequi corporis exercitationem dolore, ab molestiae voluptates labore. Rem non cum doloribus explicabo itaque dolore incidunt esse reiciendis nesciunt?",
  // },
  // {
  //   id: 6,
  //   title: "Company 6",
  //   description: "Notifications Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate odit porro dicta, ipsum eligendi ipsam praesentium, magnam quaerat repellat aliquid voluptatem rem eos numquam quasi laborum voluptate cumque molestiae suscipit, quidem beatae culpa at ad consequatur. Consequatur laborum illum necessitatibus, molestiae, nisi minus numquam eveniet, eaque enim inventore ut nulla. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit perferendis maxime cupiditate illum voluptatem aliquid quasi sit temporibus culpa? Illo dolor hic nisi quidem ab quae illum accusantium vitae autem ullam! Sequi corporis exercitationem dolore, ab molestiae voluptates labore. Rem non cum doloribus explicabo itaque dolore incidunt esse reiciendis nesciunt?",
  // },
  // {
  //   id: 7,
  //   title: "Company 7",
  //   description: "Notifications Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate odit porro dicta, ipsum eligendi ipsam praesentium, magnam quaerat repellat aliquid voluptatem rem eos numquam quasi laborum voluptate cumque molestiae suscipit, quidem beatae culpa at ad consequatur. Consequatur laborum illum necessitatibus, molestiae, nisi minus numquam eveniet, eaque enim inventore ut nulla. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit perferendis maxime cupiditate illum voluptatem aliquid quasi sit temporibus culpa? Illo dolor hic nisi quidem ab quae illum accusantium vitae autem ullam! Sequi corporis exercitationem dolore, ab molestiae voluptates labore. Rem non cum doloribus explicabo itaque dolore incidunt esse reiciendis nesciunt?",
  // },
  // {
  //   id: 8,
  //   title: "Company 8",
  //   description: "Notifications Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate odit porro dicta, ipsum eligendi ipsam praesentium, magnam quaerat repellat aliquid voluptatem rem eos numquam quasi laborum voluptate cumque molestiae suscipit, quidem beatae culpa at ad consequatur. Consequatur laborum illum necessitatibus, molestiae, nisi minus numquam eveniet, eaque enim inventore ut nulla. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit perferendis maxime cupiditate illum voluptatem aliquid quasi sit temporibus culpa? Illo dolor hic nisi quidem ab quae illum accusantium vitae autem ullam! Sequi corporis exercitationem dolore, ab molestiae voluptates labore. Rem non cum doloribus explicabo itaque dolore incidunt esse reiciendis nesciunt?",
  // },
  // {
  //   id: 9,
  //   title: "Company 9",
  //   description: "Notifications Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate odit porro dicta, ipsum eligendi ipsam praesentium, magnam quaerat repellat aliquid voluptatem rem eos numquam quasi laborum voluptate cumque molestiae suscipit, quidem beatae culpa at ad consequatur. Consequatur laborum illum necessitatibus, molestiae, nisi minus numquam eveniet, eaque enim inventore ut nulla. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit perferendis maxime cupiditate illum voluptatem aliquid quasi sit temporibus culpa? Illo dolor hic nisi quidem ab quae illum accusantium vitae autem ullam! Sequi corporis exercitationem dolore, ab molestiae voluptates labore. Rem non cum doloribus explicabo itaque dolore incidunt esse reiciendis nesciunt?",
  // },
  // {
  //   id: 10,
  //   title: "Company 10",
  //   description: "Notifications Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate odit porro dicta, ipsum eligendi ipsam praesentium, magnam quaerat repellat aliquid voluptatem rem eos numquam quasi laborum voluptate cumque molestiae suscipit, quidem beatae culpa at ad consequatur. Consequatur laborum illum necessitatibus, molestiae, nisi minus numquam eveniet, eaque enim inventore ut nulla. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit perferendis maxime cupiditate illum voluptatem aliquid quasi sit temporibus culpa? Illo dolor hic nisi quidem ab quae illum accusantium vitae autem ullam! Sequi corporis exercitationem dolore, ab molestiae voluptates labore. Rem non cum doloribus explicabo itaque dolore incidunt esse reiciendis nesciunt?",
  // },
]


type CardProps = React.ComponentProps<typeof Card>

export function CardDemo({ className, ...props }: CardProps) {
  // State to track expanded status of each card
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set())

  // Toggle the expanded state of a card
  const handleToggle = (id: number) => {
    setExpandedCards(prev => {
      const newExpandedCards = new Set(prev)
      if (newExpandedCards.has(id)) {
        newExpandedCards.delete(id)
      } else {
        newExpandedCards.add(id)
      }
      return newExpandedCards
    })
  }

  return (
    <>
      {data.map((i) => {
        const isExpanded = expandedCards.has(i.id)
        return (
          <Card key={i.id} className={cn("w-[380px]", className)} {...props}>
            <CardHeader>
              <CardTitle>{i.title}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <CardDescription>
                {isExpanded
                  ? i.description
                  : `${i.description.substring(0, 300)}...` // Truncate the description if not expanded
                }
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleToggle(i.id)}>
                {isExpanded ? 'Show Less' : 'Show More'}
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </>
  )
}
