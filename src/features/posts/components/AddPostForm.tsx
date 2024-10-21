import { useAddPostMutation } from '../store/post.api';
import { Button } from '@/UI/Elements/Button';
import { useGetUserListQuery } from '@/features/users/store/user.api';
import { selectAllUsers } from '@/features/users/store/user.selector';
import { useAppSelector } from '@/shared/store/types';
import * as Form from '@radix-ui/react-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function AddPostForm() {
  const [addNewPost, { isLoading }] = useAddPostMutation();

  const { isSuccess: userLoaded } = useGetUserListQuery();

  const users = useAppSelector(selectAllUsers);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const canSave = [title, content, userId].every(Boolean) && !isLoading;

  const handleCancel = () => {
    navigate('/posts'); // Redirect to the post list page
  };

  const onSavePostClicked = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    if (!canSave) {
      return;
    }

    try {
      await addNewPost({
        title,
        body: content,
        userId: Number(userId),
      }).unwrap();

      setTitle('');
      setContent('');
      setUserId('');

      // Redirect to post list page
      navigate('/posts');
    } catch {
      setErrorMessage('Failed to save the post.');
    }
  };

  return (
    <div className="mx-auto max-w-lg rounded-lg bg-gray-50 p-8 shadow-md">
      <Form.Root
        className="space-y-6"
        onSubmit={onSavePostClicked}
      >
        <Form.Field name="title">
          <div className="flex flex-col gap-2">
            <Form.Label className="text-lg font-medium text-gray-700">
              Title
            </Form.Label>
            <Form.Control asChild>
              <input
                type="text"
                placeholder="Enter post title"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Control>
            <Form.Message
              className="mt-1 text-red-500"
              match="valueMissing"
            >
              Title is required
            </Form.Message>
          </div>
        </Form.Field>

        {/* Content Field */}
        <Form.Field name="content">
          <div className="flex flex-col gap-2">
            <Form.Label className="text-lg font-medium text-gray-700">
              Content
            </Form.Label>
            <Form.Control asChild>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter post content"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={5}
                required
              />
            </Form.Control>
            <Form.Message
              className="mt-1 text-red-500"
              match="valueMissing"
            >
              Content is required
            </Form.Message>
          </div>
        </Form.Field>
        <Form.Field name="userId">
          <div className="flex flex-col gap-2">
            <Form.Label className="text-lg font-medium text-gray-700">
              User
            </Form.Label>
            <select
              onChange={(e) => setUserId(e.target.value)}
              value={userId}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a user</option>
              {userLoaded
                ? users.map((user) => (
                    <option
                      key={user.id}
                      value={user.id}
                    >
                      {user.name}
                    </option>
                  ))
                : ''}
            </select>

            <Form.Message
              className="mt-1 text-red-500"
              match="valueMissing"
            >
              Please select a user
            </Form.Message>
          </div>
        </Form.Field>

        {/* Display error message if any */}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <Form.Submit asChild>
          <Button
            disabled={!canSave}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            {isLoading ? 'Saving...' : 'Create Post'}
          </Button>
        </Form.Submit>
        <Button
          onClick={handleCancel}
          className="mt-4 w-full rounded-lg bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
        >
          Cancel
        </Button>
      </Form.Root>
    </div>
  );
}
