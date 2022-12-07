import React, { createContext, useState,useCallback,useEffect } from "react";

const AuthContext = createContext({
  token: "",
  isLoggedin: false,
  login: (token) => {},
  logout: () => {},
  setData:()=>{},
  email:"",
  password:"",
  userId: "",
});
let timer;
export const AuthContextProvider = (props) => {
 
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoggedin,setIsLoggedIn] = useState(false);
  const [expiration,setExpiration] = useState();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  
  const setData=(email,password)=>{

    setEmail(email);
    setPassword(password);
  }

  const loginHandler = useCallback((token,id,expirationTime) => {
    setToken(token);
    setUserId(id);
    setIsLoggedIn(true);
    const expirationToken = expirationTime || new Date(new Date().getTime() + 1000*60*60);
    setExpiration(expirationToken);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", id);
    localStorage.setItem("expirationToken",expirationToken.toISOString());
    
  },[]);
  const logoutHandler = useCallback(() => {
  
    setToken(null);
    setUserId(null);
    setIsLoggedIn(false);
    setExpiration(null)
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem('expirationToken');
  },[]);

  useEffect(()=>{
    const intialToken = localStorage.getItem("token");
    const intialUserId = localStorage.getItem("userId");
    const expirationTime = localStorage.getItem("expirationToken")

    if(intialToken && intialUserId && new Date(expirationTime)> new Date())
    {
      loginHandler(intialToken,intialUserId,new Date(expirationTime));
    }else{
      logoutHandler()
    }
  
  
    },[loginHandler])


    useEffect(()=>{
     
      if(token && expiration)
      {
        


          timer = setTimeout(logoutHandler,expiration.getTime() -new Date().getTime())
      }
      else{
        clearTimeout(timer);
      }
    },[token,expiration,logoutHandler])


  const contextValue = {
    token,
    isLoggedin,
    login: loginHandler,
    logout: logoutHandler,
    setData:setData,
    email:email,
    password:password,
    userId: userId,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;