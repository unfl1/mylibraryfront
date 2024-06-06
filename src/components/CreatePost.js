import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../Config';

const CreatePost = () => {
  const user = useSelector(state => state.user.user);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [location, setLocation] = useState('');
  const [cost, setCost] = useState('');
  const [deposit, setDeposit] = useState('');
  const [image, setImage] = useState(null); // 이미지 파일 상태 추가

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('location', location);
    formData.append('cost', parseInt(cost, 10));
    formData.append('deposit', parseInt(deposit, 10));
    formData.append('username', user.username);
    formData.append('image', image); // 이미지 파일 추가

    try {
      const response = await axios.post(`${API_BASE_URL}/post`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Post created:', response.data);
      // 성공적으로 게시물이 생성된 경우, 홈 화면으로 이동합니다.
      navigate('/');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 mt-10">
      <h1 className="text-2xl font-bold mb-6">책 등록하기</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            책 제목
          </label>
          <input
            id="title"
            type="text"
            placeholder="책 제목을 정확하게 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
            자세하게 설명
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
            거래 장소
          </label>
          <input
            id="location"
            type="text"
            placeholder="ex)서울시 강남구 역삼동"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cost">
            대여 가격
          </label>
          <input
            id="cost"
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deposit">
            보증금
          </label>
          <input
            id="deposit"
            type="number"
            value={deposit}
            onChange={(e) => setDeposit(e.target.value)} // 수정된 부분
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            첨부파일
          </label>
          <input
            id="image"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-800 text-white py-2 rounded-lg hover:bg-yellow-600"
        >
          등록
        </button>
      </form>
    </div>
  );
};

export default CreatePost;