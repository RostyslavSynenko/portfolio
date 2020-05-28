import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withPostService } from '../../HOC';
import { fetchPosts } from '../../../actions';
import PostItem from './PostItem';
import OverlayButton from '../../../shared/OverlayButton';
import { mockArticles } from '../../../configs';

const Blog = ({ fetchPosts }) => {
  const history = useHistory();

  const handleClickCreate = () => {
    history.push('/blog/create-post');
  };

  const articles = mockArticles.map(article => (
    <PostItem {...article} key={article._id} />
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
          {articles}
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
    { fetchPosts: fetchPosts(postService) },
    dispatch
  );

export default withPostService()(
  connect(mapStateToProps, mapDispatchToProps)(Blog)
);
