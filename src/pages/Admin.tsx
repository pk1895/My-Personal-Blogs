import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

type Session = Awaited<
  ReturnType<typeof supabase.auth.getSession>
>["data"]["session"];

export default function Admin() {
  const [session, setSession] = useState<Session>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState(
    "# New Post\n\nWrite in **Markdown**."
  );
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) =>
      setSession(s)
    );
    return () => listener.subscription.unsubscribe();
  }, []);

  const loginWithGithub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: window.location.origin + "/admin" },
    });
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const savePost = async () => {
    if (!title || !slug || !content)
      return alert("Title, slug, and content are required.");
    const { data: profile } = await supabase.auth.getUser();
    const author_id = profile.user?.id;

    const { error } = await supabase
      .from("posts")
      .insert({
        title,
        slug,
        description: description || null,
        content,
        author_id,
      })
      .select()
      .single();

    if (error) {
      alert("Error: " + error.message);
    } else {
      navigate("/blog/" + slug);
    }
  };

  if (!session) {
    return (
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-2">Admin</h1>
        <p className="mb-4 text-sm text-gray-500">Sign in to create posts.</p>
        <button
          onClick={loginWithGithub}
          className="px-4 py-2 rounded bg-black text-white"
        >
          Sign in with GitHub
        </button>
      </div>
    );
  }
  const canPublish =
    title.trim().length > 0 &&
    slug.trim().length > 0 &&
    content.trim().length > 0;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">New Post</h1>
        <button onClick={logout} className="px-3 py-1 rounded border">
          Sign out
        </button>
      </div>

      <div className="grid gap-4">
        <input
          className="border rounded p-2 w-full bg-transparent"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="border rounded p-2 w-full bg-transparent"
          placeholder="Slug (e.g., my-first-post)"
          value={slug}
          onChange={(e) =>
            setSlug(e.target.value.replace(/\s+/g, "-").toLowerCase())
          }
        />
        <input
          className="border rounded p-2 w-full bg-transparent"
          placeholder="Short description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <textarea
          className="border rounded p-2 w-full min-h-[240px] font-mono bg-transparent"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          onClick={savePost}
          disabled={!canPublish}
          className={`px-4 py-2 rounded text-white transition ${
            canPublish
              ? "bg-indigo-600 hover:bg-indigo-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          title={canPublish ? "Publish post" : "Fill title, slug & content"}
        >
          Publish
        </button>
      </div>
    </div>
  );
}
