import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import API_BASE_URL from '../Config';

const PostDetail = ({ onPostFetch }) => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const currentUser = useSelector(state => state.user.user);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/post/${postId}`);
                setPost(response.data);
                onPostFetch(response.data); // 부모 컴포넌트로 게시물 데이터를 전달
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchPost();
    }, [postId, onPostFetch]);

    const handleDeletePost = async () => {
        try {
            if (currentUser && post && currentUser.username === post.username) {
                await axios.delete(`${API_BASE_URL}/post/${postId}`, {
                    params: {
                        username: currentUser.username
                    }
                });
                navigate('/');
            } else {
                console.error('You are not authorized to delete this post');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    if (!post) {
        return <div className="text-center">Loading...</div>;
    }

    const totalCost = post.cost + post.deposit;

    return (
        <div className="max-w-4xl mx-auto my-8 p-4">
            <div>
                <div className="flex items-center justify-end w-full pt-5">
                    <ul className="md:flex items-center space-x-1 gap-5 mb-5">
                        <li className="text-gray-600 mb-2">
                            <strong>작성일 : </strong>
                            {new Date(post.createdAt).toLocaleString()}
                        </li>
                        <li className="text-gray-600 mb-2"><strong>조회 :</strong> {post.views}</li>
                    </ul>
                </div>
                <div className="flex justify-end">
                    {currentUser && currentUser.username === post.username ? (
                        <button onClick={handleDeletePost} className="px-4 py-2 text-black bg-transparent rounded hover:text-red-500 mb-4">
                            삭제
                        </button>
                    ) : (null)}
                </div>
                {post.imageUrl && (
                    <div className="mb-6 w-96 mx-auto">
                        <img src={`${API_BASE_URL}/images/${post.imageUrl.split('/').pop()}`}
                            alt={post.title}
                            className="w-full h-auto object-contain"
                        />
                    </div>
                )}
                <hr className="my-4 border-t-1 border-gray-300" />
                
                    <div className="font-bold text-blue-400 mb-2">{post.authorNickname}</div>
                    <div className="font-bold "> {post.location}</div>
                
                <hr className="my-4 border-t-1 border-gray-300" />
                <h1 className="text-3xl font-bold mb-8">{post.title}</h1>
                <p className="text-lg text-gray-800 mb-6">{post.content}</p>
                <div className="text-gray-600 mb-2 flex items-center">
                    <div className="mr-4"><strong>렌탈비 :</strong> {post.cost}원</div>
                    <div className="mr-4"><strong>보증금 :</strong> {post.deposit}원</div>
                    <div><strong>총 거래액 :</strong> {totalCost}원</div>
                </div>
            </div>
        </div>
    );
};

export default PostDetail;