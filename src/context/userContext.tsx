import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react"

interface User {
  _id: string
  hosname: string
  email: string
  password: string
  profilepic: string
  role: string
}

interface UserContextType {
  currentUser: User | null
  setCurrentUser: (user: User | null) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    const user = sessionStorage.getItem("user")
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
  }, [])

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }

  return context
}
