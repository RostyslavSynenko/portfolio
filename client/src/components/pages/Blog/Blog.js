import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withHttpService } from '../../HOC';
import { fetchPosts, deletePost } from '../../../actions';
import PostItem from './PostItem';
import OverlayButton from '../../../shared/OverlayButton';
import PageLoader from '../../PageLoader';
import { ConfirmModal } from '../../../shared/Modals';
import { checkPermission } from '../../../utils/auth';

const Blog = ({
  token,
  isAuthenticated,
  fetchPosts,
  deletePost,
  posts,
  loading,
  crudLoading,
  error
}) => {
  const history = useHistory();
  const permission = checkPermission({
    token,
    isAuthenticated
  });
  const [modal, setModal] = useState(false);
  const [postId, setPostId] = useState(null);

  const handleClickCreate = () => {
    history.push('/blog/create-post');
  };

  const handleDelete = id => async () =>
    await deletePost(id);

  const blogPosts = posts.map(post => (
    <PostItem
      key={post._id}
      {...post}
      setModal={setModal}
      setPostId={setPostId}
    />
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
            {permission && (
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
      {modal && (
        <ConfirmModal
          loading={crudLoading}
          error={error}
          actionType="Deleting"
          text="Are you sure?"
          successMessage="Post has been deleted!"
          label="Delete"
          handleOk={handleDelete(postId)}
          handleCancel={() => setModal(false)}
        />
      )}
    </div>
  );
};

const mapStateToProps = ({
  error,
  auth: { token, isAuthenticated },
  posts: { posts, loading, crudLoading }
}) => ({
  token,
  isAuthenticated,
  posts,
  loading,
  crudLoading,
  error
});

const mapDispatchToProps = (dispatch, { httpService }) =>
  bindActionCreators(
    {
      fetchPosts: fetchPosts(httpService),
      deletePost: deletePost(httpService)
    },
    dispatch
  );

export default withHttpService()(
  connect(mapStateToProps, mapDispatchToProps)(Blog)
);
