import React, { useState } from 'react';
import { Post } from '../types';

interface EditPostModalProps {
  post: Post;
  onSave: (updatedPost: Post) => void;
  onClose: () => void;
}

export const EditPostModal: React.FC<EditPostModalProps> = ({ post, onSave, onClose }) => {
  const [title, setTitle] = useState(post.title);
  const [price, setPrice] = useState(post.price);
  const [description, setDescription] = useState(post.description);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...post,
      title,
      price,
      description,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-gray-800">বিজ্ঞাপন এডিট করুন</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">শিরোনাম</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-lg p-2.5 outline-none focus:border-orange-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">দাম</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border rounded-lg p-2.5 outline-none focus:border-orange-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">বিবরণ</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full border rounded-lg p-2.5 outline-none focus:border-orange-500"
              required
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50"
            >
              বাতিল
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-orange-600 text-white rounded-xl hover:bg-orange-700 font-semibold"
            >
              সেভ করুন
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostModal;
