import { useEffect, useState } from "react";

// Define types for news post and tag
interface NewsPost {
  id: number;
  title: string;
  content: string;
  createdAt?: string | Date;
  tags?: string[];
}

interface Tag {
  id: number;
  name: string;
}

const POSTS_PER_PAGE = 4;

export default function News() {
  // State for posts, tags, selected tag, page, loading, and error
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalArticle, setModalArticle] = useState<NewsPost | null>(null); // State for modal

  // Fetch tags on mount
  useEffect(() => {
    fetch("/api/news-tags")
      .then((res) => res.json())
      .then((data) => setTags(data))
      .catch(() => setTags([]));
  }, []);

  // Fetch posts whenever selectedTag or page changes
  useEffect(() => {
    setLoading(true);
    setError(null);
    let url = `/api/news?page=${page}&limit=${POSTS_PER_PAGE}`;
    if (selectedTag) {
      url += `&tag=${encodeURIComponent(selectedTag)}`;
    }
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch news posts");
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [selectedTag, page]);

  // Handler for tag selection
  const handleTagClick = (tag: string) => {
    setSelectedTag(tag === selectedTag ? null : tag); // Toggle tag
    setPage(1); // Reset to first page when tag changes
  };

  // Handler for pagination
  const handlePrevPage = () => setPage((p) => Math.max(1, p - 1));
  const handleNextPage = () => setPage((p) => p + 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-green-800">ABNEG News & Updates</h1>

        {/* Tag Filter Buttons */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {tags.map((tag) => (
            <button
              key={tag.id}
              className={`px-4 py-2 rounded-full border font-semibold transition-colors ${selectedTag === tag.name ? "bg-green-600 text-white border-green-700" : "bg-white text-green-700 border-green-400 hover:bg-green-100"}`}
              onClick={() => handleTagClick(tag.name)}
            >
              {tag.name}
            </button>
          ))}
        </div>

        {/* Loading and Error States */}
        {loading && <p className="text-center text-gray-500">Loading news...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* News Posts List */}
        {!loading && !error && posts.length === 0 && (
          <p className="text-center text-gray-600">No news posts found.</p>
        )}
        <div className="space-y-8">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
              <h2 className="text-2xl font-semibold mb-2 text-green-800">{post.title}</h2>
              <div className="flex flex-wrap gap-4 mb-2 text-sm text-gray-500">
                <span>Posted on {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ""}</span>
              </div>
              <p className="text-gray-700 mb-2">
                {/* Show preview if content is long, else show full content */}
                {post.content.split(/\s+/).length > 30
                  ? post.content.split(/\s+/).slice(0, 30).join(" ") + "..."
                  : post.content}
              </p>
              {/* Show 'Read more...' if content is long */}
              {post.content.split(/\s+/).length > 30 && (
                <button
                  className="text-green-700 font-semibold hover:underline"
                  onClick={() => setModalArticle(post)}
                >
                  Read more...
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center gap-4 mt-10">
          <button
            className="px-4 py-2 rounded bg-green-200 text-green-800 font-semibold disabled:opacity-50"
            onClick={handlePrevPage}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="px-4 py-2 font-semibold">Page {page}</span>
          <button
            className="px-4 py-2 rounded bg-green-200 text-green-800 font-semibold disabled:opacity-50"
            onClick={handleNextPage}
            disabled={posts.length < POSTS_PER_PAGE}
          >
            Next
          </button>
        </div>
      </div>
      {/* Modal for full article */}
      {modalArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {/* Modal container: max-h-[80vh] and overflow-y-auto make it scrollable for long content */}
          <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full relative max-h-[80vh] overflow-y-auto">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-green-700 text-2xl font-bold"
              onClick={() => setModalArticle(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-2 text-green-800">{modalArticle.title}</h2>
            <div className="text-sm text-gray-500 mb-4">
              Posted on {modalArticle.createdAt ? new Date(modalArticle.createdAt).toLocaleDateString() : ""}
            </div>
            <p className="text-gray-700 whitespace-pre-line">{modalArticle.content}</p>
          </div>
        </div>
      )}
    </div>
  );
} 