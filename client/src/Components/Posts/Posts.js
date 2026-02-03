import React, { useEffect } from 'react';
import './Posts.css';
import Post from '../Post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { getTimelinePosts } from '../../actions/PostAction';
import { useParams } from 'react-router-dom';

const Posts = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const { posts, loading } = useSelector((state) => state.postReducer);

  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, [dispatch, user._id]);

  const filteredPosts = params.id
    ? posts.filter(post => post.userId === params.id)
    : posts;

  return (
    <div className='Posts'>
      {loading
        ? "Fetching Posts..."
        : filteredPosts.map(post => <Post data={post} key={post._id} />)
      }
    </div>
  );
};

export default Posts;
