import { Outlet } from "react-router-dom"




const Layout = () => {
  return ( //header and footer inside main, outside outlet
   // <Main className="app">
        <Outlet />
   // </Main>
  )
}

export default Layout