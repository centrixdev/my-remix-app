import { Form, redirect, useActionData, useTransition } from "remix"
import { createPost } from "~/post"

export const action = async ({ request }) => {
    await new Promise(res => setTimeout(res, 1000));

    const formData = await request.formData();

    const title = formData.get("title");
    const slug = formData.get("slug");
    const markdown = formData.get("markdown");

    const errors = {};
    if (!title) errors.title = true;
    if (!slug) errors.slug = true;
    if (!markdown) errors.markdown = true;

    if (Object.keys(errors).length) {
        return errors;
    }

    await createPost({ title, slug, markdown });

    return redirect("/admin");
};

export default function NewPost() {
    const errors = useActionData();
    const transition = useTransition()

    return (
        <Form method="post">
            <p>
                <label>
                    Post Title: {" "}
                    {errors?.title ? (<em>Title is required</em>) : null}
                    <input type="text" name="title" />
                </label>
            </p>
            <p>
                <label>
                    Post Slug: {" "}
                    {errors?.slug ? (<em>Slug is required</em>) : null}
                    <input type="text" name="slug" />
                </label>
            </p>
            <p>
                <label htmlFor="markdown">Markdown:</label>{" "}
                {errors?.title ? (<em>Markdown is required</em>) : null}
                <br />
                <textarea name="markdown" id="markdown" rows={20}></textarea>
            </p>
            <p>
                <button type="submit">
                    {transition.submission
                    ? "Creating..."
                    : "Create Post"}
                </button>
            </p>
        </Form>
    )
}