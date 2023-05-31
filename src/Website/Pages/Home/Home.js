import './Home.css';
const Home = () => {
    function handleLogout() {
        localStorage.removeItem('jwt'); // remove the JWT token from local storage
        window.location.href = '/login'; // redirect the user to the login page
      }
    return(
        <>
            <p className="p_5">Home</p>
            <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
        </>
    )
}

export default Home;