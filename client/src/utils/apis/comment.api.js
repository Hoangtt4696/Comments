import { fetchWithCredentials } from '../../helpers/fetch.helper';

const apiUrl = 'http://localhost:3000/api';

export const create = async (topicId, content = '') => {
  return await fetchWithCredentials(`${apiUrl}/topics/${topicId}/comments`, {
    method: 'POST',
    body: { content },
  });
};

export const update = async (id, newContent = '') => {
  return await fetchWithCredentials(`${apiUrl}/comments/${id}`, {
    method: 'PUT',
    body: { content: newContent }
  });
};

export const remove = async id => {
  return await fetchWithCredentials(`${apiUrl}/comments/${id}`, {
    method: 'DELETE'
  });
};

export const replyComment = async (topicId, reply, replyContent) => {
  const commentId = reply._id;

  return await fetchWithCredentials(`${apiUrl}/comments/${commentId}/replies`, {
    method: 'POST',
    body: {
      content: replyContent,
      topicId
    }
  });
};

export const commentReplies = async (commentId) => {
  return await fetchWithCredentials(`${apiUrl}/comments/${commentId}/replies`);
};

export const topicComments = async (topicId = '') => {
  return await fetchWithCredentials(`${apiUrl}/topics/${topicId}/comments`);
};
