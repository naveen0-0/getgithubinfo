import React, { useState, useEffect } from "react"
import axios from 'axios'

type UserInfo = {
  avatar_url : string,
  login : string,
  name : string,
  public_repos : number,
  public_gists : number,
  created_at : Date
}

export default function App() {
  const BASE_URL = "https://api.github.com/users/"
  const [ username, setUsername ] = useState<string>("");
  const [ user, setUser ] = useState<UserInfo | null >(null);
  const [ error, setError ] = useState(false)

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const fetchUser = async (username:string, e? :React.FormEvent<HTMLFormElement>) => {
    setError(false)
    e?.preventDefault()
    try {
      let { data } = await axios.get(`${BASE_URL}${username}`)
      setUser(data)
      setUsername("")
    } catch (error) {
      console.log(error);
      setError(true)
      setTimeout(() => {
        setError(false)
      },3000)
    }
  }

  useEffect(() => {
    fetchUser("naveen0-0")
  },[])

  return (
    <div className="bg-slate-400 min-h-screen">
      <div className="mx-4 py-1 text-2xl font-anton">Get Github Info</div>
      <div className="w-full mx-auto p-4 pt-2">
        <form 
          onSubmit={(e) => fetchUser(username,e)}
          className="flex flex-col sm:flex-row"
        >
          <input 
            className="flex-1 px-2 py-2 bg-slate-900 text-white outline-none border-none font-roboto"
            type="text" 
            placeholder="Enter an username..."
            required
            autoFocus
            value={username} 
            onChange={(e) => handleChange(e)} 
            />
          <button 
            type="submit"
            className="bg-slate-100 px-4 py-2 border-slate-900 border-4 font-roboto font-bold cursor-pointer"
          >Search</button>
        </form>

        {error && <div className="bg-slate-900 py-3 px-4 my-2 rounded-md shadow-2xl shadow-slate-900 text-white">There is no USER with that name</div>}

          {user===null? 
            <div className="bg-slate-800 p-6 my-4 rounded-md shadow-2xl shadow-slate-900 text-white text-center">Loading</div> : 
            <User user={user}/> 
          }
      </div>
    </div>
  )
}



const User = ({ user }:{ user : UserInfo }) => {
  return (
    <div className="bg-slate-800 p-6 my-4 rounded-md shadow-2xl shadow-slate-900 flex justify-around items-center flex-col sm:flex-row max-w-screen-md mx-auto">
      <div className="flex justify-center items-center">
        <img src={user?.avatar_url} alt="Avatar" className="w-32 rounded-full"/>
      </div>
      <div className="flex-1 p-4 text-center sm:text-left">
        <div className="text-white font-roboto">Name : <span className="text-orange-400 font-roboto">{user.name}</span></div>
        <div className="text-white font-roboto">username : <span className="text-orange-400 font-roboto">{user.login}</span></div>
        <div className="text-white font-roboto">Public Repos : <span className="text-orange-400 font-roboto">{user.public_repos}</span></div>
        <div className="text-white font-roboto">Public Gists : <span className="text-orange-400 font-roboto">{user.public_gists}</span></div>
        <div className="text-white font-roboto">Created at : <span className="text-orange-400 font-roboto">{returnProperlyFormatedDate(user.created_at)}</span></div>
      </div>
    </div>
  )
}


const returnProperlyFormatedDate = (date:Date) => {
  const newDate = new Date(date);
  return `${newDate.getFullYear()}-${newDate.getMonth()}-${newDate.getDay()}`
}