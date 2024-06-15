import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../Config';

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    password1: '',
    nickname: '',
    email: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const apiUrl = `${API_BASE_URL}/user/signup`;

    const userData = {
      username: formData.username,
      password1: formData.password1,
      nickname: formData.nickname,
      email: formData.email,
    };

    try {
      const response = await axios.post(apiUrl, userData);
      console.log('API response:', response.data);  // 응답 데이터 확인
      if (response.status === 200) {
        console.log('회원가입 성공', response.data);
        navigate('/login');  // 로그인 페이지로 리다이렉트
      } else {
        console.error('회원가입 실패', response.data);
      }
    } catch (error) {
      console.error('사용자 등록 오류:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
    }
  };

  return (
      <div className="bg-gray-200 flex justify-center items-center min-h-screen w-full">
        <div className="lg:w-2/5 md:w-1/2 w-2/3 mt-8 mb-8">
          <form className="bg-white p-10 rounded-lg shadow-lg min-w-full" onSubmit={handleSignUp}>
            <Link to="/">
              <h1 className="text-center text-2xl mb-6 text-gray-600 font-bold font-sans">나만의 도서관</h1>
            </Link>
            <div>
              <label className="text-gray-800 font-semibold block my-3 text-md" htmlFor="username">아이디</label>
              <input
                  className="w-full bg-gray-100 px-2 py-1 rounded-lg focus:outline-none"
                  type="text"
                  name="username"
                  id="username"
                  placeholder="ID"
                  onChange={handleChange}
                  required
              />
            </div>
            <div>
              <label className="text-gray-800 font-semibold block my-3 text-md" htmlFor="password1">비밀번호</label>
              <input
                  className="w-full bg-gray-100 px-2 py-1 rounded-lg focus:outline-none"
                  type="password"
                  name="password1"
                  id="password1"
                  placeholder="********"
                  onChange={handleChange}
                  required
              />
            </div>
            <div>
              <label className="text-gray-800 font-semibold block my-3 text-md" htmlFor="nickname">닉네임</label>
              <input
                  className="w-full bg-gray-100 px-2 py-1 rounded-lg focus:outline-none"
                  type="text"
                  name="nickname"
                  id="nickname"
                  placeholder="닉네임"
                  onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-gray-800 font-semibold block my-3 text-md" htmlFor="email">Email</label>
              <input
                  className="w-full bg-gray-100 px-2 py-1 rounded-lg focus:outline-none"
                  type="text"
                  name="email"
                  id="email"
                  placeholder="email@gmail.com"
                  onChange={handleChange}
              />
            </div>
            <button
                type="submit"
                className="w-full mt-6 bg-yellow-600 rounded-lg px-2 py-1 text-lg text-white tracking-wide font-semibold font-sans"
            >
              회원가입
            </button>
            <Link to="/login">
              <button
                  type="submit"
                  className="w-full mt-6 pb-3 bg-yellow-100 rounded-lg px-2 py-1 text-lg text-gray-800 tracking-wide font-semibold font-sans">
                로그인
              </button>
            </Link>
          </form>
        </div>
      </div>
  );
}

export default SignUp;