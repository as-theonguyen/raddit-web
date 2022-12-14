import ReactMarkdown from 'react-markdown';

interface Props {
  title: string;
  content: string;
}

const PostPreview = ({ title, content }: Props) => {
  return (
    <article>
      <h1 className="font-bold text-4xl mb-10">{title}</h1>
      <ReactMarkdown className="prose">{content}</ReactMarkdown>
    </article>
  );
};

export default PostPreview;
