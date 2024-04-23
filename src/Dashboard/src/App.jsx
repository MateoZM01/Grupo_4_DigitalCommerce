import './App.css'
import dcLogo from '/Logodc.png';
import Products from './Components/Products';
import Users from './Components/Users';
import Categories from './Components/Categories';
import LastUser from './Components/LastUser';
import ProductCategories from './Components/ProductCategories';
import ProductList from './Components/ProductList';

function App() {

  return (
    <>
      <div>
        <a href="">
          <img
            src={dcLogo}
            className="logo react"
            alt="Dc logo"
          />
        </a>

      </div>
      <h1>Dashboard</h1>
      <main id='main-app'>
        <Products />
        <Users />
        <Categories />
        <LastUser />
        <ProductCategories />
        <ProductList />
      </main>
    </>
  )
}
export default App
