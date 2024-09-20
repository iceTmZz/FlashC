"use client"
import NavBar from "@/components/Navbar"
import Slider from "@/components/Slider"
import { useEffect, useState } from "react"
import axios from "axios"

function Deck({ params }: { params: { id: string } }) {
  const deck_id = params.id
  const [cards, setCards] = useState()

  const fetchCards = async () => {
    try {
      const result = await axios.get(
        `http://127.0.0.1:8000/api/decks/${deck_id}/cards`
      )
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {}, [])

  return (
    <>
      <NavBar></NavBar>
      <div className="pt-32">
        <Slider></Slider>
      </div>
    </>
  )
}
export default Deck
