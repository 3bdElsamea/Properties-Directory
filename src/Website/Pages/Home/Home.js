import './Home.css';
import Header from '../../Components/Header/Header';
import BestProperties from '../../Components/BestProperties/BestProperties'
import TypesProperties from 'Website/Components/TypesProperties/TypesProperties';
const Home = () => {
    return(
       <>
        <Header/>
        <BestProperties/>
        <TypesProperties/>
       </>
    )
}

export default Home;