import React, { useState } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import PostDetail from '../components/PostDetail';
import CommentList from '../components/CommentList';
import { useParams } from 'react-router-dom';

function PostDetailPage() {
    const { postId } = useParams();
    const [post, setPost] = useState(null); // Post 데이터를 저장하기 위한 state 추가

    return (
        <div>
            <div>
                <Nav />
            </div>
            <div>
                <PostDetail onPostFetch={setPost} /> {/* Post 데이터를 받아오는 함수를 전달 */}
            </div>
            <div>
                {post && <CommentList postId={postId} post={post} />} {/* Post 데이터를 CommentList에 전달 */}
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default PostDetailPage;