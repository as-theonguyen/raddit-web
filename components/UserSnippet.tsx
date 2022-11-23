import { UserType } from '@response-types/user';
import ProfileLink from './ProfileLink';

interface Props {
  user: UserType;
}

const UserSnippet = ({ user }: Props) => {
  return (
    <article className="bg-white border border-gray-300 p-4 rounded-md w-11/12 max-w-2xl">
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <ProfileLink href={`/users/${user.id}`}>Visit user profile</ProfileLink>
    </article>
  );
};

export default UserSnippet;
