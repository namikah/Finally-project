import React from 'react'
import News from '../../components/news/News'
import Parallax from '../../components/parallax/Parallax'
import TabHeader from '../../components/tabHeader/TabHeader'

function Home() {
  return (
   <>
   <TabHeader/>
   <Parallax/>
   <News/>
   </>
  )
}

export default Home