import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSumbit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col mt-[100px]">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing propmts with the world, and let your
        immagination run wild with any AI-powered platform.
      </p>

      <form
        action=""
        onSubmit={handleSumbit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label htmlFor="">
          <span className="font-satoshi font-semibold text-base">
            Your AI Prompt
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => {
              setPost({
                ...post,
                prompt: e.target.value,
              });
            }}
            placeholder="Write your prompt here..."
            required
            className="form_textarea"
          />
        </label>

        <label htmlFor="">
          <span className="font-satoshi font-semibold text-base">
            Tag {" "}
            <span className="text-sm font-normal text-gray-500">(#product, #webdev, #idea)</span>
          </span>

          <input
            value={post.tag}
            onChange={(e) => {
              setPost({
                ...post,
                tag: e.target.value,
              });
            }}
            placeholder="#tag"
            required
            className="form_input"
          />
        </label>

        <div className="flex-end ml-3 mb-5 gap-4">
          <Link href="/" className="text-sm text-gray-500 px-6 py-2 ring-1 ring-gray-400 rounded-full">
            Cancel
          </Link>
          <button type="submit" disabled={submitting} className="bg-primary-orange px-6 py-1.5 rounded-full text-white">
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
