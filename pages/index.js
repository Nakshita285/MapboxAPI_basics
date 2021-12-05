import { useState} from 'react'
import tw from 'tailwind-styled-components'
import Link from "next/link"

export default function Home() {
  
  const [dropoff, setDropoff] = useState("");
 
  return (
    
    <FullWrapper>
        <MapSearchBarInput 
        placeholder ="Enter your destination ..."
        value={dropoff}
        onChange={ function(event){
          setDropoff(event.target.value);
        }}
        />
        
        <Link href={{
                pathname: "/mainpage",
                query:{
                    dropoff:dropoff
                    
                }
            }}>

            <SearchButton> Search </SearchButton>
        </Link>
          
    </FullWrapper>

    
  )
}

const FullWrapper = tw.div`
 h-screen w-screen bg-red-50
 flex flex-col justify-center items-center
 `
const MapSearchBarInput = tw.input`
 h-16 md:h-18 w-1/2 
rounded-xl p-6 shadow-lg 
text-2xl 

border border-transparent focus:outline-none focus:ring-2 
focus:ring-red-600 focus:border-transparent
`
const SearchButton = tw.div`
 m-10 md:mt-20 h-12 w-1/5 md:w-1/6 border-2  
shadow-lg  rounded-xl p-2 text-center
 uppercase font-bold 

 bg-white text-red-700 border-2 border-red-600
 hover:bg-red-700 focus:outline-none focus:ring-2 
 focus:ring-red-600 focus:ring-opacity-50 hover:text-white
`