import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../Config';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [searchTitle, setSearchTitle] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/post/posts`);
            console.log('API Response:', response.data); // 응답 데이터 구조 확인
            if (Array.isArray(response.data)) {
                setPosts(response.data.reverse());
            } else if (response.data && Array.isArray(response.data.posts)) {
                setPosts(response.data.posts.reverse());
            } else {
                console.error('Expected an array but got:', response.data);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handleGoToCreate = () => {
        navigate('/CreatePostPage');
    };

    const handlePostClick = (postId) => {
        navigate(`/post/${postId}`);
    };

    const handleGoToMyPosts = () => {
        navigate('/mypostpage');
    };

    const handleSearchChange = (e) => {
        setSearchTitle(e.target.value);
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`${API_BASE_URL}/post/search?title=${searchTitle}`);
            setPosts(response.data);
        } catch (error) {
            console.error('Error searching posts:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto my-8 p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-bold">도서</h2>
                <div>
                    <button
                        onClick={handleGoToCreate}
                        className="px-4 py-2  text-yellow-800 font-bold rounded-md hover:bg-yellow-200 transition duration-300 mr-4"
                    >
                        책 등록
                    </button>
                    <button
                        onClick={handleGoToMyPosts}
                        className="px-4 py-2 text-yellow-400 rounded-md hover:bg-yellow-200 transition duration-300"
                    >
                        내 책
                    </button>
                </div>
            </div>
            <div className="flex justify-end mb-4">
                <form onSubmit={handleSearchSubmit} className="flex">
                    <input
                        type="text"
                        value={searchTitle}
                        onChange={handleSearchChange}
                        placeholder="제목 검색"
                        className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-r-md hover:bg-gray-300 transition duration-300"
                    >
                        검색
                    </button>
                </form>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center">
                {posts.map((post) => (
                    <div
                        key={post.postId}
                        className="border p-4 rounded-md cursor-pointer hover:bg-gray-100 transition duration-300"
                        onClick={() => handlePostClick(post.postId)}
                    >
                        {post.imageUrl && (
                            <div className="mb-4">
                                <img src={`${API_BASE_URL}/images/${post.imageUrl}`} alt={post.title} className="w-40 h-40 object-cover mx-auto" />
                            </div>
                        )}
                        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                        <p className="text-gray-600">{post.cost}원</p>
                        <p className="text-gray-600">{post.location}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostList;