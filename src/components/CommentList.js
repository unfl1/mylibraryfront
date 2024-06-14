import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import CommentForm from './CommentForm';
import API_BASE_URL from '../Config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [showReplyForms, setShowReplyForms] = useState({});
  const user = useSelector(state => state.user.user);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/post/${postId}/comment`)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the comments!", error);
      });
  }, [postId]);

  const handleCommentSubmit = (commentData) => {
    axios.post(`${API_BASE_URL}/post/${postId}/comment`, commentData)
      .then(response => {
        setComments([...comments, response.data]);
        setShowCommentForm(false);
      })
      .catch(error => {
        console.error("There was an error submitting the comment!", error);
      });
  };

  const handleReplySubmit = (replyData, parentId) => {
    axios.post(`${API_BASE_URL}/post/${postId}/comment`, replyData)
      .then(response => {
        const updatedComments = comments.map(comment => {
          if (comment.id === parentId) {
            return {
              ...comment,
              replies: [...(comment.replies || []), response.data]
            };
          }
          return comment;
        });
        setComments(updatedComments);
        setShowReplyForms({ ...showReplyForms, [parentId]: false });
      })
      .catch(error => {
        console.error("There was an error submitting the reply!", error);
      });
  };

  const handleDeleteComment = (commentId) => {
    axios.delete(`${API_BASE_URL}/comment/${commentId}`, {
      headers: {
        'username': user.username
      }
    })
      .then(response => {
        if (response.status === 200) {
          window.location.reload();
        }
      })
      .catch(error => {
        console.error("There was an error deleting the comment!", error);
      });
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-4">
      <div className="flex justify-end">
        <button
          onClick={() => setShowCommentForm(!showCommentForm)}
          className="px-4 py-2 text-black bg-transparent rounded hover:text-blue-500 mb-4"
        >
          {showCommentForm ? '댓글창 닫기' : '댓글 쓰기'}
        </button>
      </div>
      {showCommentForm && <CommentForm postId={postId} onCommentSubmit={handleCommentSubmit} />}
      {comments.map(comment => (
        <div key={comment.id} className={`p-4 border border-gray-200 rounded mb-2 ${comment.nickname === user?.nickname ? 'bg-white' : 'bg-white'}`}>
          <div className="font-bold">{comment.nickname}</div>
          <div>{comment.content}</div>
          <div className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</div>
          <button
            onClick={() => setShowReplyForms({ ...showReplyForms, [comment.id]: !showReplyForms[comment.id] })}
            className="px-4 py-2 text-black bg-transparent rounded hover:text-blue-500 mt-2"
          >
            {showReplyForms[comment.id] ? '댓글 창 닫기' : '댓글 쓰기'}
          </button>
          {showReplyForms[comment.id] && (
            <CommentForm
              postId={postId}
              parentId={comment.id}
              onCommentSubmit={(replyData) => handleReplySubmit(replyData, comment.id)}
            />
          )}
          {comment.replies && comment.replies.map(reply => (
            <div key={reply.id} className={`p-2 border border-gray-300 rounded ml-4 mt-2 ${reply.nickname === user?.nickname ? 'bg-white-100' : 'bg-gray-100'}`}>
              <div className="font-bold">{reply.nickname}</div>
              <div>{reply.content}</div>
              <div className="text-xs text-gray-500">{new Date(reply.createdAt).toLocaleString()}</div>
              {user && user.username === reply.username && (
                <button
                  onClick={() => handleDeleteComment(reply.id)}
                  className="text-red-500 hover:text-red-700 mt-2"
                >
                  삭제 <FontAwesomeIcon icon={faTimes} />
                </button>
              )}
            </div>
          ))}
          {user && user.username === comment.username && (
            <button
              onClick={() => handleDeleteComment(comment.id)}
              className="text-red-500 hover:text-red-700 mt-2"
            >
              삭제 <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList;