import Nav from '../components/Nav';
import PostList from '../components/PostList'
import Footer from '../components/Footer';
import Info from '../components/Info';

function HomePage() {
    return (
        <div>
            <div>
                <Nav />
            </div>
            <div>
                <Info />
            </div>
            <div>
                <PostList />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default HomePage;