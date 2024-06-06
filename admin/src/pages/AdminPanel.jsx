import Navbar from '../components/Navbar'
import DashBoard from '../components/DashBoard'
import Products from '../components/Products'
import Pendings from '../components/Pendings'
import History from '../components/History'
import Reset from '../components/Reset'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

const AdminPanel = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' Component={DashBoard} />
          <Route path='/products' Component={Products} />
          <Route path='/pendings' Component={Pendings} />
          <Route path='/history' Component={History} />
          <Route path='/reset' Component={Reset} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default AdminPanel
