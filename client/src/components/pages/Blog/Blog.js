import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withHttpService } from '../../HOC';
import { fetchPosts } from '../../../actions';
import PostItem from './PostItem';
import OverlayButton from '../../../shared/OverlayButton';
import PageLoader from '../../PageLoader';

const Blog = ({
  isAuthenticated,
  fetchPosts,
  posts,
  loading
}) => {
  const history = useHistory();

  const handleClickCreate = () => {
    history.push('/blog/create-post');
  };

  const blogPosts = posts.map(post => (
    <PostItem key={post._id} {...post} />
  ));

  useEffect(() => {
    document.title = 'Blog';
    window.scrollTo(0, 0);

    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="blog-page">
      <div className="container">
        <section className="blog">
          <div className="blog-page-header">
            <h2 className="blog-page-title">Blog</h2>
            {isAuthenticated && (
              <div className="create-post">
                <OverlayButton
                  label="Create post"
                  handleClick={handleClickCreate}
                >
                  <i className="fas fa-plus add-icon"></i>
                </OverlayButton>
              </div>
            )}
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
  auth: { isAuthenticated },
  posts: { posts, loading, error }
}) => ({ isAuthenticated, posts, loading, error });

const mapDispatchToProps = (dispatch, { httpService }) =>
  bindActionCreators(
    {
      fetchPosts: fetchPosts(httpService)
    },
    dispatch
  );

export default withHttpService()(
  connect(mapStateToProps, mapDispatchToProps)(Blog)
);
