import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withPostService } from '../../HOC';
import { fetchPosts, deletePost } from '../../../actions';
import PostItem from './PostItem';
import OverlayButton from '../../../shared/OverlayButton';
import PageLoader from '../../PageLoader';

const Blog = ({
  fetchPosts,
  deletePost,
  posts,
  loading
}) => {
  const history = useHistory();

  const handleClickCreate = () => {
    history.push('/blog/create-post');
  };

  const handleClickDelete = id => {
    deletePost(id);
  };

  const blogPosts = posts.map(post => (
    <PostItem
      {...post}
      key={post._id}
      handleDelete={handleClickDelete}
    />
  ));

  useEffect(() => {
    document.title = 'Blog';
    window.scrollTo(0, 0);

    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="full-screen-container">
      <div className="container">
        <section className="blog-page">
          <div className="blog-page-header">
            <h2 className="blog-page-title">Blog</h2>
            <div className="create-post">
              <OverlayButton
                label="Create post"
                handleClick={handleClickCreate}
              >
                <i className="fas fa-plus add-icon"></i>
              </OverlayButton>
            </div>
          </div>
          {loading && <PageLoader />}
          {!loading &&
            (posts.length ? (
              blogPosts
            ) : (
              <div className="no-posts">
                <p className="text-block">
                  Sorry... There're no posts yet...
                </p>
              </div>
            ))}
        </section>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  posts: { posts, loading, error }
}) => ({ posts, loading, error });

const mapDispatchToProps = (dispatch, { postService }) =>
  bindActionCreators(
    {
      fetchPosts: fetchPosts(postService),
      deletePost: deletePost(postService)
    },
    dispatch
  );

export default withPostService()(
  connect(mapStateToProps, mapDispatchToProps)(Blog)
);
